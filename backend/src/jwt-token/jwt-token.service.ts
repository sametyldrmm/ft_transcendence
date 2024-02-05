import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt-payload.interface';


import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtTokenService {
    constructor(private readonly jwtService: JwtService) {}

    createJwt(jwtData: IJwtPayload) {
     // console.log('jwt Data', jwtData);
      const sign = this.jwtService.sign(jwtData);
     // console.log('sign', sign);

      return sign;
    }
  
    verifyJwt(token: string) {
      return this.jwtService.verify<IJwtPayload>(token);
    }
}


