import { SkillsService } from './skills.service';
import { VerificationService } from './verification.service';
export declare class SkillsController {
    private skillsService;
    private verificationService;
    constructor(skillsService: SkillsService, verificationService: VerificationService);
    findAll(req: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SkillType;
        level: number;
        verified: boolean;
        userId: string;
    }[]>;
    create(req: any, data: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.SkillType;
        level: number;
        verified: boolean;
        userId: string;
    }>;
    verify(req: any, id: string, githubUrl: string): Promise<{
        success: boolean;
        score: number;
        message: string;
    }>;
    remove(req: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
