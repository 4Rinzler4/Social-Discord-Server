import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(userId: string, dto: CreatePostDto) {
    const { imageUrl, description } = dto;
    return this.prismaService.post.create({
      data: { imageUrl, description, ownerId: userId },
    });
  }

  async getAllPostsByUserId(userId: string) {
    return this.prismaService.post.findMany({ where: { ownerId: userId } });
  }

  async getPostById(id: string) {
    const post = await this.prismaService.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id: ${id} not found!`);
    }
    return post;
  }
}
