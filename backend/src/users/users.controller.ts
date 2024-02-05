import { Controller, Body, Post, Get, Put, 
    UseGuards, NotFoundException, Param, } from '@nestjs/common';

    import {UsersDto} from './dtos/user.dto'
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { CheckLoginDto } from './dtos/check-login.dto';
import { UsersService } from './users.service';

import { User } from 'src/decorators/user.decorator';

import { AuthGuard } from '@nestjs/passport';
import { IJwtPayload } from 'src/jwt-token/jwt-payload.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UsersController {
    constructor(private usersService : UsersService) {}
    /*
    @Put('is-login-okay-for-me')
    async isLoginOkayForMe(@User() user: IJwtPayload, data : CheckLoginDto){
        //console.log('dataaaaa', data);
        //console.log('dataaaaa', data.login);
        console.log(user.id);
        return true;
        return await this.usersService.isLoginOkayForMe(user.id, data.login);
    }
    */


    @Put('update-profile')
    async update(@User() user: IJwtPayload, @Body() data: UpdateProfileDto)
    {
        console.log('Updatelencek user degerler',data);
        return await this.usersService.updateProfile({where : {id : user.id}}, data);
    }

    

    @Get('/user/:id')
    async getUser(@Param('id') userId: number) {
        try {
        const user = await this.usersService.getOne({ id: userId });
        const matchs = await this.usersService.getMatchHistory(user.id, 100);
        return { ...user, matchs };
        } catch {
        throw new NotFoundException();
        }
    }

    @Get('match-history/:id/:limit')
    async getMatchHistory(
        @Param('id') id: number,
        @Param('limit') limit: number,
    ) {
        return await this.usersService.getMatchHistory(id, limit);
    }

    @Get('leaders')
    async getTotalWins() {
        return await this.usersService.getTotalWins();
    }
  
}
