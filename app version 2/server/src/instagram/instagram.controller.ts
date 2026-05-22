import { Controller, Get, Post, Body, Query, Res, HttpStatus, Param } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import type { Response } from 'express';

@Controller(['instagram', 'facebook'])
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Get('login')
  async login(
    @Query('redirect_back') redirectBack: string,
    @Res() res: Response,
  ) {
    const url = this.instagramService.getLoginUrl(redirectBack);
    return res.redirect(url);
  }

  @Get('accounts')
  async getAccounts() {
    return await this.instagramService.findAll();
  }

  @Get('posts')
  async getPosts(@Query('userId') userId: string = 'default-user') {
    return await this.instagramService.getRecentPosts(userId);
  }

  @Post('publish')
  async publish(
    @Body('imageUrl') imageUrl: string,
    @Body('caption') caption: string,
    @Body('userId') userId: string = 'default-user',
  ) {
    try {
      if (!imageUrl) {
        return { error: 'Se requiere una URL pública de imagen para Instagram.' };
      }
      return await this.instagramService.publishPost(userId, imageUrl, caption);
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('posts/:postId/comments')
  async getPostComments(
    @Param('postId') postId: string,
    @Query('userId') userId: string = 'default-user',
  ) {
    return await this.instagramService.getPostComments(postId, userId);
  }

  @Get('conversations')
  async getConversations(@Query('userId') userId: string = 'default-user') {
    return await this.instagramService.getConversations(userId);
  }

  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
    // Note: These should ideally come from the session or JWT
    // For the MVP/POC we might use query params or defaults
    @Query('tenantId') tenantId: string = 'default-tenant',
    @Query('userId') userId: string = 'default-user',
  ) {
    if (!code) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'No code provided from Meta' });
    }

    // Determine target client URL for redirection
    let clientUrl = 'http://localhost:5173';
    const rawClientUrls = process.env.CLIENT_URL || '';
    const allowedOrigins = rawClientUrls
      ? rawClientUrls.split(',').map((u) => u.trim())
      : ['http://localhost:5173', 'http://localhost:3000'];

    if (state) {
      try {
        const decoded = Buffer.from(state, 'base64').toString('utf-8');
        // Validate that decoded URL matches one of the allowed origins or localhost
        const isAllowed =
          allowedOrigins.some((origin) => decoded.startsWith(origin)) ||
          decoded.startsWith('http://localhost:5173') ||
          decoded.startsWith('http://localhost:3000');
          
        if (isAllowed) {
          clientUrl = decoded.replace(/\/+$/, '');
        } else {
          clientUrl = allowedOrigins[0] || 'http://localhost:5173';
        }
      } catch (err) {
        clientUrl = allowedOrigins[0] || 'http://localhost:5173';
      }
    } else {
      clientUrl = allowedOrigins[0] || 'http://localhost:5173';
    }

    try {
      const account = await this.instagramService.handleCallback(code, tenantId, userId);
      // Redirect back to frontend dashboard
      return res.redirect(`${clientUrl}/app/accounts?status=success&accountId=${account.id}`);
    } catch (error) {
      return res.redirect(`${clientUrl}/app/accounts?status=error&message=${encodeURIComponent(error.message)}`);
    }
  }

  @Get('insights')
  async getInsights(@Query('userId') userId: string = 'default-user') {
    return await this.instagramService.getAIInsights(userId);
  }

  @Post('disconnect')
  async disconnect(@Body('userId') userId: string = 'default-user') {
    return await this.instagramService.disconnect(userId);
  }
}
