import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MatchStatus } from '@prisma/client';

@Controller('matches')
@UseGuards(JwtAuthGuard)
export class MatchesController {
    constructor(private matchesService: MatchesService) { }

    @Get('discover')
    async discover(@Request() req) {
        return this.matchesService.findMatches(req.user.userId);
    }

    @Get('my-matches')
    async getMyMatches(@Request() req) {
        return this.matchesService.getUserMatches(req.user.userId);
    }

    @Post(':userId')
    async request(@Request() req, @Param('userId') targetUserId: string) {
        return this.matchesService.createMatch(req.user.userId, targetUserId);
    }

    @Patch(':id/status')
    async updateStatus(@Param('id') id: string, @Body('status') status: MatchStatus) {
        return this.matchesService.updateMatchStatus(id, status);
    }
}
