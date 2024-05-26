import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotifyEmailDto } from 'apps/notifications/src/dto/notify-email.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('SMTP_CLIENT_ID'),
      clientSecret: this.configService.get('SMTP_CLIENT_SECRET'),
      refreshToken: this.configService.get('SMTP_REFRESH_TOKEN'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async notifyEmail({ email, text }: NotifyEmailDto) {
    console.log('email: ', email);
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Sleepr Notification ✔',
      text: text,
    });
  }
}
