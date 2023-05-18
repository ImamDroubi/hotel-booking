import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/createError.js";

// CREATE NEW ROOM
export const createRoom = async(req,res,next)=>{
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try{
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId , {$push: {rooms: savedRoom._id}});
    res.status(200).json(savedRoom);
  }catch(err){
    return next(err);
  }
};

// UPDATE A ROOM
export const updateRoom = async(req,res,next)=>{
  try{
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
    res.status(200).json(updatedRoom);
  }catch(err){
    return next(err);
  }
};


// DELETE A ROOM
export const deleteRoom = async(req,res,next)=>{
  const hotelId = req.params.hotelId;
  try{
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId , {$pull: {rooms: req.params.id}});
    res.status(200).json("Room Has Been Deleted.");
  }catch(err){
    return next(err);
  }
};


// GET A ROOM
export const getRoom = async(req,res,next)=>{
  try{
    const orderedRoom = await Room.findById(req.params.id);
    res.status(200).json(orderedRoom);
  }catch(err){
    return next(err);
  }
};

// GET ALL ROOMS
export const getAllRooms = async(req,res,next)=>{
  try{
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  }catch(err){
    return next(err);
  }
};

// RESERVE A ROOM 
export const reserveRoom = async(req,res,next)=>{

  try{
    await Room.updateOne({"roomNumbers._id" : req.params.id},
    {
      $push: {
        "roomNumbers.$.unavailableDates" :req.body.dates
      }
    })
    res.status(200).json(req.body.dates);
  }catch(err){
    return next(err);
  }
};
