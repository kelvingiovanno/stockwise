import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { DatabaseModule } from '../database/database.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, DatabaseModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
