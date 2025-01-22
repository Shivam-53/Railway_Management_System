const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize('RailwayManagement', 'postgres', '1234', {
    dialect: 'postgres',
    host: 'localhost',
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// const tp = require("./helper");
// console.log(typeof (tp));
db.adminDetails = require("./adminModel")(sequelize, Sequelize);
db.scheduleDetails = require("./scheduleModel")(sequelize, Sequelize)
db.userDetails = require("./userModel")(sequelize, Sequelize)
db.bookedModel=require("./bookedModel")(sequelize, Sequelize)
module.exports = { db };

