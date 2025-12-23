import { Module } from '@nestjs/common';
import { LockersController } from './lockers.controller';
import { LockersService } from './lockers.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [LockersController],
  providers: [LockersService, PrismaService]
})
export class LockersModule {}
