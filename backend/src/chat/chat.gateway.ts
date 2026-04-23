import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private chatService: ChatService) { }

    async handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(
        @MessageBody() data: { matchId: string; senderId: string; content: string },
        @ConnectedSocket() client: Socket,
    ) {
        const message = await this.chatService.saveMessage(data);
        this.server.to(data.matchId).emit('receiveMessage', message);
        return message;
    }

    @SubscribeMessage('joinMatch')
    handleJoinMatch(
        @MessageBody() matchId: string,
        @ConnectedSocket() client: Socket,
    ) {
        client.join(matchId);
        return { event: 'joinedMatch', data: matchId };
    }
}
