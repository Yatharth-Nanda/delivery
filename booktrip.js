const { Sequelize, Transaction, Op } = require("sequelize");
const { sequelize } = require("./getConnect.js");
const Trip = require("./models/trip");

async function bookTrip(req, res) {
  const { fromLocation, toLocation, dayOfWeek } = req.body;

  try {
    const result = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      },
      async (t) => {
        const trip = await Trip.findOne({
          where: {
            from_location: fromLocation,
            to_location: toLocation,
            day_of_week: dayOfWeek,
            available_trips: { [Op.gt]: 0 },
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        if (!trip) {
          throw new Error(
            "No available trips found for the selected route and day. sad"
          );
        }

        trip.available_trips -= 1;
        await trip.save({ transaction: t });

        return {
          message: `Trip from ${trip.from_location} to ${trip.to_location} on day ${trip.day_of_week} of the week has been successfully booked. Remaining trips: ${trip.available_trips}.`,
        };
      }
    );

    // Handle successful booking
    return res.json(result);
  } catch (error) {
    console.error("Booking transaction failed:", error);

    // Handle errors, including no available trips
    if (
      error.message ===
      "No available trips found for the selected route and day. sad"
    ) {
      return res.status(404).json({
        message: error.message,
        fromLocation,
        toLocation,
      });
    }

    // Handle other errors
    return res
      .status(500)
      .json({ message: "An error occurred while trying to book the trip." });
  }
}

async function getTrip(req, res) {
  const { fromLocation, toLocation } = req.body;

  try {
    const availableTrips = await Trip.findAll({
      where: {
        from_location: fromLocation,
        to_location: toLocation,
        available_trips: { [Op.gt]: 0 },
      },
      attributes: ["day_of_week", "available_trips"],
      order: [["day_of_week", "ASC"]],
    });

    if (availableTrips.length === 0) {
      return res
        .status(404)
        .json({ message: "No available trips found for the selected route." });
    }

    const trips = availableTrips.map((trip) => ({
      dayOfWeek: trip.day_of_week,
      availableTrips: trip.available_trips,
    }));

    return res.json(trips);
  } catch (error) {
    console.error("Error fetching available trips:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching available trips." });
  }
}

module.exports = { bookTrip, getTrip };
