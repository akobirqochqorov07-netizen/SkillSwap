import { PrismaService } from '../prisma.service';
import { SkillType } from '@prisma/client';
export declare class SkillsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SkillType;
        level: number;
        verified: boolean;
        userId: string;
    }[]>;
    create(userId: string, data: {
        name: string;
        type: SkillType;
        level?: number;
    }): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SkillType;
        level: number;
        verified: boolean;
        userId: string;
    }>;
    remove(userId: string, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    verifySkill(id: string, skillScore: number): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SkillType;
        level: number;
        verified: boolean;
        userId: string;
    }>;
}
