import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../types/auth-user.types';
import { AppLangDto } from './dto/lang.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch('me/language')
  @UseGuards(AuthGuard('jwt'))
  updateLanguage(@CurrentUser() user: AuthUser, @Body() dto: AppLangDto) {
    return this.userService.updateLanguage(user.id, dto);
  }
}
