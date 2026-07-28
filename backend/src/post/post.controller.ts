import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/post.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../types/auth-user.types';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthUser,
    @Body() dto: CreatePostDto,
  ) {
    const userId = user.id;
    const imageUrl = await this.supabaseService.upload(file);
    return this.postService.createPost(userId, imageUrl, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(@Param('id') postId: string, @CurrentUser() user: AuthUser) {
    const userId = user.id;
    return this.postService.deletePost(userId, postId);
  }

  @Get('user/:userid')
  getPostsByUserId(@Param('userid') userId: string) {
    return this.postService.getAllPostsByUserId(userId);
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
}
