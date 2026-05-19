import express from 'express';
import * as vehiculosMotorizadosController from '../controllers/vehiculos_motorizados.controller.js';

const router = express.Router();

router.get('/', vehiculosMotorizadosController.getAll);
router.get('/:id', vehiculosMotorizadosController.getById);
router.post('/', vehiculosMotorizadosController.create);
router.put('/:id', vehiculosMotorizadosController.update);
router.delete('/:id', vehiculosMotorizadosController.remove);

export default router;
