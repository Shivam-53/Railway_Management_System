const {DataTypes}=require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const adminDetails = sequelize.define("admin", {
        name: DataTypes.STRING,
        phoneNumber:DataTypes.STRING,
        password:DataTypes.STRING,
        email:DataTypes.STRING,
        role:DataTypes.STRING
    });
    return adminDetails;
  };