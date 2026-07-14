import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { CreatePostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createPost(@Req() req: Request, @Body() dto: CreatePostDto) {
    const user = req.user as { id: string; email: string };
    const userId = user.id;
    return this.postService.createPost(userId, dto);
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
