import db from '../models/index.js';

const { vehiculos_motorizados, bienes_devolutivos, tipo_motorizados, novedades_vehiculos, estados, tipos_bien_devolutivo, tipo_novedad } = db;

// GET /vehiculos-motorizados - Listar todos con relaciones completas
export const getAll = async (req, res) => {
  try {
    const data = await vehiculos_motorizados.findAll({
      include: [
        {
          model: bienes_devolutivos,
          as: 'bien_devolutivo',
          attributes: ['id_bien_dev', 'detalle_bien', 'valor_compra', 'fecha_compra', 'ubicacion_actual'],
          include: [
            { model: estados, as: 'estado', attributes: ['id_estado', 'detalle'] },
            { model: tipos_bien_devolutivo, as: 'tipo_bien_devolutivo', attributes: ['id_tipo_bien_dev', 'descripcion'] },
          ],
        },
        {
          model: tipo_motorizados,
          as: 'tipo_motorizado',
          attributes: ['id_tipo_motorizado', 'detalle'],
        },
        {
          model: novedades_vehiculos,
          as: 'novedades',
          attributes: ['id_novedad', 'detalle', 'valor', 'valor_por_galon', 'kilometraje', 'centro_costos', 'comprobante', 'url_archivo'],
          include: [
            { model: tipo_novedad, as: 'tipo_novedad', attributes: ['id_tipo_novedad', 'detalle'] },
          ],
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getAll vehiculos_motorizados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// GET /vehiculos-motorizados/:id
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await vehiculos_motorizados.findByPk(id, {
      include: [
        {
          model: bienes_devolutivos,
          as: 'bien_devolutivo',
          attributes: ['id_bien_dev', 'detalle_bien', 'valor_compra', 'fecha_compra', 'ubicacion_actual'],
          include: [
            { model: estados, as: 'estado', attributes: ['id_estado', 'detalle'] },
            { model: tipos_bien_devolutivo, as: 'tipo_bien_devolutivo', attributes: ['id_tipo_bien_dev', 'descripcion'] },
          ],
        },
        {
          model: tipo_motorizados,
          as: 'tipo_motorizado',
          attributes: ['id_tipo_motorizado', 'detalle'],
        },
        {
          model: novedades_vehiculos,
          as: 'novedades',
          attributes: ['id_novedad', 'detalle', 'valor', 'valor_por_galon', 'kilometraje', 'centro_costos', 'comprobante', 'url_archivo'],
          include: [
            { model: tipo_novedad, as: 'tipo_novedad', attributes: ['id_tipo_novedad', 'detalle'] },
          ],
        },
      ],
    });
    if (!data) return res.status(404).json({ message: 'Vehículo motorizado no encontrado' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getById vehiculos_motorizados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// POST /vehiculos-motorizados
export const create = async (req, res) => {
  try {
    const {
      id_bien_dev, id_tipo_motorizado, placa, detalle, cilindraje, cantidad_pasajeros,
      n_chasis, n_motor, fecha_inicio_tecnomecanica, fecha_fin_tecnomecanica,
      fecha_ini_soat, fecha_fin_soat,
    } = req.body;
    const data = await vehiculos_motorizados.create({
      id_bien_dev,
      id_tipo_motorizado,
      placa,
      detalle,
      cilindraje,
      cantidad_pasajeros,
      n_chasis,
      n_motor,
      fecha_inicio_tecnomecanica,
      fecha_fin_tecnomecanica,
      fecha_ini_soat,
      fecha_fin_soat,
    });
    res.status(201).json(data);
  } catch (error) {
    console.error('Error en create vehiculos_motorizados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// PUT /vehiculos-motorizados/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_bien_dev, id_tipo_motorizado, placa, detalle, cilindraje, cantidad_pasajeros,
      n_chasis, n_motor, fecha_inicio_tecnomecanica, fecha_fin_tecnomecanica,
      fecha_ini_soat, fecha_fin_soat,
    } = req.body;
    const registro = await vehiculos_motorizados.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Vehículo motorizado no encontrado' });
    await registro.update({
      id_bien_dev, id_tipo_motorizado, placa, detalle, cilindraje, cantidad_pasajeros,
      n_chasis, n_motor, fecha_inicio_tecnomecanica, fecha_fin_tecnomecanica,
      fecha_ini_soat, fecha_fin_soat,
    });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error en update vehiculos_motorizados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// DELETE /vehiculos-motorizados/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await vehiculos_motorizados.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Vehículo motorizado no encontrado' });
    await registro.destroy();
    res.status(200).json({ message: 'Vehículo motorizado eliminado correctamente' });
  } catch (error) {
    console.error('Error en remove vehiculos_motorizados:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
