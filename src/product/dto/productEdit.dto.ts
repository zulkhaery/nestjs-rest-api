import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class productEditDTO {
	@ApiProperty()
	@IsOptional()
	@IsNotEmpty()
	sku: string;

	@ApiProperty()
	@IsOptional()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsOptional()
	@IsNotEmpty()
	category: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@IsOptional()
	price: number; 

	@ApiProperty()
	@IsNotEmpty()
	@IsOptional()
	description: string;
}