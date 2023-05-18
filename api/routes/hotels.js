import express, { Router } from "express";
import { createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verify.js";
const router =express.Router();


// CREATE NEW HOTEL
router.post("/",verifyAdmin ,createHotel);

// UPDATE HOTEL 
router.put("/:id" ,verifyAdmin, updateHotel);

// DELETE HOTEL
router.delete("/:id" ,verifyAdmin ,deleteHotel);

// GET A HOTEL 
router.get("/:id" ,getHotel);

// GET ALL HOTELS 
router.get("/" , getAllHotels);

// GET A ROOM FROM THE HOTEL
router.get("/room/:id", getHotelRooms)



export default router;