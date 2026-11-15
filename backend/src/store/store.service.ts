import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateStoreDto } from './dto/create-store.dto.js';
import { UpdateStoreDto } from './dto/update-store.dto.js';
import { AssignStoreDto } from './dto/assign-store.dto.js';
import { RevokeStoreDto } from './dto/revoke-store.dto.js';
import { customAlphabet } from 'nanoid';
import { Store, StoreAccess } from '../generated/prisma/client.js';

@Injectable()
export class StoreService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createStoreDto: CreateStoreDto): Promise<Store> {
        const store = await this.prismaService.store.findUnique({
            where: { name: createStoreDto.name },
        });

        if (store) throw new ConflictException();

        const action = await this.prismaService.store.create({
            data: {
                name: createStoreDto.name,
                code: `STR-${this.generateCode()}`,
            },
        });

        return action;
    }

    async findAll(): Promise<Store[]> {
        const stores = await this.prismaService.store.findMany();
        return stores;
    }

    async findOne(id: string): Promise<Store> {
        const store = await this.prismaService.store.findUnique({
            where: { id },
        });

        if (!store) throw new NotFoundException();

        return store;
    }

    async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
        const store = await this.prismaService.store.findUnique({
            where: { name: updateStoreDto.name },
        });

        if (store) throw new ConflictException();

        const action = await this.prismaService.store.update({
            where: { id },
            data: {
                name: updateStoreDto.name,
            },
        });

        return action;
    }

    async remove(id: string): Promise<Store> {
        const store = this.prismaService.store.findUnique({
            where: {
                id,
            },
        });

        if (!store) throw new NotFoundException();

        const action = this.prismaService.store.delete({
            where: { id },
        });

        return action;
    }

    async assign(assignStoreDto: AssignStoreDto): Promise<StoreAccess[]> {
        const store = await this.prismaService.store.findUnique({
            where: { id: assignStoreDto.storeId },
            select: {
                id: true,
            },
        });

        if (!store) throw new NotFoundException();

        assignStoreDto.users.forEach(async (user) => {
            const record = await this.prismaService.user.findUnique({
                where: { id: user.userId },
            });

            if (!record) throw new NotFoundException();
        });

        const records = Promise.all(
            assignStoreDto.users.map(async (user) => {
                const record = await this.prismaService.storeAccess.upsert({
                    where: {
                        storeId: assignStoreDto.storeId,
                        userId: user.userId,
                    },
                    update: {
                        storeId: assignStoreDto.storeId,
                        userId: user.userId,
                        userRole: user.role,
                    },
                    create: {
                        storeId: assignStoreDto.storeId,
                        userId: user.userId,
                        userRole: user.role,
                    },
                });

                return record;
            }),
        );

        return records;
    }

    async revoke(revokeStoreDto: RevokeStoreDto): Promise<StoreAccess> {
        const record = await this.prismaService.storeAccess.findUnique({
            where: {
                userId: revokeStoreDto.userId,
                storeId: revokeStoreDto.storeId,
            },
        });

        if (!record) throw new NotFoundException();

        const action = await this.prismaService.storeAccess.delete({
            where: {
                storeId: revokeStoreDto.storeId,
                userId: revokeStoreDto.storeId,
            },
        });

        return action;
    }

    private generateCode() {
        const code = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

        return code;
    }
}
