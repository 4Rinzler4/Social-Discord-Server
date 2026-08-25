import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  createComment(dto: CreateCommentDto, userId: string) {
    const { text, postId } = dto;
    return this.prismaService.comment.create({
      data: {
        text,
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    });
  }

  async getCommentsByPostId(postId: string) {
    const comments = await this.prismaService.comment.findMany({
      where: { postId: postId },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            avatarUrl: true,
          },
        },
      },
    });

    return comments;
  }

  async deleteComment(userId: string, commentId: string) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('You cannot delete this comment');
    }

    return this.prismaService.comment.delete({ where: { id: commentId } });
  }
}
