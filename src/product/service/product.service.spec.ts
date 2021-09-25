import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { MockProductModel }  from '../mock/product.model.mock'
import { ProductList, SingleProduct, newProduct, badProduct } from '../mock/product.data.mock';

describe('Product Service Test', () => {
    let service: ProductService;

    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ 
        ProductService, 
        {
          provide: getModelToken('Product'),
          useValue: MockProductModel,
        },
      ],
    }).compile();
  
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
      expect(service).toBeDefined();
  });
  
  it('should get all product', async () => {
      expect(await service.getAllProduct()).toEqual(ProductList);
  });

  it('should return single product with id 2', async () => {
      expect(await service.getProduct('2')).toStrictEqual(SingleProduct);
  });

  it('should thrown an error', async  () =>  {
    let req =  await service.getProduct('FALSE-ID');

      expect(req).toBe(false);
  });


  it('should create Product', async () => {
      expect(await service.addProduct(newProduct)).toMatchObject(newProduct);
  })

  it('should edit product', async () => {
      expect(await service.editProduct('1',
        {
          "sku": "SKU-001",
          "name": "Testing Update Product 2",
          "category": "fashion",
          "price": 3000,
          "description": "Testing isi product",
        }
      )).toMatchObject(
        {
          "_id": "1",
          "sku": "SKU-001",
          "name": "Testing Update Product 2",
          "category": "fashion",
          "price": 3000,
          "description": "Testing isi product",
        }
      )
  });

  it('should deleted product', async () => {
      expect(await service.deleteProduct("1")).toBe(true);
  });

  it('delete non exisiting product will return false', async () => {
    expect(await service.deleteProduct("NON-EXISTS-ID")).toBe(false);
  });
 

});

