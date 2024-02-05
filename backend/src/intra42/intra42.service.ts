import { Injectable,  HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';



import { HttpService } from '@nestjs/axios';
import { catchError,map, firstValueFrom, lastValueFrom } from 'rxjs';


import * as dotenv from 'dotenv';
dotenv.config();

export interface IIntraToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    created_at: number;
  }

  function getClientID() {
    const secret = process.env.CLIENT_ID;
    if (!secret) {
      throw new Error("CLIENT_ID çevre değişkeni bulunamadı.");
    }
    return secret;
  }

  function getClientSecret() {
    const secret = process.env.CLIENT_SECRET;
    if (!secret) {
      throw new Error("CLIENT_SECRET çevre değişkeni bulunamadı.");
    }
    return secret;
  }

  function getRedirectUrl() {
    const secret = process.env.REDIRECT_URL;
    if (!secret) {
      throw new Error("REDIRECT_URL çevre değişkeni bulunamadı.");
    }
    return secret;
  }

  function getApiUrl() {
    const secret = process.env.API_URL;
    if (!secret) {
      throw new Error("API_URL çevre değişkeni bulunamadı.");
    }
    return secret;
  }

  function getTokenUrl() {
    const secret = process.env.TOKEN_URL;
    if (!secret) {
      throw new Error("API_URL çevre değişkeni bulunamadı.");
    }
    return secret;
  }


@Injectable()
export class Intra42Service {
	constructor(private readonly httpService : HttpService) {}

  private async createAccessToken(code: string) {
    const tokenUrl = getTokenUrl();
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'identity',
    };

    const body = {
      grant_type: 'authorization_code',
      client_id: getClientID(),
      client_secret: getClientSecret(),
      redirect_uri: getRedirectUrl(),
      code,
    };

    try {

      const tokenResponse = await this.httpService.post
      ( tokenUrl, body,{ headers } );
      
      const tokenData = (await lastValueFrom(tokenResponse)).data;
      
      const token: IIntraToken = tokenData;
      
      return token.access_token;

    
    } catch (error : any) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Callback token is invalid.',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
      
    }
    
  }


  private parseUserFromIntraData(data : any)
  {
    return  {
      intra_id : data.id,
      login: data.login,
      full_name: data.usual_full_name,
      email: data.email,
    };
  }


  async getMe(code: string) {

    const intraToken = await this.createAccessToken(code);
    
    const apiUrl = getApiUrl();
    
    try {

      const response = await this.httpService
      .get(`${apiUrl}/me`, {
        headers: {
          Authorization: `Bearer ${intraToken}`,
        },
      });
      
      const intraUserData = (await firstValueFrom(response)).data;
      
      return this.parseUserFromIntraData(intraUserData);
      
    } catch (error : any) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Callback token is invalid.',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
      
    }
    
  }
}
