const { sequelize } = require("./getConnect.js");

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // You can add more operations here to test further functionalities
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection();
