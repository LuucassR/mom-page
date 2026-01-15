import express from "express"
import cors from "cors"
import type { Request, Response } from "express"
import session from 'express-session';
import { prisma } from "./lib/prisma";

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mi_secreto_para_el_dashboard',
  resave: false,
  saveUninitialized: false,
  name: 'mipagina.sid', // Nombre personalizado para la cookie
  cookie: { 
    secure: false,      // false porque usas http (no https) en local
    httpOnly: true,     // por seguridad
    sameSite: 'lax'     // ayuda con el manejo de CORS en navegadores modernos
  }
}));

app.get("/getCotizaciones", async (_req, res) => {
  try {
    const data = await prisma.user.findMany({
      include: { cotizacion: true },
      orderBy: { createdAt: 'desc' } // Opcional: ver las más nuevas primero
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
})

app.post("/carData", async (req: Request, res: Response) => {
  try {
    req.session.carData = req.body;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Error guardando vehículo" });
    return console.error(err)
  }
});

app.post("/userData", async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;
    const carData = req.session.carData;

    if (!carData) {
      return res.status(400).json({ error: "No hay datos del vehículo" });
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
    res.status(500).json({ error: "Error guardando datos" });
  }
});

app.get("/dashboard/data", async (_req, res) => {
  const data = await prisma.user.findMany({
    include: { cotizacion: true },
  });

  res.json(data);
});


app.listen(3000, () => {
  console.log("🚀 Backend escuchando en http://localhost:3000")
})
