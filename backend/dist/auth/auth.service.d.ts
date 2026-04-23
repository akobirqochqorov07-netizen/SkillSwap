import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: any): Promise<{
        user: {
            email: string;
            name: string;
            university: string | null;
            id: string;
            bio: string | null;
            skillScore: number;
            createdAt: Date;
            updatedAt: Date;
        };
        access_token: string;
    }>;
    login(data: any): Promise<{
        user: {
            email: string;
            name: string;
            university: string | null;
            id: string;
            bio: string | null;
            skillScore: number;
            createdAt: Date;
            updatedAt: Date;
        };
        access_token: string;
    }>;
    validateUser(payload: any): Promise<{
        email: string;
        password: string;
        name: string;
        university: string | null;
        id: string;
        bio: string | null;
        skillScore: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
