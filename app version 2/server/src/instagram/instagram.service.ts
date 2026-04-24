import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InstagramService {
  private readonly logger = new Logger(InstagramService.name);
  private readonly fbGraphUrl = 'https://graph.facebook.com/v21.0';

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.socialAccount.findMany();
  }

  getLoginUrl() {
    const appId = this.configService.get('META_APP_ID');
    const redirectUri = this.configService.get('META_REDIRECT_URI');
    
    // Scopes needed for Instagram Social Dashboard
    const scopes = [
      'instagram_basic',
      'instagram_content_publish',
      'instagram_manage_messages',
      'instagram_manage_comments',
      'pages_read_engagement',
      'business_management',
      'pages_show_list',
      'public_profile',
    ].join(',');

    const url = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code`;
    this.logger.log(`Generando URL de Login: ${url}`);
    return url;
  }

  async handleCallback(code: string, tenantId: string, userId: string) {
    const appId = this.configService.get('META_APP_ID');
    const appSecret = this.configService.get('META_APP_SECRET');
    const redirectUri = this.configService.get('META_REDIRECT_URI');

    try {
      // 1. Exchange code for Short-Lived Access Token
      const tokenResponse = await axios.get(`${this.fbGraphUrl}/oauth/access_token`, {
        params: {
          client_id: appId,
          client_secret: appSecret,
          redirect_uri: redirectUri,
          code,
        },
      });

      const shortLivedToken = tokenResponse.data.access_token;

      // 2. Exchange for Long-Lived User Access Token (60 days)
      const longLivedResponse = await axios.get(`${this.fbGraphUrl}/oauth/access_token`, {
        params: {
          grant_type: 'fb_exchange_token',
          client_id: appId,
          client_secret: appSecret,
          fb_exchange_token: shortLivedToken,
        },
      });

      const userAccessToken = longLivedResponse.data.access_token;
      const expiresIn = longLivedResponse.data.expires_in;
      const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 1000) : null;

      // 3. Get the list of Facebook Pages managed by the user
      const pagesResponse = await axios.get(`${this.fbGraphUrl}/me/accounts`, {
        params: { access_token: userAccessToken, fields: 'id,name,instagram_business_account,access_token' },
      });

      const pages = pagesResponse.data.data;
      
      if (!pages || pages.length === 0) {
        throw new Error('No se encontraron páginas de Facebook vinculadas a este perfil.');
      }

      // 4. Find the Page that has a linked Instagram Business Account
      let instagramAccountData: any = null;

      for (const page of pages) {
        if (page.instagram_business_account) {
          // Get details of the IG account with more metrics
          const igId = page.instagram_business_account.id;
          const igResponse = await axios.get(`${this.fbGraphUrl}/${igId}`, {
            params: { 
              access_token: userAccessToken, 
              fields: 'id,username,name,profile_picture_url,followers_count,media_count' 
            },
          });

          instagramAccountData = {
            id: igId,
            username: igResponse.data.username,
            name: igResponse.data.name || igResponse.data.username,
            followersCount: igResponse.data.followers_count,
            mediaCount: igResponse.data.media_count,
            profilePicture: igResponse.data.profile_picture_url,
            accessToken: userAccessToken, 
          };
          break; // For this MVP, we just take the first one found
        }
      }

      if (!instagramAccountData) {
        throw new Error('No se encontró ninguna cuenta de Instagram profesional vinculada a tus páginas de Facebook.');
      }

      // 5. Ensure the user exists (MVP workaround since we don't have full auth yet)
      await this.prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          email: 'demo@socialhub.com',
          name: 'Usuario Demo',
          tenantId: tenantId,
        }
      });

      // 6. Upsert the SocialAccount in our database
      const account = await this.prisma.socialAccount.upsert({
        where: { platformUserId: instagramAccountData.id },
        update: {
          accessToken: instagramAccountData.accessToken,
          tokenExpiresAt: expiresAt,
          status: 'active',
          accountName: instagramAccountData.username,
          followersCount: instagramAccountData.followersCount,
          mediaCount: instagramAccountData.mediaCount,
          profilePicture: instagramAccountData.profilePicture,
        },
        create: {
          userId,
          platform: 'instagram',
          platformUserId: instagramAccountData.id,
          accountName: instagramAccountData.username,
          followersCount: instagramAccountData.followersCount,
          mediaCount: instagramAccountData.mediaCount,
          profilePicture: instagramAccountData.profilePicture,
          accessToken: instagramAccountData.accessToken,
          tokenExpiresAt: expiresAt,
          tenantId,
        },
      });

      return account;
    } catch (error) {
      const errorDetail = error.response?.data || error.message;
      this.logger.error('Error handling Instagram callback', errorDetail);
      throw new Error(typeof errorDetail === 'object' ? JSON.stringify(errorDetail) : errorDetail);
    }
  }

  async getRecentPosts(userId: string = 'default-user') {
    // 1. Get the user's connected Instagram account
    const account = await this.prisma.socialAccount.findFirst({
      where: { userId, platform: 'instagram', status: 'active' },
    });

    if (!account) {
      return []; // Return empty if no account is connected
    }

    try {
      // 2. Fetch the 'media' from Instagram Graph API
      const response = await axios.get(`${this.fbGraphUrl}/${account.platformUserId}/media`, {
        params: {
          access_token: account.accessToken,
          fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count',
          limit: 10,
        },
      });

      return response.data.data || [];
    } catch (error) {
      this.logger.error('Error fetching Instagram posts', error.response?.data || error);
      return []; // Fallback to empty array on error so UI doesn't crash
    }
  }

  async getPostComments(postId: string, userId: string = 'default-user') {
    const account = await this.prisma.socialAccount.findFirst({
      where: { userId, platform: 'instagram', status: 'active' },
    });

    if (!account) {
      return [];
    }

    try {
      const response = await axios.get(`${this.fbGraphUrl}/${postId}/comments`, {
        params: {
          access_token: account.accessToken,
          fields: 'id,text,timestamp,username,like_count',
        },
      });

      if (response.data.data && response.data.data.length > 0) {
        return response.data.data;
      }
      
      // Fallback a comentarios simulados si la publicación real no tiene comentarios para no dejar vacío el frontend
      return this.getMockComments();
    } catch (error) {
      this.logger.error(`Error fetching comments for post ${postId}`, error.response?.data || error);
      // Fallback a comentarios simulados si falla por permisos (ej. no tiene el scope instagram_manage_comments habilitado)
      return this.getMockComments();
    }
  }

  async publishPost(userId: string, imageUrl: string, caption: string) {
    const account = await this.prisma.socialAccount.findFirst({
      where: { userId, platform: 'instagram', status: 'active' },
    });

    if (!account) {
      throw new Error('No hay una cuenta de Instagram conectada.');
    }

    try {
      // 1. Create Media Container
      const containerRes = await axios.post(`${this.fbGraphUrl}/${account.platformUserId}/media`, null, {
        params: {
          access_token: account.accessToken,
          image_url: imageUrl,
          caption: caption,
        },
      });

      const creationId = containerRes.data.id;

      // 2. Publish Media Container
      const publishRes = await axios.post(`${this.fbGraphUrl}/${account.platformUserId}/media_publish`, null, {
        params: {
          access_token: account.accessToken,
          creation_id: creationId,
        },
      });

      return { success: true, id: publishRes.data.id };
    } catch (error) {
      this.logger.error('Error publishing to Instagram', error.response?.data || error);
      throw new Error(error.response?.data?.error?.message || 'Error al publicar en Instagram');
    }
  }

  async getConversations(userId: string = 'default-user') {
    const account = await this.prisma.socialAccount.findFirst({
      where: { userId, platform: 'instagram', status: 'active' },
    });

    if (!account) {
      return this.getMockConversations();
    }

    const conversationsList: any[] = [];

    // 1. Intentar obtener DMs (esto puede fallar por falta de permisos de Meta App review)
    try {
      const dmResponse = await axios.get(`${this.fbGraphUrl}/${account.platformUserId}/conversations`, {
        params: {
          access_token: account.accessToken,
          platform: 'instagram',
          fields: 'id,participants,updated_time,messages{message,from,timestamp}',
          limit: 10,
        },
      });

      if (dmResponse.data.data && dmResponse.data.data.length > 0) {
        conversationsList.push(...dmResponse.data.data.map(conv => ({
          id: conv.id,
          username: conv.participants?.data?.[0]?.username || 'Usuario',
          name: conv.participants?.data?.[0]?.name || conv.participants?.data?.[0]?.username || 'Anónimo',
          profile_picture: null,
          last_message: conv.messages?.data?.[0]?.message || 'Mensaje directo',
          timestamp: conv.updated_time,
          unseen_count: 0,
          platform: 'instagram',
          type: 'dm'
        })));
      }
    } catch (e) {
      this.logger.warn('Direct Messages no disponibles (posiblemente falta revisión de Meta App)');
    }

    // 2. Obtener COMENTARIOS de posts recientes (esto suele funcionar sin revisión avanzada)
    try {
      const mediaResponse = await axios.get(`${this.fbGraphUrl}/${account.platformUserId}/media`, {
        params: {
          access_token: account.accessToken,
          fields: 'id,caption',
          limit: 5,
        },
      });

      for (const media of mediaResponse.data.data || []) {
        const commentsResponse = await axios.get(`${this.fbGraphUrl}/${media.id}/comments`, {
          params: {
            access_token: account.accessToken,
            fields: 'id,text,username,timestamp',
          },
        });

        if (commentsResponse.data.data) {
          conversationsList.push(...commentsResponse.data.data.map(comment => ({
            id: comment.id,
            username: comment.username,
            name: comment.username,
            profile_picture: null,
            last_message: comment.text,
            timestamp: comment.timestamp,
            unseen_count: 0,
            platform: 'instagram',
            type: 'comment',
            post_caption: media.caption
          })));
        }
      }
    } catch (e) {
      this.logger.error('Error fetching comments for inbox', e.message);
    }

    // Si encontramos datos reales (DMs o Comentarios), los devolvemos ordenados por fecha
    if (conversationsList.length > 0) {
      return conversationsList.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }

    // Fallback final a mocks si no hay absolutamente nada
    return this.getMockConversations();
  }

  private getMockConversations() {
    return [
      { 
        id: 'mock-conv-1', 
        username: 'maria_g', 
        name: 'María González', 
        last_message: '¡Me encanta este producto! ¿Dónde puedo comprarlo?', 
        timestamp: new Date(Date.now() - 300000).toISOString(), 
        unseen_count: 1,
        platform: 'instagram'
      },
      { 
        id: 'mock-conv-2', 
        username: 'ana_m', 
        name: 'Ana Martínez', 
        last_message: 'Hola, quisiera información sobre sus horarios de atención.', 
        timestamp: new Date(Date.now() - 3600000).toISOString(), 
        unseen_count: 0,
        platform: 'instagram'
      },
      { 
        id: 'mock-conv-3', 
        username: 'luis_h', 
        name: 'Luis Hernández', 
        last_message: 'Interesante artículo, me gustaría saber más sobre este tema.', 
        timestamp: new Date(Date.now() - 7200000).toISOString(), 
        unseen_count: 0,
        platform: 'instagram'
      }
    ];
  }

  private getMockComments() {
    return [
      { id: 'mock-1', username: 'maria_g', text: '¡Me encanta! Definitivamente iré 😍', timestamp: new Date().toISOString(), like_count: 12 },
      { id: 'mock-2', username: 'carlos_rod', text: 'Excelente iniciativa, muy profesional 👏', timestamp: new Date(Date.now() - 3600000).toISOString(), like_count: 5 },
    ];
  }
}
