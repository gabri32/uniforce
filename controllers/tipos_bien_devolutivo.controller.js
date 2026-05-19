import db from '../models/index.js';

const { tipos_bien_devolutivo, bienes_devolutivos } = db;

// GET /tipos-bien-devolutivo - Listar todos con sus bienes
export const getAll = async (req, res) => {
  try {
    const data = await tipos_bien_devolutivo.findAll({
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
    console.error('Error en getAll tipos_bien_devolutivo:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// GET /tipos-bien-devolutivo/:id
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tipos_bien_devolutivo.findByPk(id, {
      include: [
        {
          model: bienes_devolutivos,
          as: 'bienes_devolutivos',
          attributes: ['id_bien_dev', 'detalle_bien', 'ubicacion_actual'],
        },
      ],
    });
    if (!data) return res.status(404).json({ message: 'Tipo de bien devolutivo no encontrado' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getById tipos_bien_devolutivo:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// POST /tipos-bien-devolutivo
export const create = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const data = await tipos_bien_devolutivo.create({ descripcion });
    res.status(201).json(data);
  } catch (error) {
    console.error('Error en create tipos_bien_devolutivo:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// PUT /tipos-bien-devolutivo/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    const registro = await tipos_bien_devolutivo.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Tipo de bien devolutivo no encontrado' });
    await registro.update({ descripcion });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error en update tipos_bien_devolutivo:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// DELETE /tipos-bien-devolutivo/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await tipos_bien_devolutivo.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Tipo de bien devolutivo no encontrado' });
    await registro.destroy();
    res.status(200).json({ message: 'Tipo de bien devolutivo eliminado correctamente' });
  } catch (error) {
    console.error('Error en remove tipos_bien_devolutivo:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
