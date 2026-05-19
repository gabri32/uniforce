export default (sequelize, DataTypes) => {
  const Estados = sequelize.define(
    'estados',
    {
      id_estado: {
        type: DataTypes.INTEGER, // serial4
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      detalle: {
        type: DataTypes.STRING, // varchar NOT NULL
        allowNull: false,
      },
    },
    {
      tableName: 'estados',
      timestamps: false,
    }
  );

  Estados.associate = (db) => {
    // Un estado puede estar en muchos bienes devolutivos
    Estados.hasMany(db.bienes_devolutivos, {
      foreignKey: 'id_estado_bien',
      as: 'bienes_devolutivos',
    });
  };

  return Estados;
};
