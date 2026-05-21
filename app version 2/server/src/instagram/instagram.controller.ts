import { Controller, Get, Post, Body, Query, Res, HttpStatus, Param } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import type { Response } from 'express';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Get('login')
  async login(@Res() res: Response) {
    const url = this.instagramService.getLoginUrl();
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
    @Res() res: Response,
    // Note: These should ideally come from the session or JWT
    // For the MVP/POC we might use query params or defaults
    @Query('tenantId') tenantId: string = 'default-tenant',
    @Query('userId') userId: string = 'default-user',
  ) {
    if (!code) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'No code provided from Meta' });
    }

    try {
      const account = await this.instagramService.handleCallback(code, tenantId, userId);
      const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
      // Redirect back to frontend dashboard
      return res.redirect(`${clientUrl}/app/accounts?status=success&accountId=${account.id}`);
    } catch (error) {
      const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
      return res.redirect(`${clientUrl}/app/accounts?status=error&message=${encodeURIComponent(error.message)}`);
    }
  }
}
