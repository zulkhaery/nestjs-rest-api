
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { productAddDTO } from './dto/productAdd.dto';
import { productEditDTO } from './dto/productEdit.dto';
import { Product } from './schema/product.schema';
import { ProductService } from './service/product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService) {}

	@Get()
	async getAllProduct(): Promise<Product[]> {
		return await this.productService.getAllProduct();
	}

	@Get('/:id')
	async getProduct(@Param('id') id: string): Promise<Product | {}> {

		const product = await this.productService.getProduct(id);

		if(Object.keys(product).length === 0) {
			throw new NotFoundException('Document not found')
		}
			
		return product;
	}

	@Post()
	@UsePipes(ValidationPipe)
	async addProduct(@Body() productAdd: productAddDTO): Promise<Product> {
		return await this.productService.addProduct(productAdd);
	}

	@Put('/:id')
	@UsePipes(ValidationPipe)
	async editProduct(@Param('id') id: string, @Body() productEdit: productEditDTO): Promise<Product | boolean> {
		const editProduct = await this.productService.editProduct(id, productEdit);
		if(!editProduct) {
			throw new NotFoundException('Product not found')
		}

		return editProduct;
	}

	@Delete('/:id')
	async deleteProduct(@Param('id') id: string) {

		const isDeleted =  await this.productService.deleteProduct(id);
		
		if(!isDeleted) {
			 throw new NotFoundException('Product not found')
		}

		return {	
			"statusCode": 200,
			"message": "Product was deleted",
			"error": ""
		  }
	}

}
