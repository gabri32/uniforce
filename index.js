import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import sequelize from './db/database.js';

const app = express();
app.use(express.json());
//apis
import admin from './routes/park.routes.js'
const PORT = process.env.PORT || 3000;
app.use('/admin', admin);
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada');

    app.listen(PORT, () => {
      console.log(`Servidor en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar la base de datos:', error.message);
    process.exit(1);
  }
};

startServer();
