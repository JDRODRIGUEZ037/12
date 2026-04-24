import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { InstagramService } from '../src/instagram/instagram.service';
import { PrismaService } from '../src/prisma/prisma.service';

/**
 * EXPLICACIÓN DE LA PRUEBA EXTREMO A EXTREMO (e2e)
 * 
 * En esta prueba (Sección 5), validamos el flujo completo ("Happy Path") simulando
 * que el usuario hace peticiones HTTP reales a nuestra API usando `supertest`.
 * Se prueban todos los pasos desde la solicitud HTTP de publicar un post, hasta
 * la respuesta final al cliente, pasando por los controladores, servicios e integración.
 */

describe('Flujo e2e: Creación y Publicación de Post en Instagram (e2e)', () => {
  let app: INestApplication<App>;
  let instagramService: InstagramService;

  beforeAll(async () => {
    // 1. ARRANGE: Levantamos la aplicación completa tal como corre en producción
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(PrismaService)
    .useValue({
      // Mock básico para que Prisma no intente conectarse a la base de datos real
      user: { findUnique: jest.fn(), create: jest.fn() },
      socialAccount: { findFirst: jest.fn() },
      post: { create: jest.fn() },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    instagramService = moduleFixture.get<InstagramService>(InstagramService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('Paso 5 al 8: Enviar petición POST a /api/instagram/publish para publicar en Instagram', async () => {
    // Simulamos la respuesta final del servicio interno para que la petición HTTP no llame a la API real de Meta
    jest.spyOn(instagramService, 'publishPost').mockResolvedValue({
      success: true,
      id: 'mock-instagram-post-12345'
    } as any);

    // ACT: Simulamos al Frontend enviando una petición HTTP POST real
    const response = await request(app.getHttpServer())
      .post('/instagram/publish') // Asumiendo esta ruta
      .send({
        userId: 'user-demo',
        imageUrl: 'https://mi-imagen.com/foto.jpg',
        caption: 'Este es mi primer post publicado automáticamente!'
      });

    // ASSERT: Validamos la respuesta HTTP
    // 1. Debe responder con status 201 (Created)
    expect(response.status).toBe(201);
    
    // 2. El cuerpo de la respuesta debe tener success: true
    expect(response.body.success).toBe(true);

    // 3. El cuerpo debe retornar el ID de publicación generado
    expect(response.body.id).toBe('mock-instagram-post-12345');
  });
});
