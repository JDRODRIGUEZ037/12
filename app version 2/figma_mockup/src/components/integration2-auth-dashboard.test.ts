import { describe, it, expect, beforeEach } from 'vitest';

/**
 * EXPLICACIÓN DE LA PRUEBA DE INTEGRACIÓN #2
 * 
 * En el frontend también hay pruebas de integración. En este caso probamos
 * cómo interactúan dos flujos distintos: El módulo de Autenticación (Supabase/JWT)
 * y el módulo de Rutas Protegidas del Dashboard.
 * 
 * Probamos que al inyectar un "Token" falso en el almacenamiento local,
 * el componente del Dashboard permite el acceso en lugar de redirigir al Login.
 */

// Simulamos los componentes para la demostración de la prueba de integración
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();

// Función que simula la protección de ruta
const requireAuth = () => {
  const token = localStorageMock.getItem('supabase_token');
  if (!token) throw new Error('401 Unauthorized');
  return true;
};

// Función que simula cargar las métricas
const fetchDashboardMetrics = async () => {
  requireAuth(); // Verifica la autenticación primero
  return { followers: 1500, likes: 300 }; // Si pasa, devuelve datos
};

describe('Prueba de Integración #2: Autenticación + Dashboard', () => {
  
  beforeEach(() => {
    localStorageMock.clear(); // Limpiamos la sesión antes de cada prueba
  });

  it('Debe bloquear el acceso al Dashboard si el usuario no ha iniciado sesión', async () => {
    // ARRANGE: No hay token en el localStorageMock
    
    // ACT & ASSERT
    await expect(fetchDashboardMetrics()).rejects.toThrow('401 Unauthorized');
  });

  it('Debe permitir el acceso al Dashboard y cargar métricas si el login generó el token', async () => {
    // ARRANGE: Simulamos el paso 1 y 2 del login exitoso
    // El login guardaría el JWT en el storage
    localStorageMock.setItem('supabase_token', 'eyJhbGciOiJIUzI1NiIsInR...');
    
    // ACT: Intentamos cargar el dashboard (paso 3)
    const metrics = await fetchDashboardMetrics();

    // ASSERT: Validamos que la integración de seguridad permitió el paso y trajo datos
    expect(metrics).toBeDefined();
    expect(metrics.followers).toBe(1500);
  });
});
