import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"
import User from "../models/User.js";
import { createError } from "../utils/createError.js";
import Reservation from "../models/Reservation.js";

// CREATE NEW RESERVATION
export const createReservation = async(req,res,next)=>{
  const newReservation = new Reservation(req.body);
  try{
    await Room.updateMany(
      { "roomNumbers._id": { $in: req.body.roomNumbersIds } },
      {
        $push: {
          "roomNumbers.$[elem].unavailableDates": req.body.dates
        }
      },
      {
        arrayFilters: [{ "elem._id": { $in: req.body.roomNumbersIds } }]
      }
    )
    const savedReservation = await newReservation.save();
    res.status(200).json(savedReservation);
  }catch(err){
    return next(err);
  }
};



// DELETE A REESRVATION
export const deleteReservation = async(req,res,next)=>{
  const hotelId = req.params.hotelId;
  try{
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    await Room.updateMany(
      { "roomNumbers._id": { $in: deletedReservation.roomNumbersIds } },
      {
        $pull: {
          "roomNumbers.$[elem].unavailableDates": {$in : deletedReservation.dates}
        }
      },
      {
        arrayFilters: [{ "elem._id": { $in: deletedReservation.roomNumbersIds } }]
      }
    )
    res.status(200).json("Reservation Has Been Deleted.");
  }catch(err){
    return next(err);
  }
};


// GET A REESRVATION
export const getReservation = async(req,res,next)=>{
  try{
    const orderedReservation = await Reservation.findById(req.params.id);
    res.status(200).json(orderedReservation);
  }catch(err){
    return next(err);
  }
};

// GET ALL REESRVATIONS FOR SOME USER
export const getAllReservations = async(req,res,next)=>{
  try{
    const allReservations = await Reservation.find({"userId" : req.params.id});
    res.status(200).json(allReservations);
  }catch(err){
    return next(err);
  }
};
