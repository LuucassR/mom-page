# 🎯 ACCIONES INMEDIATAS PARA DESPLEGAR

## Lo que ya está hecho:

✅ Proyecto configurado para Vercel  
✅ API lista para serverless functions  
✅ Variables de entorno configuradas  
✅ Build optimizado para producción  

## Lo que DEBES hacer AHORA:

### Paso 1: Crear Base de Datos PostgreSQL

**Elige UNA opción:**

**Opción A - NEON (Más fácil, recomendado):**
```
1. Ir a https://neon.tech
2. Click en "Sign Up"
3. Crear cuenta con email
4. Crear un nuevo proyecto
5. Copiar la cadena de conexión (comienza con "postgresql://")
6. GUARDAR ESTA CADENA - la necesitarás en el paso 3
```

**Opción B - Vercel Postgres:**
```
1. Ir a https://vercel.com
2. Ir a "Storage"
3. Crear "Create Database" → PostgreSQL
4. Copiar DATABASE_URL
5. GUARDAR - necesitarás en paso 3
```

### Paso 2: Generar Credencial de Sesión

Ejecuta esto en terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiar el resultado (es una larga cadena hexadecimal)

### Paso 3: Subir Cambios a GitHub

```bash
cd /home/cookie/Documents/mom-page
git add .
git commit -m "Production deployment configuration"
git push origin master
```

### Paso 4: DESPLEGAR EN VERCEL

1. Ir a https://vercel.com (crear cuenta si no tienes)
2. Click en "Add New..." → "Project"
3. Seleccionar tu repositorio (mom-page)
4. Vercel debería mostrar:
   - Framework: **Vite** ✅
   - Root Directory: **.** ✅
   - Build Command: **npm run build** ✅
   - Output Directory: **dist** ✅

5. Click en "Environment Variables" y AGREGAR:

```
DATABASE_URL = [PEGA AQUI LA CONEXION DE POSTGRESQL]
FRONTEND_URL = https://[tu-nombre-proyecto].vercel.app
VITE_API_URL = https://[tu-nombre-proyecto].vercel.app/api
SESSION_SECRET = [PEGA AQUI EL RESULTADO DEL PASO 2]
NODE_ENV = production
```

6. Click en "Deploy"
7. **ESPERAR 3-5 MINUTOS** mientras construye

### Paso 5: Aplicar Migraciones a la BD

Una vez que Vercel dice "Deployment Successful":

```bash
npx prisma migrate deploy --schema=prisma/schema.prisma
```

Si preguntas por la BD, selecciona SÍ/YES.

### ✅ ¡LISTO!

Tu sitio está en: **https://[tu-nombre-proyecto].vercel.app**

---

## Verificar que Todo Funciona

1. Abre https://[tu-nombre-proyecto].vercel.app
2. Completa un cotizador y envía
3. Los datos deberían aparecer en la base de datos

---

## Admin Panel

Para acceder al panel administrativo:
- Username: `vanesa`
- Password: `Luna1508`

⚠️ **IMPORTANTE:** Cambiar estas credenciales en producción editando `api/index.ts`

---

## URLs Después del Despliegue

| Componente | URL |
|-----------|-----|
| Sitio Principal | https://[tu-proyecto].vercel.app |
| API | https://[tu-proyecto].vercel.app/api |
| Admin Login | https://[tu-proyecto].vercel.app/admin |

---

## Problemas Comunes

**"Build Failed"**
- Ejecutar `npm run build` localmente
- Si falla, revisar los errores de TypeScript

**"Database Connection Error"**
- Verificar que DATABASE_URL es correcto en Vercel
- Probar la conexión en terminal: `psql [DATABASE_URL]`

**"No se cargan datos después de desplegar"**
- Ejecutar: `npx prisma migrate deploy`
- Verifica que las migraciones se aplicaron

---

## Siguiente Paso: Customización en Producción

1. Cambiar credenciales admin
2. Actualizar mensajes de WhatsApp
3. Personalizar estilos/dominio
4. Configurar dominio personalizado en Vercel

---

¿Dudas? Revisar `DEPLOYMENT_GUIDE.md` para guía completa.
