import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { User } from '../generated/prisma/client.js';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const username = await this.prismaService.user.findUnique({
            where: { username: createUserDto.username },
        });

        if (username) throw new ConflictException('Username already exists');

        const user = await this.prismaService.user.create({
            data: createUserDto,
        });

        return user;
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

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<User | null> {
        const username = await this.prismaService.user.findUnique({
            where: { username: updateUserDto.username },
        });

        if (username) throw new ConflictException('Username already exists');

        const user = await this.prismaService.user.update({
            where: { id },
            data: updateUserDto,
        });

        if (user) return user;

        throw new NotFoundException();
    }

    async remove(id: string): Promise<User | null> {
        const user = await this.prismaService.user.delete({
            where: { id },
        });

        if (user) return user;

        throw new NotFoundException();
    }
}
