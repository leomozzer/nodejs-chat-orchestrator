import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { ChatService } from "./chat.service";
import { MessagesService } from "src/messages/messages.service";
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly chatService: ChatService,
        private readonly messageService: MessagesService
    ) { }
    @WebSocketServer()
    server: Server;

    async handleConnection(client: Socket) {
        console.log(`Client ${client.id} connected on /chat`)
        this.chatService.NewChat(client.id)
        client.emit('connected', { 'id': uuidv4(), 'socket': client.id })
    }

    async handleDisconnect(client: Socket) {
        console.log(`Client ${client.id} disconneted from /chat`)
        await this.chatService.ArchiveChat(client.id)
    }

    @SubscribeMessage('newMessage')
    async handleMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
        const { text } = body
        await this.messageService.NewMessage(client.id, text, 'user')
        const tmpMessage = `message '${text}' received at ${new Date().toString()}`
        await this.messageService.NewMessage(client.id, tmpMessage, 'chatbot')
        await this.chatService.UpdateChat(client.id)
        return {
            'event': 'response',
            'data': tmpMessage
        }
    }
}