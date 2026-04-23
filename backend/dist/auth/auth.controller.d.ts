import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: any): Promise<{
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
    login(loginDto: any): Promise<{
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
}
