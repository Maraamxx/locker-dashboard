import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.branch.findMany();
  }
}
