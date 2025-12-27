import { Controller, Get, Req, Param, UseGuards, ForbiddenException } from '@nestjs/common';
import { LockersService } from './lockers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('lockers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LockersController {
  constructor(private service: LockersService) {}

  @Get('branch/:branchId')
  @Roles('ADMIN', 'STAFF')
  async findByBranch(@Param('branchId') branchId: string, @Req() req) {
    const user = req.user;

    // ADMIN → full access
    if (user.role === 'ADMIN') {
      return this.service.getByBranch(branchId);
    }

    // STAFF → can ONLY access their assigned branch
    if (user.role === 'STAFF' && user.branchId !== branchId) {
      throw new ForbiddenException('You are not allowed to access this branch');
    }

    return this.service.getByBranch(branchId);
  }

  @Get(':id')
  @Roles('ADMIN', 'STAFF')
  async findOne(@Param('id') id: string, @Req() req) {
    return this.service.getOne(id);
  }
}
