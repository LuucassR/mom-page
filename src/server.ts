import express from "express"
import cors from "cors"
import type { Request, Response } from "express"
import session from 'express-session';
import { prisma } from "./lib/prisma";

const app = express()
let cotizaciones: any[] = [];

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mi_secreto_para_el_dashboard',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Ponlo en true si usas HTTPS
}));

app.post("/carData", async (req, res) => {
  try {
    req.session.carData = req.body;
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error guardando vehículo" });
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

app.get("/getCotizaciones", (_req: Request, res: Response) => {
  res.json(cotizaciones);
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
