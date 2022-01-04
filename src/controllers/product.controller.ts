import { Delete, HttpStatus, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Get, Module, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { UpdateProductDto } from 'src/dto/updateProduct.dto';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@ApiTags('Products')
@Controller('products')
export class ProductController{
    
    constructor(private readonly productService : ProductService){}

    @Get()
    getAllProducts(){    
        return this.productService.getProducts()
    }
    
    @Get("/:productId")
    getProductDetailsById(
        @Param("productId") productId : number
    ){  
        this.checkIfProductExists(productId);       
        return this.productService.getProductDetailsById(Number(productId));
     }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @ApiCreatedResponse({type : Product})
    @Post()
    createProduct( @Body() body : CreateProductDto) : Product{
        return this.productService.createProduct(body);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put()
    updateProduct(@Body() body : UpdateProductDto) : Product
    {
        this.checkIfProductExists(body.id)
        return this.productService.updateProduct(body);
    }

    @Delete("/:productId")
    deleteProduct( @Param("productId") productId : number){

        this.checkIfProductExists(productId)
        return this.productService.deleteProduct(Number(productId));
    }

    checkIfProductExists(productId : number){
        const product = this.productService.getProductDetailsById(Number(productId))
        
        if(!product)
        throw new NotFoundException({
            status : 404,
            message: "No product found"
        });      
    }
}


