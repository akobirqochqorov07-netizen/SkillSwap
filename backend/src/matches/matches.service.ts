import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MatchStatus, SkillType } from '@prisma/client';

@Injectable()
export class MatchesService {
    constructor(private prisma: PrismaService) { }

    async findMatches(userId: string) {
        const userSkills = await this.prisma.skill.findMany({
            where: { userId },
        });

        const skillsHave = userSkills.filter(s => s.type === SkillType.HAVE).map(s => s.name);
        const skillsWant = userSkills.filter(s => s.type === SkillType.WANT).map(s => s.name);

        if (skillsHave.length === 0 && skillsWant.length === 0) {
            return [];
        }

        // Advanced query: Find users who HAVE what I WANT AND WANT what I HAVE
        const potentialMatches = await this.prisma.user.findMany({
            where: {
                id: { not: userId },
                skills: {
                    some: {
                        name: { in: skillsWant },
                        type: SkillType.HAVE,
                    },
                },
                AND: {
                    skills: {
                        some: {
                            name: { in: skillsHave },
                            type: SkillType.WANT,
                        },
                    },
                },
            },
            include: {
                skills: true,
            },
        });

        // Score results
        return potentialMatches.map(match => {
            const relevanceScore = this.calculateScore(userSkills, match.skills);
            return {
                ...match,
                relevanceScore,
            };
        }).sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    private calculateScore(mySkills: any[], theirSkills: any[]) {
        // Simple logic: number of matching skills * avg level
        let matchCount = 0;
        let totalLevel = 0;

        const myWants = mySkills.filter(s => s.type === SkillType.WANT).map(s => s.name.toLowerCase());
        const theirHaves = theirSkills.filter(s => s.type === SkillType.HAVE);

        theirHaves.forEach(skill => {
            if (myWants.includes(skill.name.toLowerCase())) {
                matchCount++;
                totalLevel += skill.level;
            }
        });

        return matchCount > 0 ? (totalLevel / matchCount) * matchCount : 0;
    }

    async createMatch(userAId: string, userBId: string) {
        return this.prisma.match.create({
            data: {
                userAId,
                userBId,
                status: MatchStatus.PENDING,
            },
        });
    }

    async updateMatchStatus(matchId: string, status: MatchStatus) {
        return this.prisma.match.update({
            where: { id: matchId },
            data: { status },
        });
    }

    async getUserMatches(userId: string) {
        return this.prisma.match.findMany({
            where: {
                OR: [
                    { userAId: userId },
                    { userBId: userId },
                ],
            },
            include: {
                userA: true,
                userB: true,
            },
        });
    }
}
