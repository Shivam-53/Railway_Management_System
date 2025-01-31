const {DataTypes}=require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const userDetails = sequelize.define("user", {
        name: DataTypes.STRING,
        phoneNumber:{type:DataTypes.STRING,unique:true},
        email:DataTypes.STRING,
        password:DataTypes.STRING,
    });
    return userDetails;
  };