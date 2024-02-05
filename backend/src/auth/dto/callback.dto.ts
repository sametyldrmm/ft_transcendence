import { IsNotEmpty,IsString } from "class-validator";


export class CallBackDto {
    @IsString()
    @IsNotEmpty()
    code: string;
}