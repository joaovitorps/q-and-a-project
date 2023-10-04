const sequelize = require("sequelize");
const connection = require("./database");

const Reply = connection.define(
  "reply",
  {
    body: {
      type: sequelize.STRING,
      allowNull: false,
    },
    ask_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true, underscored: true }
);

Reply.sync({ force: false });

module.exports = Reply;
