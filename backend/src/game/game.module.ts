import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { UsersModule } from 'src/users/users.module';
import { MyCacheModule } from 'src/my-cache/my-cache.module';
import { GameController } from './game.controller';
import {MatchModule} from "../match/match.module";
import {MatchService} from "../match/match.service";
import {UsersService} from "../users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {Match} from "../match/entities/match.entity";
import {Intra42Service} from "../intra42/intra42.service";

@Module({
  controllers: [GameController],
  imports: [MyCacheModule, UsersModule,MatchModule, TypeOrmModule.forFeature([User, Match])],
  providers: [GameGateway, GameService, UsersService],
  exports: [GameService],
})
export class GameModule {}
