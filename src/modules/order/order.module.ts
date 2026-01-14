import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { JobModule } from '../job/job.module';

@Module({
  imports: [JobModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
