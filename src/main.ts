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
  SwaggerModule.setup(apidoc, app, document, {
    customSiteTitle: title,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: ['https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css'],
  });

  await app.listen(port, () => {
    Logger.log(`The api docs is running http://127.0.0.1:${port}/api-docs`);
  });
}

bootstrap();
