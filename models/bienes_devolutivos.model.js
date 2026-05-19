export default (sequelize, DataTypes) => {
  const BienesDevolutivos = sequelize.define(
    'bienes_devolutivos',
    {
      id_bien_dev: {
        type: DataTypes.BIGINT, // bigserial NOT NULL
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      detalle_bien: {
        type: DataTypes.STRING, // varchar NOT NULL
        allowNull: false,
      },
      fecha_compra: {
        type: DataTypes.DATE, // timestamptz (nullable)
        allowNull: true,
      },
      fecha_registro: {
        type: DataTypes.DATE, // timestamptz NOT NULL
        allowNull: false,
      },
      id_empleado: {
        type: DataTypes.BIGINT, // int8 (nullable)
        allowNull: true,
      },
      id_estado_bien: {
        type: DataTypes.INTEGER, // int4 NOT NULL
        allowNull: false,
        references: {
          model: 'estados',
          key: 'id_estado',
        },
      },
      id_tipo_bien_dev: {
        type: DataTypes.SMALLINT, // int2 NOT NULL
        allowNull: false,
        references: {
          model: 'tipos_bien_devolutivo',
          key: 'id_tipo_bien_dev',
        },
      },
      ubicacion_actual: {
        type: DataTypes.STRING, // varchar (nullable)
        allowNull: true,
      },
      valor_compra: {
        type: DataTypes.BIGINT, // int8 (nullable)
        allowNull: true,
      },
    },
    {
      tableName: 'bienes_devolutivos',
      schema:'financiero',
      timestamps: false,
    }
  );

  BienesDevolutivos.associate = (db) => {
    // Pertenece a un tipo de bien devolutivo
    BienesDevolutivos.belongsTo(db.tipos_bien_devolutivo, {
      foreignKey: 'id_tipo_bien_dev',
      as: 'tipo_bien_devolutivo',
    });

    // Pertenece a un estado
    BienesDevolutivos.belongsTo(db.estados, {
      foreignKey: 'id_estado_bien',
      as: 'estado',
    });

    // Un bien devolutivo puede ser un vehículo motorizado
    BienesDevolutivos.hasOne(db.vehiculos_motorizados, {
      foreignKey: 'id_bien_dev',
      as: 'vehiculo_motorizado',
    });
  };

  return BienesDevolutivos;
};
