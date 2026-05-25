import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// En Render con Persistent Disk: UPLOADS_DIR=/var/data/novedades
// En local: usa la carpeta del proyecto
export const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.join(__dirname, '..', 'uploads', 'novedades');

// Crear el directorio si no existe (útil al arrancar en Render)
mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    // Nombre temporal — el controlador lo renombra con el detalle del tipo
    const ext = path.extname(file.originalname);
    cb(null, `tmp_${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Acepta imágenes y PDFs
  const allowed = /jpeg|jpg|png|gif|pdf/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpg, png, gif) y PDF'));
  }
};

export const uploadNovedad = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB máximo
}).single('archivo'); // campo del form-data
