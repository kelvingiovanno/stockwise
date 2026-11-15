import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './store/store.module.js';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        UserModule,
        AuthModule,
        StoreModule,
    ],
})
export class AppModule {}
