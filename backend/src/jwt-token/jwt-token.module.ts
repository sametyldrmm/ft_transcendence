import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { JwtModule } from '@nestjs/jwt'

import { JwtTokenService } from './jwt-token.service';
import { IJwtPayload } from './jwt-payload.interface';
import { jwtConstants } from './constants'

import * as dotenv from 'dotenv';
dotenv.config();

function getSecret() {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
	  throw new Error("JWT_SECRET çevre değişkeni bulunamadı.");
	}
	return secret;
  }

@Module({
  imports: [JwtModule.register({
		global: true,
		secretOrPrivateKey: getSecret(),
		secret: getSecret(),
		signOptions: { expiresIn: '1h' },
	  }),
	],
  providers: [JwtTokenService],
  exports: [JwtTokenService],

})
export class JwtTokenModule {}
