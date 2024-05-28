import { ValidationPipe } from '@nestjs/common';
import { NestFactory }    from '@nestjs/core';

import { configure as serverlessExpress } from '@vendia/serverless-express';

import { AppModule } from './app.module';

let cachedServer;

const bootstrap = async () => {
  const nestApp = await NestFactory.create(AppModule, {
    logger: process.env.ENV === 'prod' ? [ 'warn', 'error', 'log' ] : [ 'debug', 'log', 'verbose' ],
  });

  nestApp.setGlobalPrefix('api');
  nestApp.enableCors({
    methods: [ 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS' ],
  });
  nestApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // forbidNonWhitelisted: true
    })
  );

  await nestApp.init();

  return nestApp.getHttpAdapter().getInstance();
};

export const handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = serverlessExpress({
      app: await bootstrap(),
    });
  }

  return cachedServer(event, context);
};

// import { NestFactory }    from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService }  from '@nestjs/config';
//
// import { AppModule }           from './app.module';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';
//
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const configService = app.get(ConfigService);
//   app.setGlobalPrefix('api');
//   app.enableCors();
//   app.useGlobalFilters(new HttpExceptionFilter());
//   // app.useGlobalInterceptors(new HttpResponseInterceptor());
//
//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true,
//       whitelist: true,
//       // forbidNonWhitelisted: true
//     })
//   );
//
//   await app.listen(configService.get('port') || 3000);
// }
//
// bootstrap().then();
