import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db/database.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

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
