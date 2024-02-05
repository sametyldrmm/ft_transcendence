import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Intra42Module }  from '../intra42/intra42.module';

import { JwtTokenModule } from 'src/jwt-token/jwt-token.module'
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module'
import { TwoFactorModule } from 'src/two-factor/two-factor.module';
import { ChannelModule } from 'src/channel/channel.module';
import { MatchModule } from 'src/match/match.module';
import { FriendModule } from 'src/friend/friend.module';

@Module({
  imports : 
    [Intra42Module,
    TwoFactorModule,
    JwtTokenModule,
    UsersModule,
    //
    ChannelModule,
    MatchModule,
    FriendModule
  ],
  providers: [AuthService, JwtStrategy, TwoFactorModule], //denemelik 2fa eklendi
  controllers: [AuthController]
})
export class AuthModule {}

