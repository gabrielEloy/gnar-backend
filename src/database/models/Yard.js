const { Model, DataTypes } = require('sequelize')

class Yard extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasOne(models.Shift, {
      foreignKey: 'yard_id',
    })
  }
}

module.exports = Yard;