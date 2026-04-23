import { MatchesService } from './matches.service';
import { MatchStatus } from '@prisma/client';
export declare class MatchesController {
    private matchesService;
    constructor(matchesService: MatchesService);
    discover(req: any): Promise<{
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
    getMyMatches(req: any): Promise<({
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
    request(req: any, targetUserId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.MatchStatus;
        score: number;
        userAId: string;
        userBId: string;
    }>;
    updateStatus(id: string, status: MatchStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.MatchStatus;
        score: number;
        userAId: string;
        userBId: string;
    }>;
}
