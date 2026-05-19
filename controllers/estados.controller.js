import db from '../models/index.js';

const { estados, bienes_devolutivos } = db;

// GET /estados - Listar todos con sus bienes devolutivos
export const getAll = async (req, res) => {
  try {
    const data = await estados.findAll({
      include: [
        {
          model: bienes_devolutivos,
          as: 'bienes_devolutivos',
          attributes: ['id_bien_dev', 'detalle_bien', 'ubicacion_actual'],
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getAll estados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// GET /estados/:id - Obtener uno por ID
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await estados.findByPk(id, {
      include: [
        {
          model: bienes_devolutivos,
          as: 'bienes_devolutivos',
          attributes: ['id_bien_dev', 'detalle_bien', 'ubicacion_actual'],
        },
      ],
    });
    if (!data) return res.status(404).json({ message: 'Estado no encontrado' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getById estados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// POST /estados - Crear
export const create = async (req, res) => {
  try {
    const { detalle } = req.body;
    const data = await estados.create({ detalle });
    res.status(201).json(data);
  } catch (error) {
    console.error('Error en create estados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// PUT /estados/:id - Actualizar
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { detalle } = req.body;
    const registro = await estados.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Estado no encontrado' });
    await registro.update({ detalle });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error en update estados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// DELETE /estados/:id - Eliminar
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await estados.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Estado no encontrado' });
    await registro.destroy();
    res.status(200).json({ message: 'Estado eliminado correctamente' });
  } catch (error) {
    console.error('Error en remove estados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
