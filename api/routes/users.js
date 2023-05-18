import express from "express";
import {verifyAdmin, verifyUser} from "../utils/verify.js";
const router =express.Router();
import {updateUser ,deleteUser , getUser, getAllUsers, checkAdmin} from "../controllers/userControllers.js"


// UPDATE USER 
router.put("/:id" , verifyUser ,updateUser);

// DELETE USER
router.delete("/:id" ,verifyUser,deleteUser);

// GET A USER 
router.get("/user/:id" ,verifyUser,getUser);

// GET ALL USERS 
router.get("/" ,verifyAdmin ,getAllUsers);

// CHECK ADMIN
router.get("/check/:id", checkAdmin);
export default router;