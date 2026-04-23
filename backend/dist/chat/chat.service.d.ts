import { PrismaService } from '../prisma.service';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    saveMessage(data: {
        matchId: string;
        senderId: string;
        content: string;
    }): Promise<{
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
