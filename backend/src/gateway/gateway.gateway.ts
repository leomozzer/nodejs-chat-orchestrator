import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({ namespace: '/rooms' })
export class MyGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    async handleConnection(client: Socket) {
        console.log(`Client ${client.id} connected on /rooms`)
        let roomId = ''
        client.emit('connected', { 'id': client.id, 'room': roomId })
        return this.server.emit('New user', { id: client.id })
    }

    async handleDisconnect(client: Socket) {
        console.log(`Client ${client.id} disconneted of /rooms`)
        return this.server.emit('User left', { id: client.id })
    }

    @SubscribeMessage('newMessage')
    async handleMessage(@MessageBody() body: any) {
        const { room, text, id } = body
        return this.server.emit('New Message', { 'text': text, 'id': id })
    }
}
