import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from '@prisma/client';
import { JwtPayload } from './jwt-payload.interface';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      //what we return here will be available in the req object
      //(in sign in req)
      return result;
    }
    return null;
  }
  async signIn(
    user: Omit<User, 'password'>,
  ): Promise<{ access_token: string }> {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(userDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return await this.usersService.create(userDto);
  }

  async sendOTPMail(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const link = `http://localhost:3000/account?token=${accessToken}`;
    return await this.mailService.sendOTPMail(link, user.firstName, user.email);
  }
}
