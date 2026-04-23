import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: any) {
        const { email, password, name, university } = data;
        const existingUser = await this.prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                university,
            },
        });

        const { password: _, ...result } = user;
        return {
            user: result,
            access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
        };
    }

    async login(data: any) {
        const { email, password } = data;
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password: _, ...result } = user;
            return {
                user: result,
                access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async validateUser(payload: any) {
        return this.prisma.user.findUnique({ where: { id: payload.sub } });
    }
}
