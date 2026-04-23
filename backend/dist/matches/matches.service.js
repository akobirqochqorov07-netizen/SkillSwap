"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let MatchesService = class MatchesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findMatches(userId) {
        const userSkills = await this.prisma.skill.findMany({
            where: { userId },
        });
        const skillsHave = userSkills.filter(s => s.type === client_1.SkillType.HAVE).map(s => s.name);
        const skillsWant = userSkills.filter(s => s.type === client_1.SkillType.WANT).map(s => s.name);
        if (skillsHave.length === 0 && skillsWant.length === 0) {
            return [];
        }
        const potentialMatches = await this.prisma.user.findMany({
            where: {
                id: { not: userId },
                skills: {
                    some: {
                        name: { in: skillsWant },
                        type: client_1.SkillType.HAVE,
                    },
                },
                AND: {
                    skills: {
                        some: {
                            name: { in: skillsHave },
                            type: client_1.SkillType.WANT,
                        },
                    },
                },
            },
            include: {
                skills: true,
            },
        });
        return potentialMatches.map(match => {
            const relevanceScore = this.calculateScore(userSkills, match.skills);
            return {
                ...match,
                relevanceScore,
            };
        }).sort((a, b) => b.relevanceScore - a.relevanceScore);
    }
    calculateScore(mySkills, theirSkills) {
        let matchCount = 0;
        let totalLevel = 0;
        const myWants = mySkills.filter(s => s.type === client_1.SkillType.WANT).map(s => s.name.toLowerCase());
        const theirHaves = theirSkills.filter(s => s.type === client_1.SkillType.HAVE);
        theirHaves.forEach(skill => {
            if (myWants.includes(skill.name.toLowerCase())) {
                matchCount++;
                totalLevel += skill.level;
            }
        });
        return matchCount > 0 ? (totalLevel / matchCount) * matchCount : 0;
    }
    async createMatch(userAId, userBId) {
        return this.prisma.match.create({
            data: {
                userAId,
                userBId,
                status: client_1.MatchStatus.PENDING,
            },
        });
    }
    async updateMatchStatus(matchId, status) {
        return this.prisma.match.update({
            where: { id: matchId },
            data: { status },
        });
    }
    async getUserMatches(userId) {
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
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MatchesService);
//# sourceMappingURL=matches.service.js.map