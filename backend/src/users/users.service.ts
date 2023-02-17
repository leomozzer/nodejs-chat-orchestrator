import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>
    ) { }

    async AddUserToRoom(roomId: string, userId: string): Promise<Object> {
        try {
            await this.usersRepository.save({
                'id': userId,
                'chatId': roomId,
                'leftAt': ''
            })
        } catch (error) {
            console.log("Error")
            console.log(error)
            return error
        }
    }

    async GetUsersFromRoom(roomId: string): Promise<Array<Object>> {
        try {
            const users = await this.usersRepository.find({ where: { 'chatId': roomId }, order: { 'joinedAt': "ASC" } })
            return users
        } catch (error) {
            console.log("Error")
            console.log(error)
            return error
        }
    }
    async DisableUser(userId: string): Promise<Object> {
        try {
            const user = await this.usersRepository.findOne({ where: { 'id': userId } })
            if (user === null) {
                return 'User not found'
            }
            return await this.usersRepository.save({
                ...user,
                'active': false,
                'leftAt': new Date().toISOString()
            })

        } catch (error) {
            console.log("Error")
            console.log(error)
            return error
        }
    }

    async GetUser(userId: string) {
        try {
            const user = await this.usersRepository.findOne({ where: { 'id': userId } })
            return user
        } catch (error) {
            return error
        }
    }
}
