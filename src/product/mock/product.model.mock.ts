import { ProductList } from './product.data.mock';

export class MockProductModel {

    static create = jest.fn().mockImplementation((dto) => {
        return dto;
    });
    
    static find = jest.fn().mockResolvedValue(ProductList);
    
    static findById = jest.fn().mockImplementation((id) => {    
        let product =  ProductList.find(product => product._id === id);
        if(!product) {
            throw new Error('Test Error');
        }

        return product;
    });

    static findOneAndUpdate = jest.fn().mockImplementation((id, productEditDTO, {}) => {
        const {name, sku, category, price, description} = productEditDTO;
		let product = ProductList.find(product => product._id === id._id);
        
        product.sku  = sku;
		product.name = name;
        product.category = category;
        product.price = price;
        product.description = description;

		return product; 
    });
    
    static findByIdAndDelete = jest.fn().mockImplementation((id) => {
        let product = ProductList.filter(product => product._id != id);
        let isDeleted = (product.length != ProductList.length);

        if(!isDeleted) {
            throw new Error('Test Error');
        }
        
        return true;
    });
        
  }