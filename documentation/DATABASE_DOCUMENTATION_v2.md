# Documentación de Base de Datos - Versión 2

Este documento reemplaza a los antiguos scripts y arquitecturas relacionales/no-relacionales de MySQL y MongoDB correspondientes a la versión 1 (DOCE Digital).

## Nueva Arquitectura (PostgreSQL + Prisma)

El proyecto adopta **PostgreSQL** administrado mediante **Prisma ORM**. Esta decisión centraliza las reglas de negocio, facilita las consultas asíncronas seguras y provee una capa de tipos nativa hacia el backend en TypeScript/NestJS.

### Tablas (Modelos)

#### 1. Tabla: `User`
Representa al usuario de la plataforma y el panel (Dashboard).
- `id`: String (UUID) - Identificador único de usuario.
- `email`: String (Unique) - Correo electrónico de inicio de sesión.
- `name`: String (Opcional) - Nombre del empleado o usuario.
- `tenantId`: String - **[Multi-Tenant]** Identificador del inquilino (Empresa/Agencia) para aislamiento de información.
- `createdAt` / `updatedAt`: Tiempos de seguimiento de creación y actualización.

#### 2. Tabla: `SocialAccount`
Almacena las cuentas sociales (ej: Instagram/Facebook) integradas por el usuario a través de OAuth.
- `id`: String (UUID).
- `userId`: String (Foreign Key a `User`).
- `platform`: String - Especifica la red social (e.g. `instagram`).
- `platformUserId`: String (Unique) - ID que provee la red social correspondiente.
- `accountName`: String (Opcional).
- `followersCount` / `mediaCount`: Integers - Métricas iniciales y conteos.
- `profilePicture`: String (Tex).
- `accessToken`: String (Tex) - Token cifrado devuelto por la API de Meta.
- `tokenExpiresAt`: DateTime.
- `status`: String - Determina si la cuenta está activa o desconectada.
- `tenantId`: String - **[Multi-Tenant]** Aislamiento de cuentas.

#### 3. Tabla: `AuditLog`
Siguiendo las reglas de "Registro Inmutable", esta entidad no permite que los usuarios modifiquen registros históricos (Append-only).
- `id`: String (UUID).
- `action`: String - Tipo de acción realizada.
- `entity`: String - Entidad afectada (ej: 'SocialAccount').
- `entityId`: String - ID del registro modificado.
- `userId`: String - Quién ejecutó la acción.
- `tenantId`: String - **[Multi-Tenant]** A qué entidad pertenece el log.
- `payload`: JSON - Contenido detallado del cambio/acción.
- `timestamp`: DateTime.

## Reglas y Consideraciones
- **Relaciones:** Un `User` puede tener múltiples `SocialAccount`.
- **Escalabilidad:** Todas las tablas obligan al uso de `tenantId`, preparándolas para una lógica SaaS desde el día cero.
