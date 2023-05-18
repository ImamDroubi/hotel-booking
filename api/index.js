import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import reservationRouter from "./routes/reservation.js"
import cookieParser from "cookie-parser";
import { verifyAdmin, verifyToken, verifyUser } from "./utils/verify.js";
import cors from "cors"
const PORT = process.env.PORT || 4000;
const app = express();
dotenv.config(); 

const allowedOrigins = ["http://localhost:3000/"]
app.use(cors({
  credentials : true,
  origin : allowedOrigins,
}))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
// CONNECTING TO MONGO DB
const connect = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to DB");
  } catch (err) {
    throw err ;
  }
}
mongoose.connection.on("disconnected" , ()=>{
  console.log("MongoDB Disconnected");
})



// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth" , authRoute);
app.use("/api/hotels" , hotelsRoute);
app.use("/api/users" , usersRoute);
app.use("/api/rooms" , roomsRoute);
app.use("/api/reservations" , reservationRouter);


// ERROR HANDLING 
app.use((err,req,res,next)=>{
  res.status(err.status || 500).json({
    "success" : false,
    "status" : err.status || 500,
    "message" : err.message || "Something Went Wrong!",
    "stack" : err.stack
  });
});




app.listen(PORT, ()=>{
  connect(); 
  console.log(`Connected to Backend on port ${PORT}`)
})