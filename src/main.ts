import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { json, urlencoded } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const configService: ConfigService = app.get(ConfigService);

  app.setGlobalPrefix('api', { exclude: [{path: 'metrics', method: RequestMethod.GET}]});

  app.use(json({limit: '100mb'}))
  app.use(urlencoded({extended: true,limit: '100mb'}))


  const server: any = app.getHttpServer();
  server.keepAliveTimeout = 65_000;
  server.headersTimeout = 66_000;
  if ('requestTimeout' in server) server.requestTimeout = 70_000;

  await app.listen(configService.get('PORT', 3300), async () => Logger.log(`${await app.getUrl()}, API Doc: ${configService.get('APP_URL')}`))
}
bootstrap().then(() => Logger.log(`JobWhee successfully started in ${process.env.NODE_ENV || 'LocalDevelopment' || 'development' || 'production'} mode`));

