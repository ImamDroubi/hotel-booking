import express from "express";
import { createReservation, deleteReservation, getAllReservations, getReservation} from "../controllers/reservationController.js";
import { verifyAdmin, verifyUser } from "../utils/verify.js";
const router =express.Router();

// CREATE NEW RESERVATION
router.post("/" ,createReservation);

// DELETE RESERVATION
router.delete("/:id" ,deleteReservation);

// GET A RESERVATION 
router.get("/:id" ,getReservation);

// GET ALL RESERVATIONS FOR SOME USER
router.get("/user/:id" ,getAllReservations);

export default router;