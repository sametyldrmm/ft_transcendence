import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CallBackDto } from './dto/callback.dto';

import { UsersService } from 'src/users/users.service'

import { Intra42Service }  from '../intra42/intra42.service';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service'
import { TwoFactorService } from 'src/two-factor/two-factor.service'


@Injectable()
export class AuthService {
    constructor(
		private intra42Service: Intra42Service,
		private jwtTokenService: JwtTokenService,
		private usersService: UsersService,
		private twoFactorService: TwoFactorService
	) {}

    async callback(body : CallBackDto){
		const userIntra = await this.intra42Service.getMe(body.code);
		// return(userIntra);
		const intra_id = userIntra.intra_id;

		const isUserExist : boolean = await this.usersService.isExist( { intra_id } );

		if (!isUserExist) //Ilk kayit, db'ye veriler eklendi
			await this.usersService.create(userIntra);

		
		let user : any = await this.usersService.getOne({intra_id});
		const token = this.jwtTokenService.createJwt({ id : user.id });

		if (!isUserExist)
			user = {...user , is_first_login : true};
		
			
		if (user.twoFA)
			return { user: {id: user.id} };
			
			console.log(user, token);
		return {user, token};
    }

	async verifyTwoFa(code: string, userId: number){
		const isVerified : boolean = await this.twoFactorService.verify( { id :userId }, code);

		if (!isVerified)
		 	throw new UnauthorizedException();

		const user = await this.usersService.getOne( { id: userId } );
		const token = this.jwtTokenService.createJwt( {id : userId } );
		
		return {user, token};
	}

	async myAccount(id: number) {
		return this.usersService.getOne({id});
	 }

	async clearUsersTable() {
        await this.usersService.clear();
    }
}
