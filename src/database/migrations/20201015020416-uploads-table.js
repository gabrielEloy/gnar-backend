module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, INTEGER, DATE } = Sequelize
    await queryInterface.createTable('uploads', {
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      status: {
        type: STRING,
        allowNull: false,
        defaultValue: '',
      }
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('uploads')
  },
}
