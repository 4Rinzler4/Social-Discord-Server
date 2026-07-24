import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

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
}
