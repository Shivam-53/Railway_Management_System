const cors=require("cors");
const express=require("express");
const routerr=express.Router()

const {createadmin,test,createTrain,loginadmin,}=require("../controllers/admin")
routerr.post("/admin",createadmin)
routerr.post("/admin/login",loginadmin)
routerr.post("/admin/scheduleTrain",createTrain)
module.exports={routerr}