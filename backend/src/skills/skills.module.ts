import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { VerificationService } from './verification.service';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [SkillsService, VerificationService, PrismaService, UsersService],
  controllers: [SkillsController],
  exports: [SkillsService, VerificationService],
})
export class SkillsModule { }
