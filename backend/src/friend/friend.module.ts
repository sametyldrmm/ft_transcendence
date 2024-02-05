import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';
import {MatchModule} from 'src/match/match.module';
import {Intra42Module} from "../intra42/intra42.module";

@Module({
  imports: [TypeOrmModule.forFeature([Friend, User]), UsersModule, MatchModule, Intra42Module],
  controllers: [FriendController],
  providers: [FriendService, UsersService],
  exports: [FriendService],
})
export class FriendModule {}
