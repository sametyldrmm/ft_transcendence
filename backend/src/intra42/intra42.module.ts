import { Module } from '@nestjs/common';
import { Intra42Service } from './intra42.service';
import { HttpModule }  from '@nestjs/axios'


@Module({
  imports: [HttpModule],
  providers: [Intra42Service],
  exports: [Intra42Service]
})
export class Intra42Module {}
