import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SkillType } from '@prisma/client';

@Injectable()
export class SkillsService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId: string) {
        return this.prisma.skill.findMany({
            where: { userId },
        });
    }

    async create(userId: string, data: { name: string; type: SkillType; level?: number }) {
        return this.prisma.skill.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    async remove(userId: string, id: string) {
        return this.prisma.skill.deleteMany({
            where: { id, userId },
        });
    }

    async verifySkill(id: string, skillScore: number) {
        return this.prisma.skill.update({
            where: { id },
            data: {
                verified: true,
                level: skillScore,
            },
        });
    }
}
