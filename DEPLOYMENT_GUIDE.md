# 🚀 Guía de Despliegue - Mom Page Cotizador de Seguros

## Opción Recomendada: Despliegue en Vercel (Full-Stack)

Vercel permite desplegar tanto frontend como backend en una sola plataforma sin costo adicional usando Vercel Functions.

### Paso 1: Preparar el Proyecto

```bash
cd /home/cookie/Documents/mom-page

# Asegúrate de que todo está commiteado
git add .
git commit -m "Prepare for deployment"
git push origin master
```

### Paso 2: Crear Base de Datos PostgreSQL

Tienes varias opciones gratuitas:

#### Opción A: Vercel Postgres (Recomendado)
1. Ve a [vercel.com](https://vercel.com)
2. En el dashboard, ve a "Storage"
3. Crea una nueva base de datos PostgreSQL
4. Copia la `DATABASE_URL` de conexión

#### Opción B: Neon (Serverless PostgreSQL - Gratuito)
1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta
3. Crea un nuevo proyecto
4. Copia el connection string

#### Opción C: Railway (Full-Stack Hosting)
1. Ve a [railway.app](https://railway.app)
2. Nuevo proyecto → Selecciona PostgreSQL
3. Copia la `DATABASE_URL`

### Paso 3: Crear Proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Conecta tu repositorio GitHub (o importa manualmente)
3. Selecciona este proyecto
4. En "Configure Project":
   - **Framework Preset**: Vite
   - **Root Directory**: ./ (default)
   - **Build Command**: `npm run build` (debería estar pre-llenado)
   - **Output Directory**: `dist`

### Paso 4: Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, ve a **Settings → Environment Variables** y añade:

```
DATABASE_URL=postgresql://... (from your DB provider)
FRONTEND_URL=https://tu-proyecto.vercel.app
VITE_API_URL=https://tu-proyecto.vercel.app/api
SESSION_SECRET=genera_una_cadena_aleatoria_segura_AQUI
NODE_ENV=production
```

**Para generar SESSION_SECRET**, ejecuta:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Paso 5: Aplicar Migraciones en Producción

Una vez desplegado, necesitas aplicar las migraciones de base de datos:

```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Acceder a tu proyecto
vercel

# Ejecutar migraciones en producción
vercel env pull .env.production
npx prisma migrate deploy --schema=prisma/schema.prisma
```

O puedes usar la terminal de Vercel desde el dashboard después del despliegue.

### Paso 6: Deploy

```bash
git push origin master
```

Vercel se desplegará automáticamente en cada push.

---

## Alternativa: Despliegue Separado (Frontend + Backend)

### Frontend en Vercel, Backend en Railway (Gratuito)

#### Frontend (Vercel)
Sigue los pasos 1-4 de arriba.

#### Backend (Railway)

1. Ve a [railway.app](https://railway.app)
2. Nuevo proyecto → Conecta tu repo
3. Railway detectará automáticamente Node.js
4. En variables de entorno:
   ```
   DATABASE_URL=postgresql://...
   NODE_ENV=production
   PORT=3000
   FRONTEND_URL=https://tu-proyecto.vercel.app
   SESSION_SECRET=tu_clave_secreta
   ```

5. Tu backend estará en `https://tu-proyecto-nombre.up.railway.app`

#### Actualizar FRONTEND_URL en Vercel
En el dashboard de Vercel:
```
VITE_API_URL=https://tu-proyecto-nombre.up.railway.app
```

---

## Pasos Después del Despliegue

### ⚠️ IMPORTANTE: Cambiar Credenciales Admin

Las credenciales actuales en producción son:
- Usuario: `vanesa`
- Contraseña: `Luna1508`

Para cambiar, actualiza `api/index.ts` línea ~56:
```typescript
if (usuario === 'vanesa' && password === 'Luna1508') {
```

### Verificar que Todo Funcione

1. Abre tu sitio en Vercel: `https://tu-proyecto.vercel.app`
2. Prueba el cotizador:
   - Completa un cotizador
   - Verifica que los datos se guardaron
3. Accede al admin panel:
   - URL: `https://tu-proyecto.vercel.app` (busca enlace admin)
   - Usuario: `vanesa`
   - Contraseña: `Luna1508`
4. Verifica que ves los datos en la base de datos

### Monitoreo

- Revisa los logs en Vercel: Dashboard → Deployments → Logs
- Verifica errores de base de datos
- Checkea el estado de la BD en tu proveedor

---

## Troubleshooting

### Error: "Cannot find DATABASE_URL"
- Verifica que las variables de entorno estén configuradas en Vercel
- Los cambios tardan ~30 segundos en aplicarse

### Error: "Prisma Client Generation"
- Vercel ejecutará automáticamente `npx prisma generate` durante el build
- Si falla, ejecuta localmente: `npx prisma generate`

### Las sesiones no persisten
- Vercel usa diferentes instancias. Para sesiones persistentes, necesitas:
  - Option 1: Usar una base de datos externa (Redis) para sesiones
  - Option 2: Implementar JWT en lugar de sesiones

### Error de CORS
- Verifica que `FRONTEND_URL` está correcta en variables de entorno
- Recuerda redeploy después de cambiar variables

---

## Scripts Útiles

```bash
# Ver estado de migraciones
npx prisma migrate status

# Abrir Prisma Studio (local)
npx prisma studio

# Rebuild local
npm run build

# Test local del build
npm run preview
```

---

## URLs Finales (Ejemplo)

- **Frontend**: https://tu-proyecto.vercel.app
- **API**: https://tu-proyecto.vercel.app/api
- **Base de datos**: Vercel Postgres o Neon

---

## Soporte

Para problemas con:
- **Vercel**: https://vercel.com/docs
- **Prisma**: https://www.prisma.io/docs
- **PostgreSQL**: Revisa la documentación de tu proveedor

¡Listo para producción! 🎉
