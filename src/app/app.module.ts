import { Module } from '@nestjs/common';
import {ProductController} from "../controllers/product.controller"
import { ProductService } from 'src/services/product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
