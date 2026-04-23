import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleMessage(data: {
        matchId: string;
        senderId: string;
        content: string;
    }, client: Socket): Promise<{
        sender: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        matchId: string;
        senderId: string;
    }>;
    handleJoinMatch(matchId: string, client: Socket): {
        event: string;
        data: string;
    };
}
