import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { userService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config'
import { APP_GUARD } from '@nestjs/core';
import { User } from 'src/enteties/user.entity';
import { AzureBlobService } from 'src/Azure_Services/azure-blob.service';


const jwtConfig= config.get('jwt');
@Module({
  imports: [
    PassportModule.register({
defaultStrategy:'jwt'
    }),
    JwtModule.register({
      secret:process.env.JWT_SECRET || jwtConfig.secret,
      signOptions:{
        expiresIn:jwtConfig.expiresIn,
      }
    }),
    TypeOrmModule.forFeature([User])

  ],
  controllers: [userController],
  providers: [userService,
  JwtStrategy,
  AzureBlobService
  
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ]
})
export class userModule {}
