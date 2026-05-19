import express from 'express';
import * as novedadesVehiculosController from '../controllers/novedades_vehiculos.controller.js';

const router = express.Router();

router.get('/', novedadesVehiculosController.getAll);
router.get('/:id', novedadesVehiculosController.getById);
router.post('/', novedadesVehiculosController.create);
router.put('/:id', novedadesVehiculosController.update);
router.delete('/:id', novedadesVehiculosController.remove);

export default router;
