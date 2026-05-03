import 'dotenv/config';
import { Sequelize } from 'sequelize';

const commonOptions = {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

if (process.env.DB_SSL === 'true') {
  commonOptions.dialectOptions = {
    ssl: { rejectUnauthorized: false }
  };
}

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, commonOptions)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      ...commonOptions,
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432
    });

export default sequelize;
