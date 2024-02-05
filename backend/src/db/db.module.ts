import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host:  process.env.DATABASE_HOST,
        port:  parseInt(process.env.DATABASE_PORT, 10) || 5432,
       	username : process.env.POSTGRES_USER,	
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
	logging: true,
      }),
  ],
})
export class DbModule {}
