import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { StoreService } from './store.service.js';
import { CreateStoreDto } from './dto/create-store.dto.js';
import { UpdateStoreDto } from './dto/update-store.dto.js';
import { AssignStoreDto } from './dto/assign-store.dto.js';
import { RevokeStoreDto } from './dto/revoke-store.dto.js';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post()
    async create(@Body() createStoreDto: CreateStoreDto) {
        return this.storeService.create(createStoreDto);
    }

    @Get()
    async findAll() {
        return this.storeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.storeService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateStoreDto: UpdateStoreDto,
    ) {
        return this.storeService.update(id, updateStoreDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.storeService.remove(id);
    }

    @Post('assign')
    async assign(@Body() assignStoreDto: AssignStoreDto) {
        return await this.storeService.assign(assignStoreDto);
    }

    @Delete('revoke')
    async revoke(@Body() revokeStoreDto: RevokeStoreDto) {
        return await this.storeService.revoke(revokeStoreDto);
    }
}
