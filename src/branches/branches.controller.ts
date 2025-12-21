import { Controller, Get, UseGuards } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('branches')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('STAFF')
export class BranchesController {
  constructor(private service: BranchesService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
