const {DataTypes}=require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const bookedModel = sequelize.define("bookedData", {
        BookingID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        TrainName:DataTypes.STRING,
        User:DataTypes.STRING,
        Origin: DataTypes.STRING,
        Destination:DataTypes.STRING,
        DepartureTime:DataTypes.STRING,
        ArrivalTime:DataTypes.STRING,
        SeatBooked:DataTypes.INTEGER
    });
    return bookedModel;
  };