# ⚡ Quick Start - Despliegue en 5 Minutos

## Opción Más Fácil: Vercel (Recomendado)

### Requisitos:
- Cuenta en GitHub
- Cuenta en Vercel (https://vercel.com)
- Base de datos PostgreSQL (Neon, Vercel Postgres, o Railway)

### Pasos:

#### 1. Preparar Base de Datos (2 minutos)

**Opción A - Neon (Más simple)**:
1. Ve a https://neon.tech
2. Crea cuenta → Nuevo proyecto
3. Copia el `connection string` completo
4. Guárdalo (lo necesitarás en el paso 3)

**Opción B - Vercel Postgres**:
1. En https://vercel.com, ve a "Storage"
2. Crea PostgreSQL database
3. Copia la `DATABASE_URL`

#### 2. Actualizar tu Repositorio (1 minuto)

```bash
cd /home/cookie/Documents/mom-page
git add .
git commit -m "Deploy configuration"
git push origin master
```

#### 3. Desplegar en Vercel (2 minutos)

1. Ve a https://vercel.com/new
2. Selecciona tu repositorio
3. Vercel debería detectar **Vite** automáticamente
4. En "Environment Variables", añade:

```
DATABASE_URL=tu_connection_string_de_postgresql
FRONTEND_URL=https://tu-proyecto.vercel.app
VITE_API_URL=https://tu-proyecto.vercel.app/api
SESSION_SECRET=cualquier_texto_largo_aleatorio_123456789
NODE_ENV=production
```

5. Click en "Deploy"
6. ¡Espera 2-3 minutos mientras se construye!

#### 4. Aplicar Migraciones (1 minuto)

Después de que Vercel termine el deploy, abre una terminal y ejecuta:

```bash
# Generar SQL de migraciones
npx prisma migrate deploy --schema=prisma/schema.prisma
```

O si no tienes Prisma CLI configurado localmente, puedes ejecutarlo directamente en Vercel:

```bash
npm run build
```

### ✅ ¡Listo!

Tu app estará en: `https://tu-proyecto.vercel.app`

---

## Después del Despliegue

### Probar que funciona:
1. Abre https://tu-proyecto.vercel.app
2. Prueba el cotizador
3. Los datos deberían guardarse en la BD

### Admin Panel:
- Busca el enlace al panel de admin
- Usuario: `vanesa`
- Contraseña: `Luna1508`
- ⚠️ **Cambiar esto en producción!**

---

## Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| "Build failed" | Verifica que `npm run build` funciona localmente |
| Database connection error | Verifica `DATABASE_URL` en Vercel → Settings → Environment |
| CORS error | Asegúrate que `FRONTEND_URL` en env es la URL de Vercel |
| Las sesiones no persisten | Normal en Vercel sin BD de sesiones. Considera JWT. |

---

## Alternativas más Económicas

### Opción 1: Todo en Railway ($5/mes)
1. https://railway.app
2. Deploy directo del repo
3. Incluye BD PostgreSQL

### Opción 2: Frontend en Vercel + Backend en Render
- Frontend: Vercel (GRATIS)
- Backend: https://render.com (GRATIS con limitaciones)

---

¿Necesitas ayuda? Ver `DEPLOYMENT_GUIDE.md` para guía completa.
