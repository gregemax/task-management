import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Guard } from './entities/guard';
import { JwtStrategy } from './entities/jwtstratage';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: '123456',
      signOptions: {
        expiresIn: '4d',
      },
    }),
   
  ],
  providers: [AuthResolver, AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
