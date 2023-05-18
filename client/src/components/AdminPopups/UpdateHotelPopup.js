import axios from "axios";
import useFetch from "../../hooks/useFetch";
import "./adminPopups.css"
import { useEffect, useState } from "react";
function UpdateHotelPopup({setShow,hotelId}){
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const { data: hotel, loading, error, reFetch } = useFetch(`${origin}/hotels/${hotelId}`);
  const [hotelData, setHotelData] = useState();
  const updateData = async()=>{
    try{
      const res = await axios.put(`${origin}/hotels/${hotelId}`, hotelData, {withCredentials : true});
      setShow(false);
    }catch(err){
      throw err;
    }
  }
  const handleUpdate = ()=>{
    updateData();
  }
  useEffect(() => {
    setHotelData(hotel);
  }, [hotel]);
  return(
    hotelData && <>
      <div className="pop-up-bg">
        <div className="pop-up-container">
          <button className="close-pop-up-button" onClick={()=> setShow(false)}>X</button>
          <h2>Update hotel:</h2>
          <div className="popup-form-container">
            <form className="popup-form">
              <label >Hotel Name:</label>
              <input className="popup-form-input" id="name" value={hotelData.name} onChange={(e)=>setHotelData({...hotelData , name : e.target.value})}></input>
              <label >Hotel Type:</label>
              <input className="popup-form-input" id="type" value={hotelData.type} onChange={(e)=>setHotelData({...hotelData , type : e.target.value})}></input>
              <label >City:</label>
              <input className="popup-form-input" id="city" value={hotelData.city} onChange={(e)=>setHotelData({...hotelData , city : e.target.value})}></input>
              <label >Hotel Address:</label>
              <input className="popup-form-input" id="address" value={hotelData.address} onChange={(e)=>setHotelData({...hotelData , address : e.target.value})}></input>
              <label >Distance(m):</label>
              <input className="popup-form-input" id="distance" value={hotelData.distance} onChange={(e)=>setHotelData({...hotelData , distance : e.target.value})}></input>
              <label >Title:</label>
              <input className="popup-form-input" id="title" value={hotelData.title} onChange={(e)=>setHotelData({...hotelData , title : e.target.value})}></input>
              <label >Cheapest Price($):</label>
              <input className="popup-form-input" id="cheapestPrice" value={hotelData.cheapestPrice} onChange={(e)=>setHotelData({...hotelData , cheapestPrice : e.target.value})}></input>
              <label >Rating*:</label>
              <input className="popup-form-input" id="rating" value={hotelData.rating} onChange={(e)=>setHotelData({...hotelData , rating : e.target.value})}></input>
              <label >Hotel Description:</label>
              <textarea className="popup-form-input" id="desc" value={hotelData.desc} onChange={(e)=>setHotelData({...hotelData , desc: e.target.value})}></textarea>
            </form>
          </div>
          <button onClick={handleUpdate} className="pop-up-button">
            Update hotel
          </button>
        </div>
      </div>
    </>
  )
}
export default UpdateHotelPopup;