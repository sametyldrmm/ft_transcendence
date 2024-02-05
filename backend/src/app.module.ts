import { Module } from '@nestjs/common';



import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Intra42Module } from './intra42/intra42.module';


import { DbModule } from './db/db.module';
import { JwtTokenModule } from './jwt-token/jwt-token.module';
import { TwoFactorModule } from './two-factor/two-factor.module';
import { GameModule } from './game/game.module';
import { MyCacheModule } from './my-cache/my-cache.module';
import { ChatModule } from './chat/chat.module';
import { FriendModule } from './friend/friend.module';
import { ChannelModule } from './channel/channel.module';
import { MatchModule } from './match/match.module';


@Module({
  imports: [
    AuthModule, UsersModule, Intra42Module,
    DbModule,
    JwtTokenModule, TwoFactorModule,
    MyCacheModule, DbModule,
    GameModule, ChatModule, FriendModule, ChannelModule, MatchModule],
})
export class AppModule { }
