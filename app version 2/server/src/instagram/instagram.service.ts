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
}
