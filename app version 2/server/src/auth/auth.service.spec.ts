import { Test, TestingModule } from '@nestjs/testing';
// Simulación (Mock) de un servicio de autenticación para propósitos del reporte
import { PrismaService } from '../prisma/prisma.service';

/**
 * EXPLICACIÓN DE LA PRUEBA UNITARIA (Para validación del RAC2)
 * 
 * En esta prueba (Integrante 1) simulamos las validaciones de Autenticación.
 * Al ser unitarias, NO nos conectamos a la BD. `PrismaService` es reemplazado 
 * por un objeto "falso" (mock) que programamos nosotros mismos en cada "it()".
 */

import { Injectable } from '@nestjs/common';

// Simulamos la clase AuthService que validaría las credenciales
@Injectable()
class MockAuthService {
  constructor(private prisma: PrismaService) {}
  
  async validateUserCredentials(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || password !== 'correct_password') return null; // Simula bcrypt
    const { password: _, ...result } = user; // Quita la contraseña
    return result;
  }

  async createUserProfile(data: any) {
    return await this.prisma.user.create({ data });
  }
}

describe('AuthService (Pruebas Unitarias - Integrante 1)', () => {
  let service: MockAuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    // 1. ARRANGE: Configuramos nuestro entorno virtual sin dependencias externas reales
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockAuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MockAuthService>(MockAuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('Prueba #1: validateUserCredentials() - Debe retornar objeto sin contraseña si es exitoso', async () => {
    // 1. ARRANGE: Le decimos a la DB (mock) que encuentre a este usuario
    const mockUser = { id: '1', email: 'test@test.com', password: 'correct_password' };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser as any);

    // 2. ACT: Ejecutamos el método
    const result = await service.validateUserCredentials('test@test.com', 'correct_password');

    // 3. ASSERT: Verificamos que el usuario se devuelve pero SIN la contraseña
    expect(result).toEqual({ id: '1', email: 'test@test.com' });
    expect(result).not.toHaveProperty('password');
  });

  it('Prueba #2: validateUserCredentials() - Debe retornar null con credenciales incorrectas', async () => {
    // 1. ARRANGE: El usuario existe en DB pero le pasaremos mal la contraseña
    const mockUser = { id: '1', email: 'test@test.com', password: 'correct_password' };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser as any);

    // 2. ACT
    const result = await service.validateUserCredentials('test@test.com', 'wrong_password');

    // 3. ASSERT: El resultado debe ser nulo por fallo de seguridad
    expect(result).toBeNull();
  });

  it('Prueba #3: createUserProfile() - Debe registrar en la DB exitosamente', async () => {
    // 1. ARRANGE: Simulamos que Prisma lo crea y devuelve el ID
    const mockCreatedUser = { id: 'new-id', name: 'Juan', role: 'admin' };
    jest.spyOn(prisma.user, 'create').mockResolvedValue(mockCreatedUser as any);

    // 2. ACT
    const result = await service.createUserProfile({ name: 'Juan', role: 'admin' });

    // 3. ASSERT
    expect(prisma.user.create).toHaveBeenCalledWith({ data: { name: 'Juan', role: 'admin' } });
    expect(result).toEqual(mockCreatedUser);
  });
});
