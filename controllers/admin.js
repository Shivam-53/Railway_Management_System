const { Sequelize, DataTypes, where } = require("sequelize")
const sequelize = new Sequelize('RailwayManagement', 'postgres', '1234', {
    dialect: 'postgres',
    host: 'localhost',
});
console.log("in admin");
const {tokenGeneration}=require("../middelware/auth");
const bcrypt=require("bcryptjs");

const { db } = require("../models/model")
const adminDetails=db.adminDetails;
const scheduleDetails=db.scheduleDetails;

const {userauthentication,checkapikey}=require("../middelware/auth")

const createadmin = async(req,res) =>{
    try {
        const Data = req.body;
        const key=req.headers.apikey;        
        const apikey= await checkapikey(key);        
        if(apikey!=1){
            res.status(500).send({ error: "API key does not match"});
        }
        console.log(Data.password);
        const hasedPassword = await bcrypt.hash(Data.password, 10)
        const userData = {
            name: Data.name,
            phoneNumber: Data.phoneNumber,
            email: Data.email,
            password: hasedPassword,
            role:Data.role
        };
        await sequelize.authenticate();
        await adminDetails.create(userData);
        res.status(200).send({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: "Failed to create user", message: error.message });
    }
}

const loginadmin = async (req, res) => {
    try {
        // const apikey= await checkapikey(req);
        // console.log(apikey);
        // if(apikey!=1){
        //     res.status(500).send({ error: "API key does not match"});
        // }
        const loginData = req.body.phoneNumber;
        console.log();
        const plaintextPassword = req.body.password
        await sequelize.authenticate()
        await sequelize.sync()
        const data = await adminDetails.findAll({
            raw: true,
            where: { phoneNumber: loginData }
        });

        if (data.length != 0) {

            const hashedPassword = data[0].password;
            const passwordCheck = await bcrypt.compare(plaintextPassword, hashedPassword)
            if (passwordCheck == true) {
                console.log("hashedPassword is ", hashedPassword, " ", passwordCheck);

                const token = await tokenGeneration(loginData.phoneNumber,"admin");
                console.log(token);
                res.status(200).json({ message: "Token is created", token })
            }
            else {
                console.log("here");
                
                res.status(404).send("User does not exist or the phone number is incorrect")

            }
        }
        else {
            console.log("hereee");
            
            res.status(404).send("User does not exist or the phone number is incorrect")
        }

    } catch (error) {
        console.log(error);
        res.status(501).send("Somethings Wrong on our side"
        )
    }
}


const createTrain=async(req,res)=>{
    try {
        const data=req.body;
        const dataa=await userauthentication(req,"admin")
        console.log(dataa);
        if(dataa==200){
        const savedData=await scheduleDetails.create(data);
        res.send(savedData)
        }else{
            res.status(404).send("Admin does not exist or the token is incorrect")
        }
    } catch (error) {
        console.log(error);
        res.status(501).send("Somethings Wrong on our Side")
    }
}




const test=async(req,res)=>{
    res.send("wasd")
}

module.exports={createadmin,test,createTrain,loginadmin};