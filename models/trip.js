const { DataTypes } = require("sequelize");
const { sequelize } = require("../getConnect");

const Trip = sequelize.define(
  "Trip",
  {
    from_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    day_of_week: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 7 },
    },
    available_trips: {
      type: DataTypes.INTEGER,
      defaultValue: 7,
      validate: { min: 0 },
    },
  },
  {
    tableName: "trips",
    timestamps: false,
  }
);

module.exports = Trip;
