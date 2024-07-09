const express = require("express");
const { sequelize } = require("./getConnect"); // Adjust the path as necessary to import your sequelize instance

// Import your API functions
const { bookTrip, getTrip } = require("./booktrip"); // Adjust the path as necessary to import your API functions
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Test the database connection (optional here since it's already defined in sequelize.js)
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

// Define your endpoints using the imported functions
app.post("/booktrip", bookTrip);
app.post("/gettrip", getTrip);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
