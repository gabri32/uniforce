import db from '../models/index.js';
import { uploadNovedad } from '../helpers/upload.js';
import { rename } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { novedades_vehiculos, vehiculos_motorizados, tipo_novedad, bienes_devolutivos, tipo_motorizados } = db;

// Helper para construir la URL completa del archivo
const buildFileUrl = (req, filename) => {
  if (!filename) return null;
  return `${req.protocol}://${req.get('host')}/uploads/novedades/${filename}`;
};

// GET /novedades-vehiculos - Listar todas con relaciones completas
export const getAll = async (req, res) => {
  try {
    const data = await novedades_vehiculos.findAll({
      include: [
        {
          model: vehiculos_motorizados,
          as: 'vehiculo',
          attributes: ['id_vehiculo', 'placa', 'detalle', 'cilindraje', 'cantidad_pasajeros'],
          include: [
            { model: tipo_motorizados, as: 'tipo_motorizado', attributes: ['id_tipo_motorizado', 'detalle'] },
            {
              model: bienes_devolutivos,
              as: 'bien_devolutivo',
              attributes: ['id_bien_dev', 'detalle_bien', 'ubicacion_actual'],
            },
          ],
        },
        {
          model: tipo_novedad,
          as: 'tipo_novedad',
          attributes: ['id_tipo_novedad', 'detalle'],
        },
      ],
    });

    // Concatenar URL base con el nombre del archivo
    const result = data.map((item) => {
      const plain = item.toJSON();
      plain.url_archivo = buildFileUrl(req, plain.url_archivo);
      return plain;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error en getAll novedades_vehiculos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// GET /novedades-vehiculos/:id
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await novedades_vehiculos.findByPk(id, {
      include: [
        {
          model: vehiculos_motorizados,
          as: 'vehiculo',
          attributes: ['id_vehiculo', 'placa', 'detalle', 'cilindraje', 'cantidad_pasajeros'],
          include: [
            { model: tipo_motorizados, as: 'tipo_motorizado', attributes: ['id_tipo_motorizado', 'detalle'] },
            {
              model: bienes_devolutivos,
              as: 'bien_devolutivo',
              attributes: ['id_bien_dev', 'detalle_bien', 'ubicacion_actual'],
            },
          ],
        },
        {
          model: tipo_novedad,
          as: 'tipo_novedad',
          attributes: ['id_tipo_novedad', 'detalle'],
        },
      ],
    });
    if (!data) return res.status(404).json({ message: 'Novedad no encontrada' });

    const plain = data.toJSON();
    plain.url_archivo = buildFileUrl(req, plain.url_archivo);

    res.status(200).json(plain);
  } catch (error) {
    console.error('Error en getById novedades_vehiculos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// POST /novedades-vehiculos - Crea novedad y guarda el archivo con nombre descriptivo
export const create = async (req, res) => {
  // 1. Primero ejecutamos multer para que parsee el multipart/form-data
  uploadNovedad(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { id_vehiculo, id_tipo_novedad, detalle, valor, valor_por_galon, kilometraje, centro_costos, comprobante } = req.body;

      // 2. Ahora que multer parseó el body, buscamos el tipo de novedad
      const tipo = await tipo_novedad.findByPk(id_tipo_novedad, { attributes: ['detalle'] });
      if (!tipo) return res.status(404).json({ message: 'Tipo de novedad no encontrado' });

      let url_archivo = null;

      // 3. Si hay archivo, lo renombramos con el nombre descriptivo
      if (req.file) {
        const ext = path.extname(req.file.originalname);
        const tipoDetalle = tipo.detalle
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, '');
        const nuevoNombre = `novedad_${tipoDetalle}_${Date.now()}${ext}`;
        const dirUploads = path.join(__dirname, '..', 'uploads', 'novedades');
        await rename(
          path.join(dirUploads, req.file.filename),
          path.join(dirUploads, nuevoNombre)
        );
        url_archivo = nuevoNombre;
      }

      // 4. Guardamos en BD
      const data = await novedades_vehiculos.create({
        id_vehiculo,
        id_tipo_novedad,
        detalle,
        url_archivo,
        valor: valor || null,
        valor_por_galon: valor_por_galon || null,
        kilometraje: kilometraje || null,
        centro_costos: centro_costos || null,
        comprobante: comprobante || null,
      });

      res.status(201).json(data);
    } catch (error) {
      console.error('Error al guardar novedad:', error);
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  });
};

// PUT /novedades-vehiculos/:id
export const update = async (req, res) => {
  // Pasamos multer para parsear multipart/form-data si viene así
  uploadNovedad(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const { id } = req.params;
      const { id_vehiculo, id_tipo_novedad, detalle, valor, valor_por_galon, kilometraje, centro_costos, comprobante } = req.body;

      const registro = await novedades_vehiculos.findByPk(id);
      if (!registro) return res.status(404).json({ message: 'Novedad no encontrada' });

      let url_archivo = registro.url_archivo; // mantener el archivo actual por defecto

      // Si viene un archivo nuevo, renombrarlo y reemplazar
      if (req.file) {
        const tipo = await tipo_novedad.findByPk(id_tipo_novedad || registro.id_tipo_novedad, { attributes: ['detalle'] });
        const ext = path.extname(req.file.originalname);
        const tipoDetalle = (tipo?.detalle || 'archivo')
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, '');
        const nuevoNombre = `novedad_${tipoDetalle}_${Date.now()}${ext}`;
        const dirUploads = path.join(__dirname, '..', 'uploads', 'novedades');
        await rename(
          path.join(dirUploads, req.file.filename),
          path.join(dirUploads, nuevoNombre)
        );
        url_archivo = nuevoNombre;
      }

      await registro.update({
        id_vehiculo:     id_vehiculo     ?? registro.id_vehiculo,
        id_tipo_novedad: id_tipo_novedad ?? registro.id_tipo_novedad,
        detalle:         detalle         ?? registro.detalle,
        url_archivo,
        valor:           valor           ?? registro.valor,
        valor_por_galon: valor_por_galon ?? registro.valor_por_galon,
        kilometraje:     kilometraje     ?? registro.kilometraje,
        centro_costos:   centro_costos   ?? registro.centro_costos,
        comprobante:     comprobante     ?? registro.comprobante,
      });

      res.status(200).json(registro);
    } catch (error) {
      console.error('Error en update novedades_vehiculos:', error);
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  });
};

// DELETE /novedades-vehiculos/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await novedades_vehiculos.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Novedad no encontrada' });
    await registro.destroy();
    res.status(200).json({ message: 'Novedad eliminada correctamente' });
  } catch (error) {
    console.error('Error en remove novedades_vehiculos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
