import { ChatGateway } from './chat.gateway';
import { Module } from '@nestjs/common';
import { ChannelModule } from 'src/channel/channel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from 'src/channel/entities/channel.entity';
import { ChannelUser } from 'src/friend/entities/channel-user.entity';
import { ChannelService } from 'src/channel/channel.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { MatchService } from 'src/match/match.service';
import { Match } from 'src/match/entities/match.entity';

@Module({
  imports: [
    UsersModule,
    ChannelModule,
    TypeOrmModule.forFeature([Channel, ChannelUser, User, Match]),
  ],
  providers: [
    ChatGateway,
    ChannelService,
    UsersService,
    MatchService,
  ],
})
export class ChatModule {}
