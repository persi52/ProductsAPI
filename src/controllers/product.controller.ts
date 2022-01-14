import { BadRequestException, Delete, HttpStatus, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
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
    
    //@UsePipes(new ValidationPipe({whitelist: true}))
    @ApiCreatedResponse({type : Product})
    @Post()
    createProduct( @Body() body : CreateProductDto) : Product{
        this.createValidator(body);
        return this.productService.createProduct(body);
    }

    //@UsePipes(new ValidationPipe({whitelist: true}))
    @Put()
    updateProduct(@Body() body : UpdateProductDto) : Product
    {
        this.updateValidator(body);
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

    updateValidator(body : UpdateProductDto){
       if(!body.id || !Number.isInteger(body.id) || body.id<=0) 
       throw new BadRequestException({
           status: 400,
           error : 'Bad request',
           payload : 'Wrong product Id'
       })

       if(typeof body.name != "string" || body.name.length>100)
        throw new BadRequestException({
            status: 400,
            error : 'Bad request',
            payload : 'Wrong product name'
        })

        if(typeof body.price != "number" || body.price<=0)
        throw new BadRequestException({
            status: 400,
            error : 'Bad request',
            payload : 'Wrong product price'
        })

    }

    createValidator(body : CreateProductDto){
        if(typeof body.name != "string" || body.name.length>100)
        throw new BadRequestException({
            status: 400,
            error : 'Bad request',
            payload : 'Wrong product name'
        })

        if(typeof body.price != "number" || body.price<=0)
        throw new BadRequestException({
            status: 400,
            error : 'Bad request',
            payload : 'Wrong product price'
        })

    }
}


