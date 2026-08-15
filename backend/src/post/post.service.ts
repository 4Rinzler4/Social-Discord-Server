import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async createPost(userId: string, imageUrl: string, dto: CreatePostDto) {
    const { description } = dto;
    return this.prismaService.post.create({
      data: { imageUrl, description, ownerId: userId },
    });
  }

  async deletePost(userId: string, postId: string) {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      select: { ownerId: true, imageUrl: true },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.ownerId !== userId) {
      throw new ForbiddenException('You cannot delete this post');
    }
    await this.supabaseService.delete(post.imageUrl);

    return this.prismaService.post.delete({ where: { id: postId } });
  }

  async getAllPostsByUserId(userId: string) {
    return this.prismaService.post.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        owner: {
          select: {
            id: true,
            nickname: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async getPostById(id: string) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: {
        likes: true,

        comments: {
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
                avatarUrl: true,
              },
            },
          },
        },

        owner: {
          select: {
            id: true,
            nickname: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with id: ${id} not found!`);
    }

    return {
      ...post,
      owner: {
        ...post.owner,
        avatarUrl: this.supabaseService.getPublicUrl(
          'avatars',
          post.owner.avatarUrl,
        ),
      },
    };
  }
}
