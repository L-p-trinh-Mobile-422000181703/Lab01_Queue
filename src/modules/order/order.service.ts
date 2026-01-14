import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import {
  MailService,
  type OrderEmailModel,
} from '../../shared/mail/mail.service';
import { ORDER_EMAIL_QUEUE, SEND_ORDER_EMAIL_JOB } from '../job/job.constants';
import type { SendOrderEmailJobData } from '../job/job.consumer';
import { SendOrderEmailDto } from './dto/send-order-email.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly mailService: MailService,
    @InjectQueue(ORDER_EMAIL_QUEUE)
    private readonly orderEmailQueue: Queue<SendOrderEmailJobData>,
  ) {}

  private mockOrder(orderId?: string): OrderEmailModel {
    const id = orderId || `ORD-${Math.floor(Math.random() * 1_000_000)}`;
    return {
      orderId: id,
      customerName: 'Mock User',
      total: 123.45,
      createdAt: new Date().toISOString(),
    };
  }

  async sendEmailDirect(dto: SendOrderEmailDto) {
    const to = dto.to || 'test@example.com';
    const order = this.mockOrder(dto.orderId);
    const result = await this.mailService.sendOrderEmail({ to, order });
    return { ok: true, mode: 'direct', ...result };
  }

  async sendEmailJob(dto: SendOrderEmailDto) {
    const to = dto.to || 'test@example.com';
    const order = this.mockOrder(dto.orderId);

    const job = await this.orderEmailQueue.add(SEND_ORDER_EMAIL_JOB, {
      to,
      order,
    });
    return { ok: true, mode: 'job', jobId: job.id };
  }
}
