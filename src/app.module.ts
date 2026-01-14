import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MessagesModule } from './modules/messages/messages.module';
import { OrderModule } from './modules/order/order.module';
import { JobModule } from './modules/job/job.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    }),
    MessagesModule,
    JobModule,
    OrderModule,
  ],
})
export class AppModule {}
