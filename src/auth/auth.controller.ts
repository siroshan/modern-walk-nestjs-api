import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.gurad';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Public()
  @Post('signup')
  signup(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }
}
