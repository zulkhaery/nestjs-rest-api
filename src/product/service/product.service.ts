import { Injectable } from '@nestjs/common';
import { productAddDTO } from '../dto/productAdd.dto';
import { productEditDTO } from '../dto/productEdit.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from '../schema/product.schema';

@Injectable()
export class ProductService {

	constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

	async getAllProduct(): Promise<Product[]> {
		return await this.productModel.find();
	}

	async getProduct(id: string): Promise<Product | false> {
		try {
			return await this.productModel.findById(id);
		}
		catch {
			return false;
		}
	}

	async addProduct(productAddDTO: productAddDTO): Promise<Product> {
		const product = productAddDTO;
		return await this.productModel.create(product);
	}

	async editProduct(id: string, productEditDTO: productEditDTO): Promise<Product | boolean>  {
		try {
			return await this.productModel.findOneAndUpdate({ _id: id }, productEditDTO, { new: true , useFindAndModify: false})
		}
		catch {
			return false;
		}
		
	}

	async deleteProduct(id: string): Promise<Product | boolean>{
		try {
			return await this.productModel.findByIdAndDelete(id);
		}
		catch {
			return false;
		}
		 
	}
}
