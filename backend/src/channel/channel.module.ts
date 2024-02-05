import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { ChannelUser } from 'src/friend/entities/channel-user.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import {MatchModule} from "src/match/match.module";

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Channel, ChannelUser, User]), MatchModule],
  controllers: [ChannelController],
  providers: [ChannelService, UsersService],
  exports: [ChannelService]
})
export class ChannelModule {}
