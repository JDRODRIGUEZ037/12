# Proyecto AI-Powered PQRS / Social Media Management Platform

Este archivo es la actualización oficial de la documentación de la versión 1 (DOCE Digital Marketplace). Toda la arquitectura y stack tecnológico se ha migrado a la nueva **Versión 2**, centrada en un enfoque empresarial, gestión de redes sociales integradas (Instagram), y control de acceso basado en roles (RBAC).

## Novedades en la Arquitectura (App Versión 2)

- **Backend:** Desarrollado en **NestJS** usando Node.js, implementado con arquitectura por módulos.
- **Base de Datos:** Migración a PostgreSQL gestionada mediante **Prisma ORM**. Se descartan las instancias antiguas de MongoDB y MySQL.
- **Frontend:** Creado con **React 18** y **Vite**, estilizado con **Tailwind CSS v4** y componentes Radix UI.
- **Reglas Globales:**
  - *Multi-Tenant* (Multiusuario): Se incorpora una estrategia lógica desde el diseño inicial implementando `tenantId`.
  - *Infraestructura como Código (IaC)* y Eventos Asíncronos.
  - *Audit Logs inmutables:* Registro de las acciones asegurado de manera 'append-only' para métricas y observatorio regulatorio.

## Puesta en marcha

1. **Base de Datos y Prisma:**
   Asegúrate de que tus variables de entorno apuntan a la base de datos PostgreSQL correcta en el archivo `.env`.
   ```bash
   cd server
   npx prisma generate
   npx prisma db sync  # (o prisma migrate dev dependiendo de la configuración del proyecto)
   ```

2. **Backend (NestJS)**
   ```bash
   cd server
   npm install
   npm run start:dev
   ```
   El backend expone la API y se conecta con servicios externos como Facebook o Supabase.

3. **Frontend (Vite / React)**
   ```bash
   cd figma_mockup
   npm install
   npm run dev
   ```
   El panel de control operará en el puerto asignado (por defecto `http://localhost:5173`).

## Funcionalidades destacadas
- **Dashboard Multi-tenant.**
- **Conexión a Instagram Graph API:** Flujo completo de OAuth usando el Developer Console de Meta.
- **Diseño Glassmorphism Premium:** Uso de Radix Menu, Accordions y animaciones Framer Motion / tw-animate.

## Scripts disponibles
- Backend: `npm run start:dev`, `npm run build`, `npm run start:prod`
- Frontend: `npm run dev`, `npm run build`
