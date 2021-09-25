import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Schema as MongooseSchema } from 'mongoose';
import { ObjectID } from 'bson'

jest.setTimeout(360000)


let _id = new ObjectID().toString();


describe('AppController (e2e)', () => {
  let app: INestApplication;
  

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Get all Product', () => {
    it('should get all products', async () => {
      const response = await request(app.getHttpServer()).get('/product');
      expect(response.status).toBe(200);
      expect(response.body[0].sku).toBe('SKU-001');
      expect(response.body[1].sku).toBe('SKU-002');
      expect(response.body[2].sku).toBe('SKU-003');
    });
  })
 

  describe('Get a Product', () => {
    it('should get an existing product', async () => {
      let response = await request(app.getHttpServer()).get('/product/614c45a365d1ae19cc27fe01');
      expect(response.body.sku).toBe('SKU-002');
    });

    it('try get non existing product, should thrown 404', async () => {
      const response = await request(app.getHttpServer()).get('/product/FALSE-PRODUCT-ID');
      expect(response.status).toBe(404);
    });
  });

  describe('Add Product', () => {
    it('should add new data and return new data', async () => {
      const testData =  {
        "_id": _id,
        "sku": "SKU-E01",
        "name": "E2E Testing add product",
        "category": "F&B",
        "price": 19500,
        "description": "E2E Testing Aqua galon lorem ipsum dolor sit amet consectetuer adi psincing elit"
      }

      const response = await request(app.getHttpServer()).post('/product').send(testData)
      expect(response.body.sku).toBe(testData.sku);
    });

    it('try add product without some required value, should thrown an error', async () => {
      const testBadData =  {
        "sku": "E2E-TEST-01",
        "category": "F&B",
        "price": 19500,
      }

      const response = await request(app.getHttpServer()).post('/product').send(testBadData)
      expect(response.body.error).toBe('Bad Request');
    });
  })

  describe('Edit Product', () => {
    it('try edit all value in a product, should be success', async () => {
      const testData =  {
        "sku": "SKU-010",
        "name": "Aqua Galon Limited Edition",
        "category": "F&B",
        "price": 25000,
        "description": "Aqua galon lorem ipsum dolor sit amet consectetuer adi psincing elit"

      }

      const response = await request(app.getHttpServer()).put('/product/' + _id).send(testData)
      expect(response.body.sku).toBe(testData.sku);
      expect(response.body.name).toBe(testData.name);
      expect(response.body.category).toBe(testData.category);
      expect(response.body.price).toBe(testData.price);
      expect(response.body.description).toBe(testData.description);
    });

    it('try edit non existing product, should thrown 404', async () => {
      const testData =  {
        "sku": "SKU-010e"
      }

      const response = await request(app.getHttpServer()).put('/product/fake-id').send(testData)
      expect(response.body.statusCode).toBe(404);
    });

    it('try edit one value in a product, should be success', async () => {
      const testData =  {
        "sku": "SKU-010e"
      }

      const response = await request(app.getHttpServer()).put('/product/' + _id).send(testData)
      expect(response.body.sku).toBe(testData.sku);
    });

    it('try edit type of price from number to string, should thrown an error', async () => {
      const testBadData =  {
        "price": "25000"
      }

      const response =  await request(app.getHttpServer()).put('/product/' + _id).send(testBadData)
      expect(response.body.message[0]).toBe('price must be a number conforming to the specified constraints');
    });

    it('try edit required value with no value, should thrown an error', async () => {
      const testBadData =  {
        "id": "TESTING123",
        "name": ""
      }

      const response =  await request(app.getHttpServer()).put('/product/' + _id).send(testBadData)
      expect(response.body.message[0]).toBe('name should not be empty');
    });
  });

  describe('Delete Product', () => {
    it('should delete a product', async () => {
      const response =  await request(app.getHttpServer()).delete('/product/' + _id)
      expect(response.body.message).toBe('Product was deleted');
    })

    it('try delete non existing product _id, should thrown  an error', async () => {
      const response =  await request(app.getHttpServer()).delete('/product/fake-id')
      expect(response.body.message).toBe('Product not found');
    })

  });
  
  afterEach(() =>{
    app.close();
  })
});
