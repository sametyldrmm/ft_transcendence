import { assignMetadata } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';
dotenv.config();



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors( {
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
    credentials : true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen((parseInt(process.env.PORT, 10) || 4000));
}

bootstrap();
