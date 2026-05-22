import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Autocuración defensiva de variables de entorno con espacios en blanco al inicio o al final
for (const key of Object.keys(process.env)) {
  const trimmedKey = key.trim();
  if (trimmedKey !== key) {
    process.env[trimmedKey] = process.env[key];
  }
}

const server = express();
let isBootstrapped = false;
let appInstance: any = null;

const bootstrap = async () => {
  if (isBootstrapped) return appInstance;

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  app.enableCors(); // Permite que el frontend se comunique con el backend
  await app.init();
  
  isBootstrapped = true;
  appInstance = app;
  return app;
};

export default async (req: any, res: any) => {
  await bootstrap();
  server(req, res);
};
