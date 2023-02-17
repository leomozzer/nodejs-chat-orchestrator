import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from './messages.entity';
import { v4 as uuid } from 'uuid';


@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Messages) private messagesRepository: Repository<Messages>
    ) { }

    async NewMessage(chatId: string, text: string, origin: string): Promise<Object> {
        try {
            const id = uuid();
            await this.messagesRepository.save({
                'id': id,
                chatId,
                origin,
                text
            })
            return 'done'
        }
        catch (error) {
            return error
        }
    }
    async GetMessages(chatId: string) {
        const messages = await this.messagesRepository.find({
            where: {
                chatId
            },
            order: {
                'createdAt': "ASC"
            }
        })
        return messages;
    }
}
