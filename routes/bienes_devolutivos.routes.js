import express from 'express';
import * as bienesDevolutivosController from '../controllers/bienes_devolutivos.controller.js';

const router = express.Router();

router.get('/', bienesDevolutivosController.getAll);
router.get('/:id', bienesDevolutivosController.getById);
router.post('/', bienesDevolutivosController.create);
router.put('/:id', bienesDevolutivosController.update);
router.delete('/:id', bienesDevolutivosController.remove);

export default router;
