import express from 'express';
import * as managmentController from '../controllers/management.controller.js';
const router = express.Router();

router.post('/createMoto', async (req, res) => {
    try {
        const result = await managmentController.Registro(req, res);
        res.status(200).json(result);
    } catch (error) {
        console.error("error en /getSignal:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
})
router.get('/salida',async(req,res)=>{
    try {
        const result = await managmentController.registrar_salida(req, res);
        res.status(200).json(result);
    } catch (error) {
          console.error("error en /getSignal:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
})
export default router;