import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Response } from './Interceptor/response';
import { AppModule } from './app.module';

const port = 4000;
const title = 'Template';
const description = 'App';
const apidoc = '/api-docs';
const apiPrefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new Response());

  const options = new DocumentBuilder().setTitle(title).setDescription(description).build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(apidoc, app, document);

  await app.listen(port, () => {
    Logger.log(`The api docs is running http://127.0.0.1:${port}/api-docs`);
  });
}

bootstrap();
