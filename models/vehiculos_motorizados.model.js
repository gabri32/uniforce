export default (sequelize, DataTypes) => {
  const VehiculosMotorizados = sequelize.define(
    'vehiculos_motorizados',
    {
      id_vehiculo: {
        type: DataTypes.BIGINT, // bigserial NOT NULL
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cantidad_pasajeros: {
        type: DataTypes.INTEGER, // int4 NOT NULL
        allowNull: false,
      },
      cilindraje: {
        type: DataTypes.STRING, // varchar (nullable)
        allowNull: true,
      },
      detalle: {
        type: DataTypes.STRING, // varchar NOT NULL
        allowNull: false,
      },
      id_bien_dev: {
        type: DataTypes.INTEGER, // int4 NOT NULL
        allowNull: false,
        references: {
          model: 'bienes_devolutivos',
          key: 'id_bien_dev',
        },
      },
      id_tipo_motorizado: {
        type: DataTypes.INTEGER, // int4 NOT NULL
        allowNull: false,
        references: {
          model: 'tipo_motorizados',
          key: 'id_tipo_motorizado',
        },
      },
      placa: {
        type: DataTypes.STRING, // varchar NOT NULL
        allowNull: false,
      },
    },
    {
      tableName: 'vehiculos_motorizados',
      timestamps: false,
    }
  );

  VehiculosMotorizados.associate = (db) => {
    // Pertenece a un bien devolutivo
    VehiculosMotorizados.belongsTo(db.bienes_devolutivos, {
      foreignKey: 'id_bien_dev',
      as: 'bien_devolutivo',
    });

    // Pertenece a un tipo motorizado
    VehiculosMotorizados.belongsTo(db.tipo_motorizados, {
      foreignKey: 'id_tipo_motorizado',
      as: 'tipo_motorizado',
    });

    // Un vehículo puede tener muchas novedades
    VehiculosMotorizados.hasMany(db.novedades_vehiculos, {
      foreignKey: 'id_vehiculo',
      as: 'novedades',
    });
  };

  return VehiculosMotorizados;
};
