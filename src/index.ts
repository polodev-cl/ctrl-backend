import { configure as serverlessExpress } from "@vendia/serverless-express";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as express from "express";

let cachedServer;

const bootstrap = async () => {
  const app = express();

  const nestApp = await NestFactory.create(AppModule, {
    logger: process.env.ENV === "prod" ? ["warn", "error"] : ["debug", "log", "verbose"],
  });

  nestApp.setGlobalPrefix("api");
  nestApp.enableCors();
  nestApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true,
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
