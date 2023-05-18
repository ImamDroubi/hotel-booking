import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


//CREATE NEW HOTEL
export const createHotel = async(req,res,next)=>{
  const newHotel = new Hotel(req.body);
  try{
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  }catch(err){
    return next(err);
  }
};

//UPDATE A HOTEL
export const updateHotel = async(req,res,next)=>{
  try{
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
    res.status(200).json(updatedHotel);
  }catch(err){
    return next(err);
  }
};

//DELETE A HOTEL
export const deleteHotel = async(req,res,next)=>{
  try{
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Has Been Deleted.");
  }catch(err){
    return next(err);
  }
};

// GET A HOTEL
export const getHotel = async(req,res,next)=>{
  try{
    const orderedHotel = await Hotel.findById(req.params.id);
    res.status(200).json(orderedHotel);
  }catch(err){
    return next(err);
  }
};

//GET ALL HOTELS
export const getAllHotels = async(req,res,next)=>{
  let {min,max,destination} = req.query ;
  if(min && min === "undefined")min= null;
  if(max && max=== "undefined")max= null;
  if(destination && destination == "undefined")destination=  null;
  const query={}
  if(min && max){
    query.cheapestPrice = {$gte:min , $lte:max}
  }else if(min){
    query.cheapestPrice = {$gte:min}
  }else if(max){
    query.cheapestPrice = {$lte:max}
  }
  if(destination){
    let newD = destination.toLowerCase();
    destination = newD[0].toUpperCase() + newD.slice(1);
    query.city = destination;
  }
  try{
    const allHotels = await Hotel.find(query);
    res.status(200).json(allHotels);
  }catch(err){
    return next(err);
  }
};


// GET HOTEL ROOMS 
export const getHotelRooms = async (req,res,next) =>{
  try{
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(hotel.rooms.map(room=>{
      return Room.findById(room);
    }));
    res.status(200).json(list);
  }catch(err){
    next(err);
  }
}