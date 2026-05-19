import express from 'express';
import * as managmentController from '../controllers/management.controller.js';
const router = express.Router();

router.post('/createNovedad', async (req, res) => {
    try {
        res.status(200).json(result);
    } catch (error) {
        console.error("error en /Crear:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
})

export default router;