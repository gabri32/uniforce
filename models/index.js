import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);

const db = {};

// Leer todos los archivos del directorio
const files = fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file !== basename &&
      file.endsWith('.js')
    );
  });

for (const file of files) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const { default: model } = await import(modelPath);
  const modelInstance = model(sequelize, DataTypes);
  db[modelInstance.name] = modelInstance;
}
// Relaciones (si tienes asociaciones después)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;