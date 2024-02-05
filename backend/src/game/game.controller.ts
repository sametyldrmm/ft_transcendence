import { Controller, Get, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';

import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/decorators/user.decorator';
import { IJwtPayload } from 'src/jwt-token/jwt-payload.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get("create-match")
  async create() {
      return await this.gameService.createKey();
  }

}
