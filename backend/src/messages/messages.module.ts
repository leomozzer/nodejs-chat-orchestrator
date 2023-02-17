import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './messages.entity';
import { MessagesService } from './messages.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Messages])
    ],
    providers: [MessagesService],
    exports: [MessagesService]
})
export class MessagesModule { }
