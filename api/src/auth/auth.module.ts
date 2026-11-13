import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import{PrismaModule} from '../prisma/prisma.module.js'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import{RolesGuard} from './guards/roles.guard.js'

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService,JwtStrategy,RolesGuard ],
  controllers: [AuthController]
})
export class AuthModule {}
