// Vercel Serverless Function for the Express API
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { prisma } from '../lib/prisma';

const app = express();

// Determine allowed origin
const getAllowedOrigin = () => {
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL;
  }
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173';
};

app.use(cors({
  origin: getAllowedOrigin(),
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'mi_secreto_para_el_dashboard',
  resave: false,
  saveUninitialized: false,
  name: 'mipagina.sid',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// API Routes
app.get('/getCotizaciones', async (_req, res) => {
  try {
    const data = await prisma.user.findMany({
      include: {
        cotizacion: true,
      },
    });
    res.json(data);
  } catch (error) {
    console.error('Error fetching cotizaciones:', error);
    res.status(500).json({ error: 'Error al obtener datos', details: String(error) });
  }
});

app.post('/admin/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (usuario === 'vanesa' && password === 'Luna1508') {
      (req.session as any).isAdmin = true;
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ error: 'Error al guardar la sesión' });
        }
        res.json({ ok: true, message: 'Sesión iniciada por 24 horas' });
      });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el login' });
  }
});

app.get('/admin/validate-session', (req, res) => {
  const isAdmin = (req.session as any).isAdmin;
  if (isAdmin) {
    res.json({ ok: true, isAdmin: true });
  } else {
    res.status(401).json({ ok: false, isAdmin: false });
  }
});

app.post('/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.json({ ok: true, message: 'Sesión cerrada' });
  });
});

app.post('/carData', async (req, res) => {
  try {
    req.session.carData = req.body;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Error guardando vehículo' });
    console.error(err);
  }
});

app.post('/userData', async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;
    const carData = req.session.carData;

    if (!carData) {
      return res.status(400).json({ error: 'No hay datos del vehículo' });
    }

    const user = await prisma.user.create({
      data: {
        nombre,
        email,
        telefono,
        cotizacion: {
          create: {
            marca: carData.marca,
            modelo: carData.modelo,
            anio: carData.anio,
            version: carData.version,
            es0km: carData.es0km,
            tieneGNC: carData.tieneGNC,
            tipoSeguro: carData.tipoSeguro,
          },
        },
      },
      include: {
        cotizacion: true,
      },
    });

    delete req.session.carData;

    res.json({ ok: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error guardando datos' });
  }
});

app.get('/dashboard/data', async (_req, res) => {
  const data = await prisma.user.findMany({
    include: { cotizacion: true },
  });
  console.log(data);

  res.json(data);
});

app.put('/cotizacion/:id/marcar-completada', async (req, res) => {
  try {
    const { id } = req.params;
    const cotizacion = await prisma.cotizacion.update({
      where: { id: parseInt(id) },
      data: { completada: true },
    });
    res.json({ ok: true, cotizacion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error actualizando cotización' });
  }
});

app.delete('/cotizacion/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    await prisma.cotizacion.delete({
      where: { id: parseInt(id) },
    });

    if (userId) {
      await prisma.user.delete({
        where: { id: parseInt(userId) },
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error eliminando cotización y usuario' });
  }
});

// Export as Vercel Handler
export default app;
