import { Module } from '@nestjs/common';
import { StoreService } from './store.service.js';
import { StoreController } from './store.controller.js';
import { DatabaseModule } from '../../database/database.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        DatabaseModule, 
        AuthModule, 
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('JWT_SECRET'),
            }),
        }),
    ],
    controllers: [StoreController],
    providers: [StoreService],
})
export class StoreModule {}
