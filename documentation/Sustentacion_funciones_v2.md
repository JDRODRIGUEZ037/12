# Sustentación de Funciones - Versión 2

Este documento actualiza las justificaciones previas sobre el manejo de contenido y recuento de métricas hechas a través de consultas SQL en la App Versión 1.

## Cambio de Paradigma: Migración de SQL a Prisma / NestJS

Anteriormente (Versión 1), las métricas como `likesCount`, `commentsCount` o el estado de las publicaciones programadas `status = 'scheduled'` se leían mediante procedimientos en `MySQL` / consultas largas uniendo (`JOIN`) tablas como `Publications`, `Interactions` y `Content`. En esta nueva etapa del proyecto:

1. **Uso de la API de Instagram Graph en tiempo real:**
   En lugar de simular sumatorias locales en la base de datos de manera rígida, la *Versión 2* utiliza el `accessToken` manejado por NestJS para solicitar información real a los Webhooks de Meta y la red social conectada, trayendo la información procesada directamente.
2. **Reemplazo de Consultas Lógicas Crudas (Raw SQL):**
   Ya no mantenemos variables SQL manuales como `last_content_title`. La extracción de este tipo de resúmenes de datos se delega a **Prisma ORM**.
   En NestJS (dentro del Service), las llamadas al modelo Prisma se ven similares a:
   ```ts
   await this.prisma.socialAccount.findMany({
       where: { tenantId: requestTenantId },
       include: {
           // Incluir dependencias directamente
       }
   });
   ```

### Beneficios del Nuevo Enfoque:
- **Seguridad y Trazabilidad:** Evitamos vulnerabilidades o cuellos de botella en la base de datos, garantizando que el usuario solo puede ver lo que su `tenantId` (Inquilino) determina si su nivel de rol (RBAC) se lo permite.
- **Sincronización:** Evita estar en un estado donde los usuarios tienen localmente métricas desfasadas (ej. la base de datos dice que se tiene 0 visualizaciones mientras que Instagram registró 10,000 en el último minuto). 
- **Simplicidad de Mantenimiento:** La mantenibilidad y migración automática gracias a Prisma elimina la necesidad de justificar sentencias nativas `COALESCE` o `LIMIT 1` para cada nueva plataforma.
