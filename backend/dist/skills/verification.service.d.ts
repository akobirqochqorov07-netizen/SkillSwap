import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
export declare class VerificationService {
    private prisma;
    private usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    verifyGitHub(userId: string, skillId: string, githubUrl: string): Promise<{
        success: boolean;
        score: number;
        message: string;
    }>;
}
