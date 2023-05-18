import axios from "axios";
import "./adminPopups.css"
import { useEffect, useState } from "react";
function AddRoomPopup({setShow}){
  const [roomData, setRoomData] = useState({});
  const [validDataForm , setValidDataForm] = useState();
  const [showErr , setShowErr] = useState(false);
  const [errMessage, setErrMessage] = useState("Something is wrong, please check your information...");
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const handleAdding = async()=>{
    try{
      let res = await axios.post(`${origin}/rooms/${roomData.hotelId}` , validDataForm, {withCredentials : true})
      setShow(false);
    }catch(err){
      setErrMessage(err.response.message? err.response.message : errMessage);
      setShowErr(true);
      console.log(err.response);
    }
  }
  const handleSubmitting = ()=>{
    if(!roomData || !roomData.title || !roomData.hotelId || !roomData.price || !roomData.maxPeople || !roomData.desc || !roomData.roomNumbers){
      setShowErr(true);
      return;
    } 
    const rooms = roomData.roomNumbers.split(',');
    const roomsobj = rooms.map(room=>{
      return {
        "number" : room
      }
    })
    setValidDataForm({...roomData , roomNumbers : roomsobj});
    handleAdding();
  }
  useEffect(()=>{
    setShowErr(false);
  },[roomData])
  console.log(roomData);
  return(
    <>
      <div className="pop-up-bg">
        <div className="pop-up-container">
          <button className="close-pop-up-button" onClick={()=> setShow(false)}>X</button>
          <h2>Add new room:</h2>
          <div className="popup-form-container">
            <form className="popup-form">
              <label>Title:</label>
              <input className="popup-form-input" id="title" placeholder="Title..." onChange={(e)=> setRoomData({...roomData , title: e.target.value})}></input>
              <label>Hotel ID:</label>
              <input className="popup-form-input" id="hotelId" placeholder="Hotel ID..." onChange={(e)=> setRoomData({...roomData , hotelId: e.target.value})}></input>
              <label>Price($):</label>
              <input className="popup-form-input" id="price" placeholder="Price..." type="number" min="0" onChange={(e)=> setRoomData({...roomData , price: e.target.value})}></input>
              <label>Max People:</label>
              <input className="popup-form-input" id="maxPeople" placeholder="Max People..." type="number" min="0" onChange={(e)=> setRoomData({...roomData , maxPeople: e.target.value})}></input>
              <label>Rooms Numbers:</label>
              <input className="popup-form-input" id="roomNumbers" placeholder="Rooms Numbers...(ex: 1,2,3...)" type="text" onChange={(e)=> setRoomData({...roomData , roomNumbers: e.target.value})}></input>
              <label>Room Description:</label>
              <textarea className="popup-form-input" id="desc" placeholder="Room Description..." cols="20" onChange={(e)=> setRoomData({...roomData , desc: e.target.value})} ></textarea>
              {showErr? <p>{errMessage}</p> : null}
            </form>
          </div>
          <button onClick={handleSubmitting} className="pop-up-button">
            Add room
          </button>
        </div>
      </div>
    </>
  )
}
export default AddRoomPopup;