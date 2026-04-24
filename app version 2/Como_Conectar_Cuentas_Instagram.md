# Guía: Cómo Conectar una Nueva Cuenta de Instagram

Este documento describe paso a paso cómo conectar una nueva cuenta de Instagram (o una cuenta adicional) a la plataforma de gestión (Dashboard).

## Requisitos Previos

1. **Cuenta Profesional de Instagram:** La cuenta de Instagram que deseas conectar debe estar configurada como "Cuenta Profesional" (Business o Creator).
2. **Vinculación con Facebook:** La cuenta de Instagram debe estar vinculada a una Página de Facebook de la cual seas administrador.
3. El frontend y backend de la aplicación deben estar ejecutándose localmente.

## Pasos para Conectar la Cuenta

### 1. Iniciar los Servicios Locales
Asegúrate de tener funcionando tanto el backend como el frontend.

- **Backend:** En una terminal, navega a la carpeta `server` y ejecuta `npm run start:dev`
- **Frontend:** En otra terminal, navega a la carpeta `figma_mockup` y ejecuta `npm run dev`

### 2. Acceder al Dashboard de Cuentas
1. Abre tu navegador web y entra a la dirección de tu frontend (usualmente `http://localhost:5173/accounts`, dependiendo del puerto que asigne Vite).
2. En el panel izquierdo, asegúrate de estar en la sección de **Cuentas**.

### 3. Iniciar el Flujo de Autorización
1. En la vista de "Cuentas Conectadas", haz clic en el botón azul de la parte superior derecha que dice **+ Conectar Cuenta** (o en la tarjeta del final "Conectar Nueva Cuenta").
2. Este botón te redirigirá a la página de inicio de sesión y autorización de Meta (Facebook).

### 4. Autorizar los Permisos en Facebook
1. Inicia sesión con la cuenta de Facebook que gestiona la página vinculada a la nueva cuenta de Instagram.
2. Continúa con tu perfil.
3. **Paso crítico al agregar múltiples cuentas:** Al momento de seleccionar las Páginas de Facebook y Cuentas de Instagram a las que darás acceso, **debes marcar tanto la cuenta nueva como las cuentas que ya habías conectado anteriormente**. Si desmarcas una cuenta previa durante este proceso, la plataforma perderá el acceso a ella.
4. Otorga todos los permisos solicitados (leer contenido, estadísticas, etc.) y haz clic en "Listo" o "Aceptar".

### 5. Confirmación Exitosa
1. Una vez finalizado el flujo en Meta, serás redirigido automáticamente de regreso a tu Dashboard (`/accounts`).
2. Deberías ver un mensaje en pantalla indicando: "¡Cuenta de Instagram conectada con éxito!".
3. La nueva cuenta de Instagram aparecerá ahora como una de las tarjetas principales dentro del grid, mostrando su foto de perfil, seguidores y cantidad de publicaciones.

---

> **Nota para Pruebas en el Entorno de Desarrollo (Meta Developer):**
> Como la aplicación en Meta Developers está actualmente en modo **Desarrollo**, la cuenta de Facebook con la que intentes iniciar sesión debe estar agregada como *Administrador* o *Tester (Probador)* dentro de la configuración de la aplicación en el [panel de desarrolladores de Meta](https://developers.facebook.com/). Si no lo está, Facebook mostrará un error indicando que la app no está activa.
