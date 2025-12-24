import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LockersService {
  constructor(private prisma: PrismaService) {}

  getByBranch(branchId: string) {
    return this.prisma.locker.findMany({
      where: { branchId },
      orderBy: [{ type: 'asc' }, { number: 'asc' }]
    });
  }

  getOne(id: string) {
    return this.prisma.locker.findUnique({ where: { id } });
  }
}
