import express from 'express';
import * as tiposBienDevolutivoController from '../controllers/tipos_bien_devolutivo.controller.js';

const router = express.Router();

router.get('/', tiposBienDevolutivoController.getAll);
router.get('/:id', tiposBienDevolutivoController.getById);
router.post('/', tiposBienDevolutivoController.create);
router.put('/:id', tiposBienDevolutivoController.update);
router.delete('/:id', tiposBienDevolutivoController.remove);

export default router;
