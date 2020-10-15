const { Model, DataTypes } = require('sequelize')

class Upload extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
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
    this.hasMany(models.Shift, {
      foreignKey: 'upload_id',
      as: 'shifts'
    })
  }
}


module.exports = Upload;