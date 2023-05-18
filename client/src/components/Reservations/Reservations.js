import { useContext, useEffect, useState } from "react";
import "./reservations.css";
import { ImCancelCircle } from "react-icons/im";
import { Link, useNavigate  } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import DeletionPopup from "../DeletionPopup/DeletionPopup";
function Reservations(){
  const {user} = useContext(AuthContext);
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const {data:reservations, error ,loading, reFetch} = useFetch(`${origin}/reservations/user/${user._id}`);
  const navigate = useNavigate();
  const [choosedId , setChoosedId] = useState();
  const [showDeletionPopup , setShowDeletionPopup] = useState(false);
  const handleCancel = (e)=>{
    setChoosedId(e.target.id);
    setShowDeletionPopup(true);
  }
  useEffect(()=>{
    if(!reservations)reFetch();
  },[user])
  return(
    <>
      <div className="reservations-container">
        {
          reservations.map((reservation, index)=>{
            return(
              <div className="reservation-card" key={index}>
                <div className="reservation-left-section">
                  <h3 onClick={()=> navigate(`/hotel/${reservation.hotelId}`)}>{reservation.hotelName}</h3>
                  <p>{reservation.dates[0].slice(0,10)} - {reservation.dates[reservation.dates.length -1].slice(0,10)}</p>
                  <p>Rooms: {reservation.roomNumbers.map((room,ind) => ind == reservation.roomNumbers.length -1 ? room : room + ",")}</p>
                </div>
                <div className="reservation-right-section">
                  <h3>${reservation.price}</h3>
                  <button id={reservation._id} className="cancel-reservation" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            )
          })
        }
        {showDeletionPopup ? (
        <DeletionPopup
          elementId={choosedId}
          setShow={setShowDeletionPopup}
          message={"Are you sure you want to cancel this reservation?"}
          deletionUrl = {`reservations`}
        />
      ) : null}
        
      </div>
    </>
  )
}
export default Reservations;