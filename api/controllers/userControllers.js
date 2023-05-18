import User from "../models/User.js";

// *CREATING A USER IS HANDLES IN AUTH CONTROLLERS*

// UPDATE A USER 
export const updateUser = async(req,res,next)=>{
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
    res.status(200).json(updatedUser);
  }catch(err){
    return next(err);
  }
};

// DELETE A USER 
export const deleteUser = async(req,res,next)=>{
  try{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Has Been Deleted.");
  }catch(err){
    return next(err);
  }
};

// GET A USER 
export const getUser = async(req,res,next)=>{
  try{
    const orderedUser = await User.findById(req.params.id);
    res.status(200).json(orderedUser);
  }catch(err){
    return next(err);
  }
};

// GET ALL USERS
export const getAllUsers = async(req,res,next)=>{
  try{
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  }catch(err){
    return next(err);
  }
};

// CHECK ADMIN 
export const checkAdmin  = async(req,res,next)=>{
  try{
    const user = await User.findById(req.params.id);
    if(user.isAdmin)res.status(200).json("YES")
    else res.status(200).json("NO");
  }catch(err){
    return next(err);
  }
} 