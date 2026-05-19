import express from 'express';
import * as tipoMotorizadosController from '../controllers/tipo_motorizados.controller.js';

const router = express.Router();

router.get('/', tipoMotorizadosController.getAll);
router.get('/:id', tipoMotorizadosController.getById);
router.post('/', tipoMotorizadosController.create);
router.put('/:id', tipoMotorizadosController.update);
router.delete('/:id', tipoMotorizadosController.remove);

export default router;
