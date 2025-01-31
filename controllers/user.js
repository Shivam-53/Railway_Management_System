const { Sequelize, DataTypes, where } = require("sequelize")
const sequelize = new Sequelize('RailwayManagement', 'postgres', '1234', {
    dialect: 'postgres',
    host: 'localhost',
});
const { tokenGeneration, userauthentication } = require("../middelware/auth")

const { db } = require("../models/model")
const adminDetails = db.adminDetails;
const scheduleDetails = db.scheduleDetails;
const userDetails = db.userDetails;
const bookedModel = db.bookedModel;
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcryptjs")


const registerUser = async (req, res) => {
    try {
        const Data = req.body;
        console.log(Data.password);
        const hasedPassword = await bcrypt.hash(Data.password, 10)
        const userData = {
            Name: Data.Name,
            phoneNumber: Data.phoneNumber,
            email: Data.email,
            password: hasedPassword
        };
        await sequelize.authenticate();
        await userDetails.create(userData);
        res.status(200).send({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: "Failed to create user", message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const loginData = req.body.phoneNumber;
        console.log();
        const plaintextPassword = req.body.password
        await sequelize.authenticate()
        await sequelize.sync()
        const data = await userDetails.findAll({
            raw: true,
            where: { phoneNumber: loginData }
        });

        if (data.length != 0) {

            const hashedPassword = data[0].password;
            const passwordCheck = await bcrypt.compare(plaintextPassword, hashedPassword)
            console.log(plaintextPassword,hashedPassword,passwordCheck);
            
            if (passwordCheck == true) {
                console.log("hashedPassword is ", hashedPassword, " ", passwordCheck);

                const token = await tokenGeneration(loginData.phoneNumber, "user");
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



const getSeatAvailability = async (req, res) => {
    try {
        const originn = req.body.origin;
        const destinationn = req.body.destination;
        console.log(originn, destinationn);
        const auth = await userauthentication(req, "user")
        if (auth == 200) {


            const data = await scheduleDetails.findAll({
                raw: true,
                where: {
                    Origin: originn,
                    Destination: destinationn

                }
            })
            console.log(data);

            res.json(data)
        } else {
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }

    } catch (error) {
        res.send("No trains available at the moment")
    }
}



const bookSeat = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { origin, destination, trainName, seatToBeBooked, userName } = req.body;

        const auth = await userauthentication(req, "user")
        if (auth == 200) {
            const seatCheck = await scheduleDetails.findOne({
                raw: true,
                where: {
                    TrainName: trainName,
                    Origin: origin,
                    Destination: destination,

                },
                transaction,
            });

            if (!seatCheck) {
                await transaction.rollback();
                return res.status(404).json({ message: "No schedule found for the given details." });
            }

            if (seatCheck.SeatAvailable <= 0 || seatCheck.SeatAvailable - seatToBeBooked < 0) {
                await transaction.rollback();
                return res.status(400).json({ message: "Not enough seats available." });
            }

            const val = seatCheck.SeatAvailable - seatToBeBooked;

            await scheduleDetails.update(
                { SeatAvailable: val },
                {
                    where: {
                        TrainName: trainName,
                        Origin: origin,
                        Destination: destination,
                    },
                    transaction,
                }
            );

            const bookingId = uuidv4();

            const bookedData = await bookedModel.create(
                {
                    BookingID: bookingId,
                    TrainName: trainName,
                    User: userName,
                    Origin: origin,
                    Destination: destination,
                    DepartureTime: seatCheck.DepartureTime,
                    ArrivalTime: seatCheck.ArrivalTime,
                    SeatBooked: seatToBeBooked,
                    isActive:true
                },
                { transaction }
            );

            await transaction.commit();

            res.status(200).json({
                message: "Booking successful",
                bookingId,
                trainName,
                userName,
                origin,
                destination,
                departureTime: seatCheck.DepartureTime,
                arrivalTime: seatCheck.ArrivalTime,
                seatBooked: seatToBeBooked,
            });
        }
        else {
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getSpecificBookingDetails = async (req, res) => {
    try {
        console.log("in grt");
        const auth = await userauthentication(req, "user")
        if (auth == 200) {
            const bookingid = req.query.id;
            const userName = req.query.Username;
            console.log(bookingid, userName);

            const getData = await bookedModel.findOne({
                where: {
                    User: userName,
                    BookingID: bookingid
                }
            })
            if (!getData) {
                return res.status(404).send({ message: "Data does not Exist" });
            }
            return res.send(getData);

        } else {
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }

    } catch (error) {
        res.send(error);
    }
}


const cancelBooking=async(req,res)=>{
    try {
        const refId=req.params.id;
        console.log(refId);
        console.log("yess");
        const findData=await bookedModel.update(
            {isActive:false},
            {
            where:{
                BookingID:refId
            }
        })
        console.log(findData);
    } catch (error) {
        res.send(error)
    }

}
module.exports = { registerUser, loginUser, getSeatAvailability, bookSeat, getSpecificBookingDetails,cancelBooking };
