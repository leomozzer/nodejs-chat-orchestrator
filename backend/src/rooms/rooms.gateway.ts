import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { MessagesService } from "src/messages/messages.service";
import { UsersService } from "src/users/users.service";
import { v4 as uuidv4 } from 'uuid';
import { RoomsService } from "./rooms.service";

@WebSocketGateway({ namespace: '/rooms' })
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly roomsService: RoomsService,
        private readonly messageService: MessagesService,
        private readonly usersService: UsersService
    ) { }
    @WebSocketServer()
    server: Server;
    async handleConnection(client: Socket) {
        console.log(`Client ${client.id} connected on /rooms`)
        // const checkRooms = await this.roomsService.AvailableRooms()
        let roomId = ''
        // if (checkRooms.length === 0) {
        //     roomId = uuidv4()
        //     await this.roomsService.NewRoom(roomId)
        // }
        // roomId = checkRooms.length > 0 ? checkRooms[0]['id'] : roomId
        // await this.usersService.AddUserToRoom(roomId, client.id)
        client.emit('connected', { 'id': client.id, 'room': roomId })
        return this.server.emit('New user', { id: client.id })
    }

    async handleDisconnect(client: Socket) {
        console.log(`Client ${client.id} disconneted of /rooms`)
        // await this.usersService.DisableUser(client.id)
        // const chatDetails = await this.roomsService.CountAvailableUsersOnRoom(client.id)
        // if (chatDetails['activeUser'] === 0) {
        //     await this.roomsService.DisableRoom(chatDetails['chatId'])
        // }
        return this.server.emit('User left', { id: client.id })
    }

    @SubscribeMessage('newMessage')
    async handleMessage(@MessageBody() body: any) {
        const { room, text, id } = body
        // await this.messageService.NewMessage(room, text, id)
        // await this.roomsService.UpdateRoomHistory(room)
        return this.server.emit('New Message', { 'text': text, 'id': id })
    }
}
