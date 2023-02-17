import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from './rooms.entity';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Rooms) private roomsRepository: Repository<Rooms>,
        private readonly messageService: MessagesService,
        private readonly usersService: UsersService
    ) { }

    async NewRoom(chatId: string): Promise<Object> {
        try {
            await this.roomsRepository.save({
                'id': chatId,
                'active': true,
                'createdAt': new Date().toISOString()
            })
            return 'new room'
        }
        catch (error) {
            console.log("Error")
            console.log(error)
            return error
        }
    }

    async ListRooms(): Promise<Array<Object>> {
        try {
            const ListRooms = await this.roomsRepository.find();
            return ListRooms
        }
        catch (error) {
            return []
        }
    }

    async AvailableRooms(): Promise<Array<object>> {
        try {
            const rooms = await this.roomsRepository.find({ where: { 'active': true }, order: { 'createdAt': "ASC" } });
            return rooms
        }
        catch (error) {
            return []
        }
    }

    async GetRoom(id: string): Promise<Object> {
        try {
            const room = await this.roomsRepository.findOne({ where: { 'id': id } })
            if (room === null) {
                return {
                    'error': `Room ${id} not located`
                }
            }
            const users = await this.usersService.GetUsersFromRoom(id)
            const messages = (await this.messageService.GetMessages(id)).map(msg => {
                let userActive = users.find((user) => {
                    return msg['origin'] === user['id']
                })
                return {
                    ...msg,
                    'userActive': userActive['active']
                }
            })
            return {
                ...room,
                'messages': messages,
                'users': users
            }
        }
        catch (error) {
            return error
        }
    }

    async UpdateRoomHistory(id: string): Promise<Object> {
        try {
            const room = await this.roomsRepository.findOne({ where: { id } })
            if (room === null) {
                return 'Room not found'
            }
            return await this.roomsRepository.save({
                ...room,
                'updatedAt': new Date().toISOString()
            })

        }
        catch (error) {
            console.log("Error")
            console.log(error)
            return error
        }
    }

    async CountAvailableUsersOnRoom(id: string): Promise<Object> {
        try {
            const getUser = await this.usersService.GetUser(id)
            if (getUser === null) {
                throw 'User not found'
            }
            let chatId = ''
            const users = (await this.usersService.GetUsersFromRoom(getUser['chatId'])).filter(user => {
                chatId = user['chatId']
                return user['active'] === true
            })
            return {
                'activeUser': users.length,
                chatId
            }
        }
        catch (error) {
            return error
        }
    }

    async DisableRoom(id: string): Promise<Object> {
        try {
            const room = await this.roomsRepository.findOne({ where: { id } })
            if (room === null) {
                return 'Room not found'
            }
            return await this.roomsRepository.save({
                ...room,
                'updatedAt': new Date().toISOString(),
                'active': false
            })

        }
        catch (error) {
            console.log("Error")
            console.log(error)
            return error
        }
    }
}
