import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import { renderOrderEmailHtml } from './templates/order-email.template';

export type OrderEmailModel = {
  orderId: string;
  customerName: string;
  total: number;
  createdAt: string;
};

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {}

  private getTransporter() {
    const SMTP_HOST =
      this.configService.get<string>('SMTP_HOST') || 'smtp.gmail.com';
    const SMTP_PORT = parseInt(
      this.configService.get<string>('SMTP_PORT') || '587',
      10,
    );
    const SMTP_USER =
      this.configService.get<string>('SMTP_USER') || 'user@gmail.com';
    const SMTP_PASS = this.configService.get<string>('SMTP_PASS') || 'password';

    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  async sendOrderEmail(params: { to: string; order: OrderEmailModel }) {
    const SMTP_USER =
      this.configService.get<string>('SMTP_USER') || 'user@gmail.com';
    const FROM_EMAIL =
      this.configService.get<string>('FROM_EMAIL') ||
      `"LightSpace CMS" <${SMTP_USER}>`;

    const subject = `Order ${params.order.orderId} confirmation`;
    const html = renderOrderEmailHtml(params.order);

    const transporter = this.getTransporter();
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: params.to,
      subject,
      html,
    });

    this.logger.log(
      `Sent order email to ${params.to} (messageId=${info.messageId})`,
    );
    return { messageId: info.messageId };
  }
}
