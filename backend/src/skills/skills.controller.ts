import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { VerificationService } from './verification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('skills')
@UseGuards(JwtAuthGuard)
export class SkillsController {
    constructor(
        private skillsService: SkillsService,
        private verificationService: VerificationService,
    ) { }

    @Get()
    async findAll(@Request() req) {
        return this.skillsService.findAll(req.user.userId);
    }

    @Post()
    async create(@Request() req, @Body() data: any) {
        return this.skillsService.create(req.user.userId, data);
    }

    @Post(':id/verify')
    async verify(@Request() req, @Param('id') id: string, @Body('githubUrl') githubUrl: string) {
        return this.verificationService.verifyGitHub(req.user.userId, id, githubUrl);
    }

    @Delete(':id')
    async remove(@Request() req, @Param('id') id: string) {
        return this.skillsService.remove(req.user.userId, id);
    }
}
