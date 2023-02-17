import { Controller, Get, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Get()//create a new room
    //Will need to redirect to the room url
    ListRooms() {
        return this.roomsService.ListRooms()
    }
    @Get('new')//create a new room
    //Will need to redirect to the room url
    NewRoom(): string {
        return 'Room page'
    }
    @Get(':id')
    JoinRoom(@Param('id') id) {
        return this.roomsService.GetRoom(id)
    }
    @Get(':id/messages')
    GetMessages(@Param('id') id): string {
        return `Joined room ${id}`
    }
}
