import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LockersService } from './lockers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('lockers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('STAFF')
export class LockersController {
  constructor(private service: LockersService) {}

  @Get('branch/:branchId')
  findByBranch(@Param('branchId') branchId: string) {
    return this.service.getByBranch(branchId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }
}
