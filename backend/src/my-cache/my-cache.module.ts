import { Module } from '@nestjs/common';
import { MyCacheService } from './my-cache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [MyCacheService],
  exports: [MyCacheService]
})
export class MyCacheModule {}
