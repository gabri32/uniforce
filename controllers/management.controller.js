import { Query } from 'pg';
import sequelize from '../db/database.js';
import { DataTypes } from 'sequelize';

import db from '../models/index.js';
/**
 * controller que maneja todo lo relacionado con la gestión del parqueadero
 * 
 */


const Registro = async (req, res) => {
    try {
        const { placa } = req.body;

        // Validar que se recibieron los datos necesarios
        if (!placa) {
            throw new Error('Faltan datos obligatorios:placa');
        }
        const fecha =  new Date()
console.log(fecha)        
        const dia = fecha.getDate()
        console.log(dia)
        const mes = (fecha.getMonth()+1)
        const anio = fecha.getFullYear()
        // Crear un nuevo registro en la base de datos
        const nuevoRegistro = await db.Motos.create({
            placa: '12345',
            fecha_ingreso: fecha,
            dia_mes: dia,
            mes: mes,
            anio: anio
        })

       return nuevoRegistro

    } catch (error) {
        console.error('Error en Registro:', error);
       throw error
    }

}



export{
Registro
};