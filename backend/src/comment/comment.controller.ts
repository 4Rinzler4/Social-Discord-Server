import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../types/auth-user.types';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createPost(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateCommentDto,
  ) {
    const userId = user.id;
    return this.commentService.createComment(dto, userId);
  }

  @Get('post/:postId')
  getCommentByPostId(@Param('postId') postId: string) {
    return this.commentService.getCommentsByPostId(postId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteComment(@Param('id') commentId: string, @CurrentUser() user: AuthUser) {
    const userId = user.id;
    return this.commentService.deleteComment(commentId, userId);
  }
}
