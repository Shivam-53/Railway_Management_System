const {DataTypes}=require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const schedule = sequelize.define("schedule", {
        TrainName:DataTypes.STRING,
        Origin: DataTypes.STRING,
        Destination:DataTypes.STRING,
        DepartureTime:DataTypes.STRING,
        ArrivalTime:DataTypes.STRING,
        SeatAvailable:DataTypes.INTEGER,
        SeatBooked:DataTypes.INTEGER
    });
    return schedule;
  };