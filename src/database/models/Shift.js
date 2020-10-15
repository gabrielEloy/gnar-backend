const { Model, DataTypes } = require('sequelize');

class Shift extends Model {
  static init (sequelize){
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      upload_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'upload',
          key: 'id',
        },
      },
      yard_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'yard',
          key: 'id',
        },
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employee',
          key: 'id',
        },
      },
      clock_in: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      clock_out: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Upload, {
      foreignKey: 'upload_id',
    })
    this.belongsTo(models.Yard, {
      foreignKey: 'yard_id',
    })
    this.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
      as: 'employee'
    })
  }
}
module.exports = Shift;