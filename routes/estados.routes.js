import express from 'express';
import * as estadosController from '../controllers/estados.controller.js';

const router = express.Router();

router.get('/', estadosController.getAll);
router.get('/:id', estadosController.getById);
router.post('/', estadosController.create);
router.put('/:id', estadosController.update);
router.delete('/:id', estadosController.remove);

export default router;
