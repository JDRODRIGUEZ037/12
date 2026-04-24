import { Test, TestingModule } from '@nestjs/testing';
import { InstagramService } from './instagram.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

/**
 * EXPLICACIÓN DE LA PRUEBA UNITARIA (Para validación del RAC2)
 * 
 * En esta prueba (Integrante 2) estamos testeando el `InstagramService`.
 * El objetivo de una prueba unitaria aislar el código a probar.
 * Por eso, NO nos conectamos a la base de datos real (Prisma) ni hacemos
 * peticiones HTTP reales a Meta/Instagram (Axios).
 * En lugar de eso, usamos `jest.mock()` y `jest.spyOn()` para simular (mockear) 
 * esas dependencias externas.
 */

jest.mock('axios'); // Mockeamos la librería de peticiones HTTP por completo

describe('InstagramService (Pruebas Unitarias - Integrante 2)', () => {
  let service: InstagramService;
  let prisma: PrismaService;

  beforeEach(async () => {
    // 1. ARRANGE (Preparación): Configuramos el entorno virtual de la prueba
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstagramService,
        {
          // Simulamos las variables de entorno (ConfigService)
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'META_APP_ID') return 'mock-app-id';
              if (key === 'META_REDIRECT_URI') return 'http://localhost/callback';
              return null;
            }),
          },
        },
        {
          // Simulamos la base de datos (PrismaService)
          provide: PrismaService,
          useValue: {
            socialAccount: {
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<InstagramService>(InstagramService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiamos los mocks después de cada prueba
  });

  describe('Prueba #1: getPostComments()', () => {
    it('Debe retornar un array de comentarios si la petición a Instagram es exitosa', async () => {
      // 1. ARRANGE: Preparamos los datos falsos que devolverán nuestros mocks
      const mockAccount = { accessToken: 'mock-token', platformUserId: '123' };
      const mockCommentsResponse = {
        data: {
          data: [
            { id: '1', text: 'Test comment', username: 'user1', timestamp: '2026-04-15' }
          ]
        }
      };

      // Le decimos a Prisma que cuando alguien llame a findFirst, devuelva `mockAccount`
      jest.spyOn(prisma.socialAccount, 'findFirst').mockResolvedValue(mockAccount as any);
      // Le decimos a Axios que cuando alguien haga un GET, devuelva `mockCommentsResponse`
      (axios.get as jest.Mock).mockResolvedValue(mockCommentsResponse);

      // 2. ACT: Ejecutamos el método que realmente queremos probar
      const result = await service.getPostComments('post-id-123', 'user-id');

      // 3. ASSERT: Validamos que el resultado sea el esperado
      expect(prisma.socialAccount.findFirst).toHaveBeenCalledWith({
        where: { userId: 'user-id', platform: 'instagram', status: 'active' },
      }); // Verificamos que se consultó la DB correctamente
      expect(axios.get).toHaveBeenCalled(); // Verificamos que se llamó a la API
      expect(result).toHaveLength(1); // Verificamos que se devolvió el array mapeado
      expect(result[0].text).toBe('Test comment');
    });
  });

  describe('Prueba #2: publishPost() con fallo por validación', () => {
    it('Debe lanzar un error si no hay una cuenta vinculada', async () => {
      // 1. ARRANGE: Simulamos que la DB no encuentra la cuenta (null)
      jest.spyOn(prisma.socialAccount, 'findFirst').mockResolvedValue(null);

      // 2 y 3. ACT & ASSERT: Verificamos que la función lance el error esperado
      await expect(
        service.publishPost('user-id', 'http://image.url', 'Caption test')
      ).rejects.toThrow('No hay una cuenta de Instagram conectada.');
    });
  });

  describe('Prueba #3: publishPost() exitoso', () => {
    it('Debe retornar success: true y el ID de publicación si todo sale bien', async () => {
      // 1. ARRANGE: Preparamos cuenta falsa y respuestas falsas de Axios
      const mockAccount = { accessToken: 'mock-token', platformUserId: '123' };
      jest.spyOn(prisma.socialAccount, 'findFirst').mockResolvedValue(mockAccount as any);

      (axios.post as jest.Mock)
        .mockResolvedValueOnce({ data: { id: 'creation-123' } }) // Simula paso 1: Crear contenedor
        .mockResolvedValueOnce({ data: { id: 'published-123' } }); // Simula paso 2: Publicar contenedor

      // 2. ACT: Ejecutamos
      const result = await service.publishPost('user-id', 'http://image.url', 'Caption test');

      // 3. ASSERT: Verificamos los llamados y la respuesta final
      expect(axios.post).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ success: true, id: 'published-123' });
    });
  });
});
