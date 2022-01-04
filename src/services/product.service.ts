import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import * as path from 'path';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { UpdateProductDto } from 'src/dto/updateProduct.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
    private relativePath = 'src/database/productDb.json'
    
    private products = JSON.parse(fs.readFileSync(
        path.resolve(process.cwd(),this.relativePath),'utf8'));  

    getProducts() : Product[]{
        return this.products;        
    }

    getProductDetailsById(productId : number) : Product{  
        return this.products.find(product => {             
            return product.id === productId;
        })
    }

    createProduct(createProductDto : CreateProductDto) : Product{
        let newProduct : Product;

        if(this.products.length) 
        {
            const ids = this.products.map(product => {
                return product.id;
            });
            
            const newProductId = Math.max(...ids) + 1;

            newProduct = {   
                id : newProductId,         
                ...createProductDto,
                updateDate : null
            }

        }else {
            newProduct = {   
                id : 1,         
                ...createProductDto,
                updateDate : null
            }
        }

        this.products.push(newProduct);
        
        fs.writeFileSync(path.resolve(process.cwd(),this.relativePath),
        JSON.stringify(this.products,null,4))

        return newProduct;
    }

    updateProduct(body: UpdateProductDto, productId: number) : Product{
        let updatedProduct : Product;
        const date = new Date().toString();

        const updatedProductList = this.products.map(product => {
            console.log(product.id)
            if(product.id === productId)
            {
                updatedProduct = {
                id: productId,                
                ...body,
                updateDate: date
                } 
            return updatedProduct;
            }
            else return product;
        });
        
        this.products = updatedProduct;

        fs.writeFileSync(path.resolve(process.cwd(),this.relativePath),
        JSON.stringify(updatedProductList,null,4))

        return updatedProduct;
    }

    deleteProduct(productId : number){
       
        const index = this.products.findIndex(product => {             
            return product.id === productId;
        })
        
        this.products.splice(index,1);

        fs.writeFileSync(path.resolve(process.cwd(),this.relativePath),
        JSON.stringify(this.products,null,4))
        
        return 'Product deleted succesfully';
    }
}
