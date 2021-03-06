import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder().setTitle('Product API').build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  await app.listen(5000);
}
bootstrap();
