import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { BranchesService } from './branches.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('branches')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'STAFF')
export class BranchesController {
  constructor(private service: BranchesService) {}

  @Get()
  getAll(@Req() req: Request) {
    return this.service.getAll(req.user);
  }
}
