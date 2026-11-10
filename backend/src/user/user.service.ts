import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { User } from '../generated/prisma/client.js';

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService) {}

  async findByUsername(username: string): Promise<User|null> {
    
    const user = this.prismaService.user.findUnique({
      where: {username},
    });
    
    return user;
    
  }

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
