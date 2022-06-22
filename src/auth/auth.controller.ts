import {
  Controller,
  Post,
  Body,
  Session,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import MongooseClassSerializerInterceptor from 'src/interceptors/mongooseClassSerializer.interceptor';
import { User } from '../users/users.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    session.user = { email: user.email, id: user._id };

    return user;
  }
}
