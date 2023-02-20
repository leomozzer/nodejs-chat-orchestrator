import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from 'src/gateway/gateway.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Chat } from './chat/chat.entity';
import { ChatModule } from './chat/chat.module';
import { Messages } from './messages/messages.entity';
import { Rooms } from './rooms/rooms.entity';
import { RoomsModule } from './rooms/rooms.module';
import { Users } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GatewayModule,
    ChatModule,
    RoomsModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Rooms, Users, Chat, Messages],
      synchronize: true,
      ssl:{
        ca: ''
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
