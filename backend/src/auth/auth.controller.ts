import { Body, Controller, Get, Post, UseGuards, ParseIntPipe, Put} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CallBackDto } from './dto/callback.dto';
import { TwoFactorService } from 'src/two-factor/two-factor.service'

import { IJwtPayload } from 'src/jwt-token/jwt-payload.interface';
import { User } from 'src/decorators/user.decorator'


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private twoFactorService : TwoFactorService,
        
        ) {}

    
    @Post('callback')
    async callback(@Body() body: CallBackDto) {
        return this.authService.callback(body); 
    }

    @Get('my-account')
    @UseGuards(AuthGuard('jwt'))
    async myAccount(@User() user: IJwtPayload) {
      return await this.authService.myAccount(user.id);
    }
    
    @Post('2fa/verify')
    async verify2FA(
      @Body('code') code: string,
      @Body('userId', ParseIntPipe) userId: number,) {
      return await this.authService.verifyTwoFa(code, userId);
    }

    @Get('2fa')
    @UseGuards(AuthGuard('jwt'))
    async getTwoFaQrCode(@User() user :IJwtPayload) {
        return await this.twoFactorService.generateOtpQrCode(user);
    }

}
