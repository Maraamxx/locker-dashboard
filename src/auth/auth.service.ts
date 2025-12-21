import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnauthorizedException("Wrong credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException("Wrong credentials");

    const token = this.jwt.sign({ id: user.id, role: user.role });
    return { token };
  }
}
