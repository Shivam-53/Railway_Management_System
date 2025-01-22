const Sequelize =require("sequelize")
const cors=require("cors")
// const sequelize = new Sequelize(process.env.uri);
const sequelize = new Sequelize('RailwayManagement', 'postgres', '1234', {
    dialect: 'postgres',
    host: 'localhost',
  });
  console.log("easss");
  
  
const {db}=require("./models/model.js")


const sync=async()=>{
    await db.sequelize.sync()
}
sync();

const express=require("express");
const {router}=require("./routes/userRoutes.js")
const {routerr}=require("./routes/adminRoutes.js")
const app=express()
app.use(express.json())
app.use(router);
app.use(routerr)
app.use("/ad",(req,res)=>{
    res.send("www")
})
app.use(cors())
app.listen(3000,()=>{
    console.log("Server listening on port 3000");
    
})