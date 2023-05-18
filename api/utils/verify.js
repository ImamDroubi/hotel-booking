import jwt from "jsonwebtoken";
import { createError } from "./createError.js";


// CHECK IF THERE IS A VALID TOKEN
export const verifyToken = async (req, res ,next)=>{
  const token = req.cookies.access_token;
  if(!token) return next(createError(401, "Your are not authenticated!"));
  jwt.verify(token , process.env.JWT_SECRET , (err , user)=>{
    if(err) return next(createError(403 , "Token not valid!"));
    req.user = user ;
    next();
  })
};

// CHECK IF THE USER THAT HAS THE VALID TOKEN HAS THE RIGHT TO ACCESS
export const verifyUser = async(req,res,next)=>{
  verifyToken(req,res,next,()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();
    }else{
      return next(createError(403 , "Your are not authorized!"));
    }
  });
};

// CHECK IF THE USER IS ADMIN
export const verifyAdmin = async(req,res,next)=>{
  verifyToken(req,res,next, ()=>{
    if(req.user.isAdmin){
      next();
    }else{
      return next(createError(403 , "Your are not authorized!"));
    }
  });
};