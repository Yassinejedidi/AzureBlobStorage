import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { AzureBlobService } from './Azure_Services/azure-blob.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    userModule],
  controllers: [AppController],
  providers: [AppService ,
    
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
      
    },
  
  ],
})
export class AppModule {}
