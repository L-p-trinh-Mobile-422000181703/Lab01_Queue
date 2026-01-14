import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { SendOrderEmailDto } from './dto/send-order-email.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('send-email-direct')
  sendEmailDirect(@Body() body: SendOrderEmailDto) {
    return this.orderService.sendEmailDirect(body);
  }

  @Post('send-email-job')
  sendEmailJob(@Body() body: SendOrderEmailDto) {
    return this.orderService.sendEmailJob(body);
  }
}
