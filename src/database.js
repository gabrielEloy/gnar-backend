const Sequelize = require('sequelize');
const models = require('./database/models');
const dbConfig = require('./config/database');

const connect = async () => {
  const connection = new Sequelize(dbConfig);

  Object.keys(models).forEach((model) => {
    models[model].init(connection);
  });

  Object.keys(models).forEach((model) => {
    models[model].associate(connection.models);
  });

  await connection.authenticate();
};

module.exports = { connect };
