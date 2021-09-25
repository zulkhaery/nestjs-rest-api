import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class productAddDTO {
	_id: string;

	@ApiProperty()
	@IsNotEmpty()
	sku: string;

	@ApiProperty()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	category: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	price: number; 

	@ApiProperty()
	@IsNotEmpty()
	description: string;

}