import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, reserveRoom, updateRoom } from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verify.js";
const router =express.Router();

// CREATE NEW ROOM
router.post("/:hotelId",verifyAdmin ,createRoom);

// UPDATE ROOM 
router.put("/:id" ,verifyAdmin, updateRoom);

// DELETE ROOM
router.delete("/:id/:hotelId" ,verifyAdmin ,deleteRoom);

// GET A ROOM 
router.get("/:id" ,getRoom);

// GET ALL ROOMS 
router.get("/" , getAllRooms);

// RESERV A ROOM 
router.post("/reserve/:id" , reserveRoom);

export default router;