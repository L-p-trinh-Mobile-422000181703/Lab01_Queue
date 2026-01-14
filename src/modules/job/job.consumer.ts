import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';

import {
  MailService,
  type OrderEmailModel,
} from '../../shared/mail/mail.service';
import { ORDER_EMAIL_QUEUE, SEND_ORDER_EMAIL_JOB } from './job.constants';

export type SendOrderEmailJobData = {
  to: string;
  order: OrderEmailModel;
};

@Processor(ORDER_EMAIL_QUEUE)
export class JobConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process(SEND_ORDER_EMAIL_JOB)
  async handleSendOrderEmail(job: Job<SendOrderEmailJobData>) {
    const { to, order } = job.data;
    return this.mailService.sendOrderEmail({ to, order });
  }
}
