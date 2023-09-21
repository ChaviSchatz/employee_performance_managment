import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import 'dotenv/config'
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    UserModule, 
    PassportModule,     
    JwtModule.register({
      secret: "topsecret",
      signOptions: { expiresIn: '3600s' },
    }), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy,
    UserService
  ],
  controllers: [AuthController],
})
export class AuthModule {}