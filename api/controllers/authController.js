import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

// REGISTER NEW USER 
export const register = async(req,res,next)=>{
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(req.body.password , salt);
  const newUser = new User({
    ...req.body,
    "password" : hashedPass,
  });
  try{
    await newUser.save();
    res.status(201).json(newUser);
  }catch(err){
    next(err);
  }
};

// LOGIN  
export const login = async (req,res,next)=>{
  try{
    // Check Existance 
    const user = await User.findOne({email : req.body.email});
    if(!user) return next(createError(404 , "User not found!"));
    // Check Coorectness 
    const isPasswordCoorect = await bcrypt.compare(req.body.password , user.password);
    if(!isPasswordCoorect) return next(createError(400 , "Wrong password or email!"));
    const {password , isAdmin , ...otherDetails} = user._doc; 

    const token = jwt.sign({id: user._id , isAdmin: user.isAdmin} , process.env.JWT_SECRET);
    res.cookie("access_token" , token, {
      httpOnly :true,
      secure : true,
      sameSite : false
    }).status(200).json({...otherDetails});

  }catch(err){
    return next(err);
  }
}; 