import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true, 
    preflightContinue: false,
    optionsSuccessStatus: 204
})
  await app.listen(7000);
}
bootstrap();