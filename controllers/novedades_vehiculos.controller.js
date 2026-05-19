import db from '../models/index.js';

const { novedades_vehiculos, vehiculos_motorizados, tipo_novedad, bienes_devolutivos, tipo_motorizados } = db;

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
    res.status(200).json(data);
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
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getById novedades_vehiculos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// POST /novedades-vehiculos
export const create = async (req, res) => {
  try {
    const { id_vehiculo, id_tipo_novedad, detalle, url_archivo, valor } = req.body;
    const data = await novedades_vehiculos.create({
      id_vehiculo,
      id_tipo_novedad,
      detalle,
      url_archivo,
      valor,
    });
    res.status(201).json(data);
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
