import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class VerificationService {
    constructor(
        private prisma: PrismaService,
        private usersService: UsersService,
    ) { }

    async verifyGitHub(userId: string, skillId: string, githubUrl: string) {
        // Simulate AI analysis of the GitHub repository
        // In a real scenario, this would call OpenAI or a GitHub API scraper
        console.log(`Analyzing GitHub: ${githubUrl}`);

        // Mock simulation delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simple heuristic: if url contains "react" or "node", give higher score
        let score = 50 + Math.floor(Math.random() * 30);
        const lowercaseUrl = githubUrl.toLowerCase();
        if (lowercaseUrl.includes('react') || lowercaseUrl.includes('frontend')) {
            score += 15;
        }

        const finalScore = Math.min(score, 100);

        // Update the skill
        await this.prisma.skill.update({
            where: { id: skillId },
            data: {
                verified: true,
                level: finalScore,
            },
        });

        // Update overall user skill score
        await this.usersService.updateSkillScore(userId, finalScore);

        return {
            success: true,
            score: finalScore,
            message: `Skill verified successfully based on repository analysis!`,
        };
    }
}
