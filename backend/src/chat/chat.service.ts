import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private chatRepository: Repository<Chat>,
        private readonly messageService: MessagesService
    ) { }
    async NewChat(chatId: string): Promise<Object> {
        try {
            await this.chatRepository.save({
                'id': chatId
            })
            return 'new chat'
        }
        catch (error) {
            console.log("Error")
            console.log(error)
            return error
        }
    }
    async UpdateChat(chatId: string): Promise<Object> {
        try {
            const chat = await this.chatRepository.findOne({ where: { id: chatId } })
            await this.chatRepository.save({
                ...chat,
                'updatedAt': new Date().toISOString()
            })
            return 'chat updated'
        }
        catch (error) {
            return error
        }
    }
    async ArchiveChat(id: string): Promise<Object> {
        try {
            const chat = await this.chatRepository.findOne({ where: { id } })
            if (chat === null) {
                return 'Chat not found'
            }
            return await this.chatRepository.save({
                ...chat,
                'active': false,
                'updatedAt': new Date().toISOString()
            })
        }
        catch (error) {
            return error
        }
    }
    async ListChats(): Promise<Array<Object>> {
        try {
            const listChats = await this.chatRepository.find();

            return listChats
        } catch (error) {
            return []
        }
    }
    async GetChat(id: string): Promise<Object> {
        try {
            const chat = await this.chatRepository.findOne({ where: { 'id': id } });
            if (chat === null) {
                return {
                    'error': `Chat ${id} not located`
                }
            }
            const messages = await this.messageService.GetMessages(id)
            return {
                ...chat,
                ...messages
            }
        } catch (error) {
            return error
        }
    }
}
