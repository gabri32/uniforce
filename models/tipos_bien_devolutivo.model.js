export default (sequelize, DataTypes) => {
  const TiposBienDevolutivo = sequelize.define(
    'tipos_bien_devolutivo',
    {
      id_tipo_bien_dev: {
        type: DataTypes.SMALLINT, // smallserial NOT NULL
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING, // varchar NOT NULL
        allowNull: false,
      },
    },
    {
      tableName: 'tipos_bien_devolutivo',
      schema:'financiero',
      timestamps: false,
    }
  );

  TiposBienDevolutivo.associate = (db) => {
    // Un tipo puede tener muchos bienes devolutivos
    TiposBienDevolutivo.hasMany(db.bienes_devolutivos, {
      foreignKey: 'id_tipo_bien_dev',
      as: 'bienes_devolutivos',
    });
  };

  return TiposBienDevolutivo;
};
