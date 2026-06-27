import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe -> otomatis validasi DTO & lempar 400 Bad Request
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // hapus field yang tidak ada di DTO
      transform: true, // ubah payload jadi instance DTO (tipe data otomatis sesuai)
      forbidNonWhitelisted: false,
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => {
          const constraints = err.constraints
            ? Object.values(err.constraints)
            : ['Validasi gagal'];
          return constraints.join(', ');
        });
        return new BadRequestException(messages);
      },
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Server berjalan di: http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
