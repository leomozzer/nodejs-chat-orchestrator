import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }
    @Get(':id/message')
    NewMessage(@Param('id') id) {
        return this.chatService.UpdateChat(id)
    }
    @Get()
    ListChats() {
        return this.chatService.ListChats();
    }

    @Get(':id')
    GetChat(@Param('id') id): Object {
        return this.chatService.GetChat(id)
    }
}
