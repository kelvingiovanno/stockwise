import { Module } from '@nestjs/common';
import { StoreService } from './store.service.js';
import { StoreController } from './store.controller.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
    imports: [DatabaseModule],
    controllers: [StoreController],
    providers: [StoreService],
})
export class StoreModule {}
