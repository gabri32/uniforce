export default (sequelize, DataTypes) => {
  const Precio = sequelize.define('Precio', {
  id_precio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  schema: 'parqueadero',     
  tableName: 'precio',        
  timestamps: false,  
    defaultScope: {
      raw: true
    }       
});

  return Precio;
};