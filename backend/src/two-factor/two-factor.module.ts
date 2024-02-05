import { Module } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthenticator } from './google-authenticator.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoogleAuthenticator,
    ])
  ],
  providers: [TwoFactorService],
  exports: [TwoFactorService]
})
export class TwoFactorModule {}
