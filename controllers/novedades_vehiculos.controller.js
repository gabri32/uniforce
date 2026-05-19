import db from '../models/index.js';
import { uploadNovedad } from '../helpers/upload.js';
import { Op } from 'sequelize';

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
  // 1. Primero buscamos el tipo_novedad para tener su detalle antes de que multer nombre el archivo
  const { id_tipo_novedad } = req.body;

  try {
    // Obtenemos el detalle del tipo para usarlo en el nombre del archivo
    const tipo = await tipo_novedad.findByPk(id_tipo_novedad, { attributes: ['detalle'] });
    if (!tipo) return res.status(404).json({ message: 'Tipo de novedad no encontrado' });

    // Inyectamos el detalle en req.body para que multer lo use al nombrar el archivo
    req.body.tipo_detalle = tipo.detalle;

    // 2. Ejecutamos multer manualmente
    uploadNovedad(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      try {
        const { id_vehiculo, detalle, valor } = req.body;

        // 3. url_archivo guarda solo el nombre del archivo (el origen se concatena en el GET)
        const url_archivo = req.file ? req.file.filename : null;

        const data = await novedades_vehiculos.create({
          id_vehiculo,
          id_tipo_novedad,
          detalle,
          url_archivo,
          valor,
        });

        res.status(201).json(data);
      } catch (error) {
        console.error('Error al guardar novedad:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
      }
    });
  } catch (error) {
    console.error('Error en create novedades_vehiculos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// PUT /novedades-vehiculos/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_vehiculo, id_tipo_novedad, detalle, url_archivo, valor } = req.body;
    const registro = await novedades_vehiculos.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Novedad no encontrada' });
    await registro.update({ id_vehiculo, id_tipo_novedad, detalle, url_archivo, valor });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error en update novedades_vehiculos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
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
