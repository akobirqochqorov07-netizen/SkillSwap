import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(private chatService: ChatService) { }

    @Get(':matchId/messages')
    async getMessages(@Param('matchId') matchId: string) {
        return this.chatService.getMessages(matchId);
    }
}
