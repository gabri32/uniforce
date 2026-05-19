import express from 'express';
import * as tipoNovedadController from '../controllers/tipo_novedad.controller.js';

const router = express.Router();

router.get('/', tipoNovedadController.getAll);
router.get('/:id', tipoNovedadController.getById);
router.post('/', tipoNovedadController.create);
router.put('/:id', tipoNovedadController.update);
router.delete('/:id', tipoNovedadController.remove);

export default router;
