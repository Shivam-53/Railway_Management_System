const {DataTypes}=require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const userDetails = sequelize.define("user", {
        Name: DataTypes.STRING,
        phoneNumber:DataTypes.STRING,
        email:DataTypes.STRING,
        password:DataTypes.STRING,
    });
    return userDetails;
  };