export default (sequelize, DataTypes) => {
  const NovedadesVehiculos = sequelize.define(
    'novedades_vehiculos',
    {
      id_novedad: {
        type: DataTypes.BIGINT, // bigserial NOT NULL
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      detalle: {
        type: DataTypes.STRING, // varchar (nullable)
        allowNull: true,
      },
      id_tipo_novedad: {
        type: DataTypes.INTEGER, // int4 NOT NULL
        allowNull: false,
        references: {
          model: 'tipo_novedad',
          key: 'id_tipo_novedad',
        },
      },
      id_vehiculo: {
        type: DataTypes.INTEGER, // int4 NOT NULL
        allowNull: false,
        references: {
          model: 'vehiculos_motorizados',
          key: 'id_vehiculo',
        },
      },
      url_archivo: {
        type: DataTypes.STRING, // varchar
        allowNull: true,
      },
      valor: {
        type: DataTypes.INTEGER, // int4 (nullable)
        allowNull: true,
        defaultValue: 0,
      },
      valor_por_galon: {
        type: DataTypes.BIGINT, // int8 (nullable)
        allowNull: true,
      },
      kilometraje: {
        type: DataTypes.BIGINT, // int8 (nullable)
        allowNull: true,
      },
      centro_costos: {
        type: DataTypes.STRING, // varchar (nullable)
        allowNull: true,
      },
      comprobante: {
        type: DataTypes.STRING, // varchar (nullable)
        allowNull: true,
      },
    },
    {
      tableName: 'novedades_vehiculos',
      schema:'apoyo',
      timestamps: false,
    }
  );

  NovedadesVehiculos.associate = (db) => {
    // Pertenece a un vehículo motorizado
    NovedadesVehiculos.belongsTo(db.vehiculos_motorizados, {
      foreignKey: 'id_vehiculo',
      as: 'vehiculo',
    });

    // Pertenece a un tipo de novedad
    NovedadesVehiculos.belongsTo(db.tipo_novedad, {
      foreignKey: 'id_tipo_novedad',
      as: 'tipo_novedad',
    });
  };

  return NovedadesVehiculos;
};
