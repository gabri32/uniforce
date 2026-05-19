import db from '../models/index.js';

const { tipo_motorizados, vehiculos_motorizados } = db;

// GET /tipo-motorizados
export const getAll = async (req, res) => {
  try {
    const data = await tipo_motorizados.findAll({
      include: [
        {
          model: vehiculos_motorizados,
          as: 'vehiculos_motorizados',
          attributes: ['id_vehiculo', 'placa', 'detalle'],
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getAll tipo_motorizados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// GET /tipo-motorizados/:id
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tipo_motorizados.findByPk(id, {
      include: [
        {
          model: vehiculos_motorizados,
          as: 'vehiculos_motorizados',
          attributes: ['id_vehiculo', 'placa', 'detalle'],
        },
      ],
    });
    if (!data) return res.status(404).json({ message: 'Tipo motorizado no encontrado' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getById tipo_motorizados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// POST /tipo-motorizados
export const create = async (req, res) => {
  try {
    const { detalle } = req.body;
    const data = await tipo_motorizados.create({ detalle });
    res.status(201).json(data);
  } catch (error) {
    console.error('Error en create tipo_motorizados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// PUT /tipo-motorizados/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { detalle } = req.body;
    const registro = await tipo_motorizados.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Tipo motorizado no encontrado' });
    await registro.update({ detalle });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error en update tipo_motorizados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// DELETE /tipo-motorizados/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await tipo_motorizados.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Tipo motorizado no encontrado' });
    await registro.destroy();
    res.status(200).json({ message: 'Tipo motorizado eliminado correctamente' });
  } catch (error) {
    console.error('Error en remove tipo_motorizados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
