import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user: User = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email already in use',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    // hashing the password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hash;

    const { password, ...newUser } = await this.prisma.user.create({
      data: createUserDto,
    });
    return newUser;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const { password, ...user } = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
