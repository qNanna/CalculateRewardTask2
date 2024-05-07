import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { LoggingInterceptor } from './enhancers/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT') ?? 3000;
  const STAGE = configService.get<string>('NODE_ENV') ?? 'DEV';

  app.enableCors();
  app.setGlobalPrefix(`${STAGE}/api`);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(PORT, () => {
    console.info('\x1b[36m%s\x1b[0m', `Application started at port: ${PORT}`);
  });
}
bootstrap();
