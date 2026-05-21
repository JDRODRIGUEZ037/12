import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('--- DIAGNOSTIC START ---');
  console.log('Environment keys:', Object.keys(process.env));
  console.log('META_APP_ID exists:', !!process.env.META_APP_ID, 'Value is:', process.env.META_APP_ID);
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL, 'Value length is:', process.env.DATABASE_URL?.length);
  console.log('--- DIAGNOSTIC END ---');

  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Permite que el frontend se comunique con el backend
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

