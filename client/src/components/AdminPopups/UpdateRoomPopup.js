import axios from "axios";
import "./adminPopups.css"
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
function UpdateRoomPopup({setShow,roomId}){
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const { data: room, loading, error, reFetch } = useFetch(`${origin}/rooms/${roomId}`);
  const [roomData, setRoomData] = useState();
  const [showErr , setShowErr] = useState(false);
  const [errMessage, setErrMessage] = useState("Something is wrong, please check your information...");
  const updateData = async()=>{
    try{
      const res = await axios.put(`${origin}/rooms/${roomId}`, roomData, {withCredentials : true});
      setShow(false);
    }catch(err){
      throw err;
    }
  }
  const handleUpdate = ()=>{
    if(!roomData || !roomData.title || !roomData.hotelId || !roomData.price || !roomData.maxPeople || !roomData.desc || !roomData.roomNumbers){
      setShowErr(true);
      return;
    }
    updateData();
  }
  useEffect(() => {
    if(room){
      setRoomData(room);
    }
  }, [room]);
  return(
    roomData && <>
      <div className="pop-up-bg">
        <div className="pop-up-container">
          <button className="close-pop-up-button" onClick={()=> setShow(false)}>X</button>
          <h2>Update room:</h2>
          <div className="popup-form-container">
            <form className="popup-form">
              <label>Title:</label>
              <input className="popup-form-input" id="title" value={roomData.title} onChange={(e)=> setRoomData({...roomData , title: e.target.value})}></input>
              <label>Price($):</label>
              <input className="popup-form-input" id="price" value={roomData.price} type="number" min="0" onChange={(e)=> setRoomData({...roomData , price: e.target.value})}></input>
              <label>Max People:</label>
              <input className="popup-form-input" id="maxPeople" value={roomData.maxPeople} type="number" min="0" onChange={(e)=> setRoomData({...roomData , maxPeople: e.target.value})}></input>
              <label>Room Description:</label>
              <textarea className="popup-form-input" id="desc" value={roomData.desc} cols="20" onChange={(e)=> setRoomData({...roomData , desc: e.target.value})} ></textarea>
            </form>
          </div>
          <button onClick={handleUpdate} className="pop-up-button">
            Update room
          </button>
        </div>
      </div>
    </>
  )
}
export default UpdateRoomPopup;