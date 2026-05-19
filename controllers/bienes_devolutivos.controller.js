import db from '../models/index.js';

const { bienes_devolutivos, estados, tipos_bien_devolutivo, vehiculos_motorizados } = db;

// GET /bienes-devolutivos - Listar todos con relaciones
export const getAll = async (req, res) => {
  try {
    const data = await bienes_devolutivos.findAll({
      include: [
        {
          model: estados,
          as: 'estado',
          attributes: ['id_estado', 'detalle'],
        },
        {
          model: tipos_bien_devolutivo,
          as: 'tipo_bien_devolutivo',
          attributes: ['id_tipo_bien_dev', 'descripcion'],
        },
        {
          model: vehiculos_motorizados,
          as: 'vehiculo_motorizado',
          attributes: ['id_vehiculo', 'placa', 'detalle', 'cilindraje', 'cantidad_pasajeros'],
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getAll bienes_devolutivos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// GET /bienes-devolutivos/:id
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await bienes_devolutivos.findByPk(id, {
      include: [
        {
          model: estados,
          as: 'estado',
          attributes: ['id_estado', 'detalle'],
        },
        {
          model: tipos_bien_devolutivo,
          as: 'tipo_bien_devolutivo',
          attributes: ['id_tipo_bien_dev', 'descripcion'],
        },
        {
          model: vehiculos_motorizados,
          as: 'vehiculo_motorizado',
          attributes: ['id_vehiculo', 'placa', 'detalle', 'cilindraje', 'cantidad_pasajeros'],
        },
      ],
    });
    if (!data) return res.status(404).json({ message: 'Bien devolutivo no encontrado' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getById bienes_devolutivos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// POST /bienes-devolutivos
export const create = async (req, res) => {
  try {
    const {
      detalle_bien,
      fecha_compra,
      fecha_registro,
      id_empleado,
      id_estado_bien,
      id_tipo_bien_dev,
      ubicacion_actual,
      valor_compra,
    } = req.body;

    const data = await bienes_devolutivos.create({
      detalle_bien,
      fecha_compra,
      fecha_registro,
      id_empleado,
      id_estado_bien,
      id_tipo_bien_dev,
      ubicacion_actual,
      valor_compra,
    });
    res.status(201).json(data);
  } catch (error) {
    console.error('Error en create bienes_devolutivos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// PUT /bienes-devolutivos/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      detalle_bien,
      fecha_compra,
      fecha_registro,
      id_empleado,
      id_estado_bien,
      id_tipo_bien_dev,
      ubicacion_actual,
      valor_compra,
    } = req.body;

    const registro = await bienes_devolutivos.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Bien devolutivo no encontrado' });

    await registro.update({
      detalle_bien,
      fecha_compra,
      fecha_registro,
      id_empleado,
      id_estado_bien,
      id_tipo_bien_dev,
      ubicacion_actual,
      valor_compra,
    });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error en update bienes_devolutivos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// DELETE /bienes-devolutivos/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await bienes_devolutivos.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Bien devolutivo no encontrado' });
    await registro.destroy();
    res.status(200).json({ message: 'Bien devolutivo eliminado correctamente' });
  } catch (error) {
    console.error('Error en remove bienes_devolutivos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
