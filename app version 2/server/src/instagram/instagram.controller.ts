import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
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
      // Redirect back to frontend dashboard
      return res.redirect(`http://localhost:5173/accounts?status=success&accountId=${account.id}`);
    } catch (error) {
      return res.redirect(`http://localhost:5173/accounts?status=error&message=${encodeURIComponent(error.message)}`);
    }
  }
}
