
import * as dotenv from 'dotenv';
dotenv.config();

function getSecret() {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
	  throw new Error("JWT_SECRET çevre değişkeni bulunamadı.");
	}
	return secret;
  }
  

export let jwtConstants = {
	secret: getSecret(),
};