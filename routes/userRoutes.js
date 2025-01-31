const cors=require("cors");
const express=require("express");
const router=express.Router()

const {registerUser,loginUser,getSeatAvailability,bookSeat,getSpecificBookingDetails,cancelBooking}=require("../controllers/user");
router.post("/user/register",registerUser);
router.post("/user/login",loginUser)
router.post("/user/trainseat",getSeatAvailability)
router.post("/user/bookseat",bookSeat)
router.get("/getbookingDetails",getSpecificBookingDetails)
router.get("/user/cancelbooking/:id",cancelBooking)
module.exports={router}