import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT ?? 8080;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('HayTag')
    .setDescription('HayTag API documentation')
    .setVersion('1.0')
    .addTag('HayTag')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
bootstrap();
