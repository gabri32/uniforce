import db from '../models/index.js';

const { tipo_novedad, novedades_vehiculos } = db;

// GET /tipo-novedad
export const getAll = async (req, res) => {
  try {
    const data = await tipo_novedad.findAll({
      include: [
        {
          model: novedades_vehiculos,
          as: 'novedades_vehiculos',
          attributes: ['id_novedad', 'detalle', 'valor'],
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getAll tipo_novedad:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// GET /tipo-novedad/:id
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tipo_novedad.findByPk(id, {
      include: [
        {
          model: novedades_vehiculos,
          as: 'novedades_vehiculos',
          attributes: ['id_novedad', 'detalle', 'valor'],
        },
      ],
    });
    if (!data) return res.status(404).json({ message: 'Tipo de novedad no encontrado' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getById tipo_novedad:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// POST /tipo-novedad
export const create = async (req, res) => {
  try {
    const { detalle } = req.body;
    const data = await tipo_novedad.create({ detalle });
    res.status(201).json(data);
  } catch (error) {
    console.error('Error en create tipo_novedad:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// PUT /tipo-novedad/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { detalle } = req.body;
    const registro = await tipo_novedad.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Tipo de novedad no encontrado' });
    await registro.update({ detalle });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error en update tipo_novedad:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// DELETE /tipo-novedad/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await tipo_novedad.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Tipo de novedad no encontrado' });
    await registro.destroy();
    res.status(200).json({ message: 'Tipo de novedad eliminado correctamente' });
  } catch (error) {
    console.error('Error en remove tipo_novedad:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
