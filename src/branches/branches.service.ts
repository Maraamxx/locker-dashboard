import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  // Accept user (from req.user) to decide which branches to return
  async getAll(user?: any) {
    // If no user info, default to safe behavior (empty array or all based on your policy)
    if (!user) {
      return [];
    }

    if (user.role === 'ADMIN') {
      return this.prisma.branch.findMany();
    }

    if (user.role === 'STAFF') {
      if (!user.branchId) {
        // If staff has no branch assigned, return empty array (or throw)
        return [];
      }
      // Return the single branch as an array (frontend expects an array)
      return this.prisma.branch.findMany({
        where: { id: user.branchId },
      });
    }

    // Default: no access
    return [];
  }
}
