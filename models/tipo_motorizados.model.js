export default (sequelize, DataTypes) => {
  const TipoMotorizados = sequelize.define(
    'tipo_motorizados',
    {
      id_tipo_motorizado: {
        type: DataTypes.INTEGER, // serial4 NOT NULL
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
      tableName: 'tipo_motorizados',
      schema:'apoyo',
      timestamps: false,
    }
  );

  TipoMotorizados.associate = (db) => {
    // Un tipo motorizado puede tener muchos vehículos
    TipoMotorizados.hasMany(db.vehiculos_motorizados, {
      foreignKey: 'id_tipo_motorizado',
      as: 'vehiculos_motorizados',
    });
  };

  return TipoMotorizados;
};
