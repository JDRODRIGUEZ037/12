import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Autocuración defensiva de variables de entorno con espacios en blanco al inicio o al final
for (const key of Object.keys(process.env)) {
  const trimmedKey = key.trim();
  if (trimmedKey !== key) {
    process.env[trimmedKey] = process.env[key];
  }
}

async function bootstrap() {
  console.log('--- DIAGNOSTIC START ---');
  console.log('Environment keys (trimmed/normalized):', Object.keys(process.env));
  console.log('META_APP_ID exists:', !!process.env.META_APP_ID, 'Value is:', process.env.META_APP_ID);
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL, 'Value length is:', process.env.DATABASE_URL?.length);
  console.log('--- DIAGNOSTIC END ---');

  const app = await NestFactory.create(AppModule);
  const clientUrls = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(url => url.trim()) : [];
  
  app.enableCors({
    origin: (origin, callback) => {
      // Si no hay origen (ej: curl, postman local) o si el origen está en la lista de permitidos
      if (!origin || clientUrls.includes(origin) || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Nest application is listening on port: ${port}`);
}
bootstrap();


