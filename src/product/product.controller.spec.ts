import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './service/product.service';
import { MockProductModel }  from './mock/product.model.mock'
import { ProductList, newProduct, SingleProduct, badProduct } from './mock/product.data.mock';
import { getModelToken } from '@nestjs/mongoose';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ 
        ProductService, 
        {
          provide: getModelToken('Product'),
          useValue: MockProductModel,
        },
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all product', async () => {
    expect(await controller.getAllProduct()).toBe(ProductList)
  }) 

  it('should get a product', async () => {
    expect(await controller.getProduct('2')).toStrictEqual(SingleProduct)
  }) 

  it('should return 404 when request non exisiting product',  () => {
    let req = controller.getProduct('FAKE-ID')
    expect(req).rejects.toThrowError('Document not found')
  });

  it('should return error to create new product', async () => {
    expect(await controller.addProduct(badProduct)).toMatchObject(badProduct);
  })

  it('should edit product', async () => { 
    const update =  {
                    "sku": "SKU-001",
                    "name": "Testing Update Product 2",
                    "category": "fashion",
                    "price": 3000,
                    "description": "Testing isi product" 
                  };
    
    const updated = {
                    "_id": "1",
                    "sku": "SKU-001",
                    "name": "Testing Update Product 2",
                    "category": "fashion",
                    "price": 3000,
                    "description": "Testing isi product" 
                  };
      
    let req = await controller.editProduct("1", update);

    expect(req).toStrictEqual(updated);
  });

  it('should be failed update product', () => {
    const update =  {
      "sku": "SKU-001",
      "name": "Testing Update Product 2",
      "category": "fashion",
      "price": 3000,
      "description": "Testing isi product" 
    };

    let req =  controller.editProduct("10", update);
    expect(req).rejects.toThrowError('Product not found');
  });

  it('should delete product and return 200', async () => {
      let req = await controller.deleteProduct("1");
      expect(req.statusCode).toBe(200);
  });

  it('should delete product and return 404', () => {
      let req =  controller.deleteProduct("FAKE-ID");
      expect(req).rejects.toThrowError('Product not found');
  });
});
