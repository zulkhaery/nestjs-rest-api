import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";



@Schema({collection:"product", versionKey: false})
export class Product {
	@Prop()
	id: string

	@Prop()
	sku: string

	@Prop()
	name: string

	@Prop()
	category: string

	@Prop()
	price: number

	@Prop()
	description: string
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductDocument = Product & Document;