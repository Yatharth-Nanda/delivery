const Trip = require("./models/trip"); // Assuming this is the path to your Trip model
const { sequelize } = require("./getConnect"); // Assuming sequelize is exported from the sequelize.js file

async function populateTrips() {
  const routes = [
    { from: "Mumbai", to: "Delhi" },
    { from: "Delhi", to: "Bangalore" },
    { from: "Bangalore", to: "Pune" },
  ];

  try {
    await sequelize.sync(); // Ensure your models are synced with the database

    for (const route of routes) {
      for (let day = 1; day <= 7; day++) {
        // Loop through each day of the week
        const availableTrips = Math.floor(Math.random() * 5) + 1; // Generate a random number of trips (1 to 5)

        await Trip.create({
          from_location: route.from,
          to_location: route.to,
          day_of_week: day,
          available_trips: availableTrips,
        });
      }
    }

    console.log("Trips populated successfully.");
  } catch (error) {
    console.error("Failed to populate trips:", error);
  }
}

populateTrips();
