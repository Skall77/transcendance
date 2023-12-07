import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, FilesModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AppModule {}
