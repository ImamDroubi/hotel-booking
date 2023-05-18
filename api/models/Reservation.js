import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  userId:{
    type : String,
    required : true,
  },
  hotelId:{
    type : String,
    required : true,
  },
  hotelName:{
    type : String,
    required : true,
  },
  roomNumbers:{
    type: [Number],
    required : true,
  },
  roomNumbersIds:{
    type: [String],
    required : true,
  },
  dates:{
    type : [Date],
    required : true,
  },
  price:{ 
    type : Number,
    required : true,
  },
});

export default mongoose.model("Reservation" , ReservationSchema);