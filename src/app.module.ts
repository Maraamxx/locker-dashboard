import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BranchesModule } from './branches/branches.module';
import { LockersModule } from './lockers/lockers.module';

@Module({
  imports: [AuthModule, BranchesModule, LockersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
