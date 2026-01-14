import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MessagesController {
  constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) {}

  @Get('send-message')
  sendMessage() {
    const data = { text: 'Hello from NestJS', date: new Date() };

    console.log('--- Đang gửi tin nhắn... ---');
    return this.client.send('top-tuc-chao-hoi', data);
  }

  @MessagePattern('top-tuc-chao-hoi')
  handleMessage(@Payload() data: any) {
    console.log('--- Đã nhận được tin nhắn: ---', data);

    const result = `Server đã nhận: ${data.text} lúc ${data.date}`;

    return result;
  }
}
