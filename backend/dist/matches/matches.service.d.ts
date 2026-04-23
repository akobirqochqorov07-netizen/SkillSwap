import { PrismaService } from '../prisma.service';
import { MatchStatus } from '@prisma/client';
export declare class MatchesService {
    private prisma;
    constructor(prisma: PrismaService);
    findMatches(userId: string): Promise<{
        relevanceScore: number;
        skills: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.SkillType;
            level: number;
            verified: boolean;
            userId: string;
        }[];
        email: string;
        password: string;
        name: string;
        university: string | null;
        id: string;
        bio: string | null;
        skillScore: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    private calculateScore;
    createMatch(userAId: string, userBId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.MatchStatus;
        score: number;
        userAId: string;
        userBId: string;
    }>;
    updateMatchStatus(matchId: string, status: MatchStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.MatchStatus;
        score: number;
        userAId: string;
        userBId: string;
    }>;
    getUserMatches(userId: string): Promise<({
        userA: {
            email: string;
            password: string;
            name: string;
            university: string | null;
            id: string;
            bio: string | null;
            skillScore: number;
            createdAt: Date;
            updatedAt: Date;
        };
        userB: {
            email: string;
            password: string;
            name: string;
            university: string | null;
            id: string;
            bio: string | null;
            skillScore: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.MatchStatus;
        score: number;
        userAId: string;
        userBId: string;
    })[]>;
}
