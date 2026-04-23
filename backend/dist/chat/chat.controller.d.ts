import { ChatService } from './chat.service';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    getMessages(matchId: string): Promise<({
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
    })[]>;
}
