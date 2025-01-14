import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/shared/infrastructure/config/config.type';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AllConfigType>);

  app.enableCors({
    origin: configService.getOrThrow('app.frontendDomain', { infer: true }),
    credentials: true,
  });

  app
    .enableShutdownHooks()
    .useGlobalPipes(new ValidationPipe())
    .enableVersioning({
      type: VersioningType.URI,
    })
    .setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }), {
      exclude: ['/'],
    });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}

void bootstrap();
