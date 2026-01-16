# Mom Page - Cotizador de Seguros

Aplicación web full-stack para cotización de seguros de vehículos con panel administrativo.

## 🚀 Características

- ✨ Cotizador interactivo de seguros para vehículos
- 📋 Panel administrativo para gestionar cotizaciones
- 🔐 Sesiones de 24 horas para el admin
- 🗄️ Base de datos PostgreSQL con Prisma ORM
- 🎨 UI moderna con Tailwind CSS
- 📱 Responsive design

## 🛠️ Tecnología

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL

## 📋 Requisitos

- Node.js 18+
- PostgreSQL 12+
- npm o yarn

## 🔧 Instalación Local

### 1. Clonar el repositorio

```bash
git clone <tu-repo-url>
cd mom-page
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
# Database
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mom_page

# API URL (local development)
VITE_API_URL=http://localhost:8080
```

### 3. Configurar la base de datos

```bash
# Crear la base de datos
createdb mom_page

# Ejecutar migraciones
npx prisma migrate dev
```

### 4. Iniciar en desarrollo

```bash
npm run dev
```

Esto abrirá:
- Frontend: http://localhost:5174
- Backend: http://localhost:8080

## 📦 Despliegue en Vercel

### 1. Preparar el proyecto

El proyecto está configurado para usar variables de entorno dinámicas. El API URL cambiará automáticamente según el entorno.

### 2. Crear cuenta en Vercel

Ve a [vercel.com](https://vercel.com) y crea una cuenta.

### 3. Desplegar Frontend

```bash
# Conecta tu repositorio a Vercel a través del dashboard
# Vercel detectará automáticamente que es un proyecto Vite
```

Luego configura las variables de entorno en el dashboard de Vercel:

**Settings → Environment Variables**

```
VITE_API_URL=https://tu-api-domain.com
```

### 4. Desplegar Backend (API)

Hay varias opciones:

#### Opción A: Vercel Functions (Recomendado)

1. Convierte `src/server.ts` a una función Vercel
2. Crea `api/index.ts` con el código del servidor

#### Opción B: Railway, Render o Heroku

Recomendamos **Railway** o **Render** para el backend:

**Railway:**
```bash
# Conecta tu repositorio a railway.app
# Railway detectará automáticamente Node.js
```

**Variables de entorno en Railway:**
```
DATABASE_URL=postgresql://...
NODE_ENV=production
```

#### Opción C: Desplegar en tu propio servidor

Usa Docker o un VPS con Node.js instalado.

### 5. Configurar CORS

En `src/server.ts`, actualiza la URL de origen para producción:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
```

Agrega a las variables de entorno:
```
FRONTEND_URL=https://tu-dominio.vercel.app
```

### 6. Base de datos PostgreSQL

Para producción, usa:
- **Vercel Postgres** (integración directa)
- **Railway Postgres** (incluido)
- **Render Database**
- **Neon** (serverless PostgreSQL)
- **AWS RDS**

## 📊 Estructura del Proyecto

```
mom-page/
├── src/
│   ├── components/          # Componentes React
│   ├── lib/                 # Utilidades (apiConfig.ts)
│   ├── server.ts           # Servidor Express
│   ├── main.tsx            # Entry point
│   └── App.tsx
├── prisma/
│   ├── schema.prisma       # Esquema de BD
│   └── migrations/         # Historial de migraciones
├── generated/
│   └── prisma/             # Código generado por Prisma
├── .env.example            # Variables de ejemplo
├── vite.config.ts          # Config Vite
├── tsconfig.json
└── package.json
```

## 🔐 Credenciales Admin (Cambiar en producción)

Usuario: `vanesa`
Contraseña: `Luna1508`

⚠️ **IMPORTANTE:** Cambia estas credenciales antes de desplegar a producción.

Para cambiar:
1. Actualiza los valores en `src/server.ts` línea ~56
2. Usa variables de entorno para producción

## 📝 Variables de Entorno

### Desarrollo

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mom_page
VITE_API_URL=http://localhost:8080
```

### Producción

```env
DATABASE_URL=postgresql://user:password@prod-server:5432/mom_page
VITE_API_URL=https://tu-api-domain.com
FRONTEND_URL=https://tu-dominio.vercel.app
NODE_ENV=production
```

## 🔄 Migraciones de Base de Datos

```bash
# Ver estado de migraciones
npx prisma migrate status

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Generar cliente Prisma
npx prisma generate
```

## 🧪 Scripts disponibles

```bash
# Desarrollo
npm run dev              # Inicia frontend + backend
npm run dev:client       # Solo frontend
npm run dev:server       # Solo backend

# Build
npm run build            # Construir para producción
npm run build:client     # Build frontend
npm run build:server     # Build backend

# Otros
npm run preview          # Preview de build
npx prisma studio       # Abrir Prisma Studio
```

## 🐛 Troubleshooting

### Error: "Cannot find module '/generated/prisma/client'"

```bash
npx prisma generate
```

### Error de conexión a BD

- Verifica que PostgreSQL está corriendo
- Comprueba `DATABASE_URL` en `.env`
- Intenta: `npx prisma db push`

### Error de CORS

- Verifica que `FRONTEND_URL` está configurado correctamente
- En desarrollo: `http://localhost:5173`
- En producción: tu dominio actual

### Las sesiones no persisten

- Verifica que `credentials: "include"` está en los fetch
- Comprueba que las cookies están habilitadas
- En HTTPS: usa `secure: true` en session config

## 📚 Documentación

- [Vite](https://vitejs.dev)
- [React](https://react.dev)
- [Prisma](https://www.prisma.io)
- [Express](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Docs](https://vercel.com/docs)

## 📄 Licencia

MIT

## 👤 Autor

Proyecto de Vanesa

---

**Última actualización:** Enero 2026
