import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) { }

    async saveMessage(data: { matchId: string; senderId: string; content: string }) {
        return this.prisma.message.create({
            data,
            include: {
                sender: {
                    select: { name: true, id: true },
                },
            },
        });
    }

    async getMessages(matchId: string) {
        return this.prisma.message.findMany({
            where: { matchId },
            orderBy: { createdAt: 'asc' },
            include: {
                sender: {
                    select: { name: true, id: true },
                },
            },
        });
    }
}
