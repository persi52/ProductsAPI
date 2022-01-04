import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, Min } from "class-validator";

export class UpdateProductDto{
    @ApiProperty() @IsNotEmpty()
    id : number;

    @ApiProperty() @Length(1,100)    
    name : string;

    @ApiProperty() @Min(0)    
    price : number;    
}