import { BadRequestException } from '@nestjs/common';
import { request } from 'http';
import { ProductController } from 'src/controllers/product.controller';
import { ProductService } from '../services/product.service';

describe("Basic product validation testing", () => {
    let productController: ProductController;
    const productService : ProductService = new ProductService()

    beforeEach(() => {
        productController = new ProductController(productService);
    });


    it("returns Bad request if id is negative",async done => {       
      

          const data = await productController.updateProduct({
            id: -5,
            name : "eggs",
            price : 55.5
          })
       
        expect(data).toThrow(BadRequestException);
        done();      
    });

    it("returns Bad request if price is negative",async done => {       
      

        const data = await productController.updateProduct({
          id: 5,
          name : "eggs",
          price : -5
        })
     
      expect(data).toThrow(BadRequestException);
      done();      
  });

  it("returns Bad request if price is negative",async done => {       
      

    const data = await productController.updateProduct({
      id: 5,
      name : "eggs",
      price : -5
    })
 
    expect(data).toThrow(BadRequestException);
    done();      
    
  });

  
  
    
});

