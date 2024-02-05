import { Injectable, UnauthorizedException } from '@nestjs/common';

import { authenticator } from 'otplib';
import  * as qrcode  from 'qrcode';

import { InjectRepository } from '@nestjs/typeorm';
import {
    Repository,
} from 'typeorm';
import { GoogleAuthenticator } from './google-authenticator.entity'

import { IJwtPayload} from 'src/jwt-token/jwt-payload.interface'


import * as dotenv from 'dotenv';
dotenv.config();

function getTwoFaName() {
    const secret = process.env.TWOFA_NAME;
    if (!secret) {
      throw new Error("JWT_SECRET çevre değişkeni bulunamadı.");
    }
    return secret;
  }

@Injectable()
export class TwoFactorService {
    constructor(@InjectRepository(GoogleAuthenticator)
    private repo: Repository<GoogleAuthenticator>) {}

    async verify(user2 : IJwtPayload, token: string) : Promise<boolean>{

        const twoFaData = await this.repo.findOne(
            {where: { user: {id: user2.id} } } );

        if (!twoFaData)
            throw new UnauthorizedException();
        
        const isVerified : boolean = authenticator.verify({
            token : token,
            secret : twoFaData.secret
        });

        return isVerified;
    }

    async generateOtpQrCode(user3: IJwtPayload) {

        let twoFaData = await this.repo.findOne(
            {where: { user: {id: user3.id} } } );
                
        if (!twoFaData)
        {
            const newSecret = await authenticator.generateSecret();

            const otpauth = authenticator.keyuri("", getTwoFaName(), newSecret);

            twoFaData = await this.create(newSecret, user3.id)
            return await qrcode.toDataURL(otpauth);
        }

        const otpauth = authenticator.keyuri('', getTwoFaName(), twoFaData.secret);
        return await qrcode.toDataURL(otpauth);
    }


    //DataBase operations
    private async create(secret : string, userId: number) {
        const newData = this.repo.create({secret, user: { id: userId }});
        return (await this.repo.save(newData))[0];
    }

    async clear() {
        await this.repo.clear();
    }

    async getAll(): Promise<GoogleAuthenticator[]>  {
        return await this.repo.find();
    }
}
