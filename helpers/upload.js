import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'novedades'));
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
