const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cisco", "postgres", "maverick", {
  host: "localhost",
  dialect: "postgres",
});

// Function to test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, testConnection };
