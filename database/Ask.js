const sequelize = require("sequelize");
const connection = require("./database");

const Ask = connection.define(
  "ask",
  {
    title: {
      type: sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: sequelize.TEXT,
      allowNull: false,
    },
  },
  { freezeTableName: true, underscored: true }
);

Ask.sync({ force: false }).then(() => {
  console.log("created");
});

module.exports = Ask;
