# DOCE Digital Marketplace

Interfaz y API seguras para gestionar publicaciones del marketplace DOCE Digital. Incluye autenticación con roles, CRUD cifrado, exportación a Excel y utilidades para activar un trigger de auditoría en MySQL.

## Requisitos

- Node.js 16+
- MySQL 8+

## Variables de entorno

Crear un archivo `.env` en `marketplace-backend/` con los valores adecuados:

```
PORT=5000
CORS_ORIGIN=http://localhost:3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=docedigital
JWT_SECRET=define_un_secreto_seguro
ENCRYPTION_KEY=clave-unica-para-aes
```

> `ENCRYPTION_KEY` puede ser cualquier cadena; el backend genera una clave AES-256 derivada de ese valor.

## Estructura de permisos

- La autenticación se realiza con el correo (`email`) y el `password_hash` almacenado en la tabla `users`.
- Si tu esquema incluye un campo `is_active`, únicamente los usuarios con valor `1`/`TRUE` podrán iniciar sesión.
- Cuando existe un `role_id`, el backend intenta obtener los permisos desde una tabla `roles` (columnas `can_create`, `can_update`, `can_delete`, `can_export`, `can_manage_triggers`).
- Si la tabla `roles` o los campos de permisos no están disponibles, los usuarios con `role_id = 1` o `role = 'admin'` reciben acceso completo y el resto queda en modo solo lectura/exportación deshabilitada.

### Ejemplo de datos de prueba

```sql
-- Rol administrador con todos los permisos (opcional si tienes tabla `roles`)
INSERT INTO roles (id, name, can_create, can_update, can_delete, can_export, can_manage_triggers)
VALUES (1, 'admin', TRUE, TRUE, TRUE, TRUE, TRUE)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  can_create = VALUES(can_create),
  can_update = VALUES(can_update),
  can_delete = VALUES(can_delete),
  can_export = VALUES(can_export),
  can_manage_triggers = VALUES(can_manage_triggers);

-- Usuario administrador activo
INSERT INTO users (id, role_id, full_name, email, password_hash, phone, is_active)
VALUES (1, 1, 'Admin Doce Digital', 'admin@docedigital.test', '$2b$10$abcdefghijklmnopqrstuv', '3000000000', TRUE)
ON DUPLICATE KEY UPDATE
  role_id = VALUES(role_id),
  full_name = VALUES(full_name),
  password_hash = VALUES(password_hash),
  is_active = VALUES(is_active);
```

Al crear usuarios adicionales asigna el `role_id` que corresponda y asegúrate de generar el `password_hash` con BCrypt.

## Puesta en marcha

1. **Backend**
   ```bash
   cd marketplace-backend
   npm install
   node server.js
   ```
   El servidor expone endpoints protegidos bajo `/api` y cifra los campos sensibles (`content`, `image_url`) antes de guardarlos en MySQL.

2. **Frontend**
   ```bash
   cd ..
   npm install
   npm start
   ```
   La SPA se renderiza en `http://localhost:3000` y consume la API autenticada.

## Funcionalidades destacadas

- Inicio de sesión con JWT y almacenamiento seguro del token.
- Panel de publicaciones con filtros por fecha y métricas, creación/edición/eliminación condicionada a permisos.
- Datos cifrados en el CRUD y descifrados al mostrarse en la interfaz.
- Exportación de publicaciones filtradas a Excel con un clic.
- Botón para crear el trigger `trg_publications_after_insert` y una tabla de auditoría `publication_logs`.
- Descarga automática en Excel y mensajes de estado claros para cada acción.

## Scripts disponibles

- `npm start`: levanta el front-end (Create React App).
- `npm run build`: compila el front-end en modo producción.
- `node marketplace-backend/server.js`: inicia la API segura.

## Notas

- Para probar distintos niveles de privilegios, crea usuarios con roles y banderas de permiso diferentes en la base de datos.
- Los filtros de texto (`search`) se aplican sobre los datos ya descifrados en el servidor, manteniendo el almacenamiento cifrado.
- El trigger de ejemplo inserta registros en `publication_logs` cada vez que se crea una publicación.
