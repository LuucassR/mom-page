# Mom Page - Cotizador de Seguros 🚗

Aplicación web full-stack para cotización de seguros de vehículos con panel administrativo.

## ✨ Características

- **Cotizador Interactivo**: Busca marca, modelo, año y selecciona tipo de seguro
- **Panel Admin**: Gestiona cotizaciones con sesiones de 24 horas
- **Base de datos**: PostgreSQL + Prisma ORM
- **UI Moderna**: React + Tailwind CSS
- **TypeScript**: Código tipado y seguro

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus valores
```

### Desarrollo

```bash
# Iniciar frontend + backend
npm run dev

# Abre http://localhost:5174 en tu navegador
```

### Base de Datos

```bash
# Crear base de datos y ejecutar migraciones
npx prisma migrate dev

# (Opcional) Abrir Prisma Studio
npx prisma studio
```

## 📦 Despliegue

Para información completa sobre despliegue en **Vercel**, **Railway** u otros, consulta:

📖 [DEPLOYMENT.md](./DEPLOYMENT.md)

### Resumen de pasos:

1. **Configurar variables de entorno** (en el dashboard de tu proveedor)
   ```
   VITE_API_URL=https://tu-api-domain.com
   DATABASE_URL=postgresql://...
   ```

2. **Desplegar Frontend** en Vercel
3. **Desplegar Backend** en Railway, Render o similar
4. **Conectar Base de Datos** PostgreSQL

## 📋 Credenciales Admin

```
Usuario: vanesa
Contraseña: Luna1508
```

⚠️ **Cambiar en producción**

## 🛠️ Tecnología

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| BD | PostgreSQL, Prisma ORM |
| Deploy | Vercel (Frontend), Railway/Render (Backend) |

## 📚 Scripts

```bash
npm run dev              # Desarrollo (frontend + backend)
npm run build            # Build para producción
npm run preview          # Preview del build
npx prisma studio       # Ver/editar datos
npx prisma migrate dev   # Crear migraciones
```

## 🔐 Variables de Entorno

Ver `.env.example` para la lista completa.

**Desarrollo:**
```env
VITE_API_URL=http://localhost:8080
DATABASE_URL=postgresql://user:pass@localhost:5432/mom_page
```

**Producción:**
```env
VITE_API_URL=https://api.tu-dominio.com
DATABASE_URL=postgresql://...
```

## 📖 Documentación

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Prisma](https://www.prisma.io/docs)
- [Vercel Docs](https://vercel.com/docs)

## 🤝 Soporte

Consulta [DEPLOYMENT.md](./DEPLOYMENT.md) para troubleshooting y guías detalladas.

---

**v1.0** | Enero 2026

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
