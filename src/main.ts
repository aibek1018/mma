import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Удаляет лишние поля
    forbidNonWhitelisted: true, // Ошибка при наличии лишних полей
    transform: true, // Приводит данные к нужным типам
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
