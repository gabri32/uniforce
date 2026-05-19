import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guarda en /uploads/novedades relativo a la raíz del proyecto
    cb(null, path.join(__dirname, '..', 'uploads', 'novedades'));
  },
  filename: (req, file, cb) => {
    // Nombre: novedad_<tipo_detalle>_<timestamp><ext>
    // El tipo_detalle viene en req.body.tipo_detalle (lo inyecta el controlador antes de multer)
    const ext = path.extname(file.originalname);
    const tipoDetalle = (req.body.tipo_detalle || 'archivo')
      .toLowerCase()
      .replace(/\s+/g, '_')       // espacios → guión bajo
      .replace(/[^a-z0-9_]/g, ''); // caracteres especiales fuera
    const nombre = `novedad_${tipoDetalle}_${Date.now()}${ext}`;
    cb(null, nombre);
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
