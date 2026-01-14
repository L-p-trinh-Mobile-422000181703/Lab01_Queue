import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { MailModule } from '../../shared/mail/mail.module';
import { JobConsumer } from './job.consumer';
import { ORDER_EMAIL_QUEUE } from './job.constants';

@Module({
  imports: [MailModule, BullModule.registerQueue({ name: ORDER_EMAIL_QUEUE })],
  providers: [JobConsumer],
  exports: [BullModule],
})
export class JobModule {}
