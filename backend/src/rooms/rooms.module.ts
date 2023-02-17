import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from 'src/messages/messages.module';
import { UsersModule } from 'src/users/users.module';
import { ConnectedUsers } from './connectedUsers.entity';
import { RoomsController } from './rooms.controller';
import { Rooms } from './rooms.entity';
import { RoomsGateway } from './rooms.gateway';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    MessagesModule,
    UsersModule,
    TypeOrmModule.forFeature([Rooms, ConnectedUsers])
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsGateway],
  //exports: [RoomsService]
})
export class RoomsModule { }
