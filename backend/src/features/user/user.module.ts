import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { DatabaseModule } from '../../database/database.module.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module.js';

@Module({
    imports: [ConfigModule, DatabaseModule, AuthModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
