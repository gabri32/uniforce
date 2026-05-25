import dotenv from 'dotenv';
dotenv.config();
import cors  from 'cors';
import https from 'https';
import express from 'express';
import sequelize from './db/database.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { UPLOADS_DIR } from './helpers/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos de uploads (local: ./uploads, Render: /var/data)
app.use('/uploads/novedades', express.static(UPLOADS_DIR));
//apis
import admin from './routes/park.routes.js';
import estadosRoutes from './routes/estados.routes.js';
import tiposBienDevolutivoRoutes from './routes/tipos_bien_devolutivo.routes.js';
import bienesDevolutivosRoutes from './routes/bienes_devolutivos.routes.js';
import tipoMotorizadosRoutes from './routes/tipo_motorizados.routes.js';
import vehiculosMotorizadosRoutes from './routes/vehiculos_motorizados.routes.js';
import tipoNovedadRoutes from './routes/tipo_novedad.routes.js';
import novedadesVehiculosRoutes from './routes/novedades_vehiculos.routes.js';

const PORT = process.env.PORT || 3000;
app.use('/admin', admin);
app.use('/api/estados', estadosRoutes);
app.use('/api/tipos-bien-devolutivo', tiposBienDevolutivoRoutes);
app.use('/api/bienes-devolutivos', bienesDevolutivosRoutes);
app.use('/api/tipo-motorizados', tipoMotorizadosRoutes);
app.use('/api/vehiculos-motorizados', vehiculosMotorizadosRoutes);
app.use('/api/tipo-novedad', tipoNovedadRoutes);
app.use('/api/novedades-vehiculos', novedadesVehiculosRoutes);
// Auto-ping cada 2 minutos (120000 ms)
setInterval(() => {
  https.get("https://uniforce.onrender.com", (res) => {
    console.log(`Ping enviado, status code: ${res}`);
  }).on("error", (err) => {
    console.error("Error en auto-ping:", err.message);
  });
}, 720000);
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada');

    app.listen(PORT, () => {
      console.log(`Servidor en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar la base de datos:', error.message);
    process.exit(1);
  }
};

startServer();
