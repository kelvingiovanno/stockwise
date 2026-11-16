import { Module } from '@nestjs/common';
import { UserModule } from './features/user/user.module.js';
import { DatabaseModule } from './database/database.module.js';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './features/store/store.module.js';
import { AuthModule } from './features/auth/auth.module.js';

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
