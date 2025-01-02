import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  SwaggerModule.setup('api', app, document);

  // Cấu hình CORS
  await app.enableCors({
    origin: '*', // Cho phép mọi nguồn
    methods: '*', // Cho phép mọi phương thức (GET, POST, PUT, DELETE, v.v.)
    allowedHeaders: '*', // Cho phép mọi header
  });

  await app.listen(process.env.BE_PORT ?? 8003);
}
bootstrap();
