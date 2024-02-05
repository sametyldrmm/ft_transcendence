import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';


import * as dotenv from 'dotenv';
dotenv.config();

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET çevre değişkeni bulunamadı.");
  }
  return secret;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: getSecret(),
      secretOrPrivateKey: getSecret(),
    });
  }

  async validate(payload: { id: number }) {
    if (!payload.id) throw new UnauthorizedException(); //buraya id'i kontorl ettir. adamın nicki ile id'sini çaprazla
    return payload;
  }
}
