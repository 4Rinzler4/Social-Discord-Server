import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { extname } from 'path';
@Injectable()
export class SupabaseService {
  private readonly subClient: ReturnType<typeof createClient>;

  constructor(private readonly configService: ConfigService) {
    this.subClient = createClient(
      this.configService.getOrThrow<string>('SUPABASE_URL'),
      this.configService.getOrThrow<string>('SUPABASE_KEY'),
    );
  }

  get storage() {
    return this.subClient.storage;
  }

  getClient() {
    return this.subClient;
  }

  getPublicUrl(bucket: string, path: string): string {
    return this.subClient.storage.from(bucket).getPublicUrl(path).data
      .publicUrl;
  }

  async upload(file: Express.Multer.File) {
    const extension = extname(file.originalname);
    const fileName = `${randomUUID()}${extension}`;
    const { error } = await this.subClient.storage
      .from('posts')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw error;
    }

    return this.getPublicUrl('posts', fileName);
  }

  async delete(imageUrl: string) {
    const fileName = imageUrl.split('/').pop();
    if (!fileName) {
      throw new Error('Invalid image URL');
    }

    const { error } = await this.subClient.storage
      .from('posts')
      .remove([fileName]);

    if (error) {
      throw error;
    }
  }
}
