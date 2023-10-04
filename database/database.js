const { Sequelize } = require("sequelize");

const connection = new Sequelize("q_and_a", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
