import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    NotFoundException,
    Req,
    Res,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { AuthRequest } from '../auth/types/auth-request.type.js';
import { SelectStoreDto } from './dto/select-store.dto.js';
import { HttpAdapterHost } from '@nestjs/core';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SystemRolesGuard } from '../../common/guards/system-roles.guard.js';
import { SystemRoles } from '../../common/decorators/system-roles.decorators.js';

@UseGuards(JwtAuthGuard)
@UseGuards(SystemRolesGuard)
@SystemRoles('SUPERADMIN')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly adapterHost: HttpAdapterHost,
        private readonly configService: ConfigService,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.remove(id);
    }

    @Get('/me/stores')
    async access(@Req() req: AuthRequest) {
        return await this.userService.access(req.user.id)
    }

    @Post('/me/active-store')
    async select(
        @Req() req: AuthRequest, 
        @Res({passthrough: true}) res: Response,
        @Body() selectStoreDto: SelectStoreDto
    ) {
        
        const token = await this.userService.select(req.user.id, selectStoreDto.storeId);

        this.adapterHost.httpAdapter.setCookie(
            res, 
            'store-token',
            token,
            {
                maxAge: Number(this.configService.getOrThrow<string>('STORE_ACCESS_EXPIRES_IN')),
            }
        );
        
    }
}
