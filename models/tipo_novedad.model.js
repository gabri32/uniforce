export default (sequelize, DataTypes) => {
  const TipoNovedad = sequelize.define(
    'tipo_novedad',
    {
      id_tipo_novedad: {
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
      tableName: 'tipo_novedad',
      schema:'apoyo',
      timestamps: false,
    }
  );

  TipoNovedad.associate = (db) => {
    // Un tipo de novedad puede estar en muchas novedades
    TipoNovedad.hasMany(db.novedades_vehiculos, {
      foreignKey: 'id_tipo_novedad',
      as: 'novedades_vehiculos',
    });
  };

  return TipoNovedad;
};
