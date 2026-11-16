import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../../database/prisma.service.js';
import { customAlphabet } from 'nanoid/non-secure';
import { User } from '../../generated/prisma/client.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: { username: createUserDto.username },
        });

        if (user) throw new ConflictException('Username already exists');

        const action = await this.prismaService.user.create({
            data: {
                code: `USR-${this.generateCode()}`,
                ...createUserDto,
            },
        });

        return action;
    }

    async findAll(): Promise<User[]> {
        const users = await this.prismaService.user.findMany();

        return users;
    }

    async findOne(id: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        if (user) return user;

        throw new NotFoundException();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: { username: updateUserDto.username },
        });

        if (user) throw new ConflictException('Username already exists');

        const action = await this.prismaService.user.update({
            where: { id },
            data: updateUserDto,
        });

        return action;
    }

    async remove(id: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        if (!user) throw new NotFoundException();

        const action = await this.prismaService.user.delete({
            where: { id },
        });

        throw action;
    }

    async access(id: string) {
        const records = await this.prismaService.storeAccess.findMany({
            where: {userId: id},
        });

        return records;
    }

    async select(userId: string, storeId: string) {
        const record = await this.prismaService.storeAccess.findUnique({
            where: {
                userId,
                storeId,
            },
        });

        if (!record) throw new UnauthorizedException();

        const payload = {
            storeId: record.storeId,
            role: record.userRole,
        }

        const accessToken = await this.jwtService.signAsync(
            payload,
            {
                expiresIn: Number(this.configService.getOrThrow<string>('STORE_ACCESS_EXPIRES_IN')),
            }
        );

        return accessToken;

    }

    private generateCode() {
        const code = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

        return code;
    }
}
