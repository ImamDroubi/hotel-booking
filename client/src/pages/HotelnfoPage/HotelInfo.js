import { useContext, useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import Logo from "../../components/Logo/Logo";
import UserTop from "../../components/NavBar/UserTop";
import ReservePopUp from "../../components/ReservePopUp/ReservePopUp";
import {AiOutlineArrowLeft,AiOutlineArrowRight} from "react-icons/ai"
import "./hotelInfo.css"
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
function HotelInfo(){
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const [hotelId, setHotelId] = useState();
  const {data:hotel,loading,error} = useFetch(`${origin}/hotels/${hotelId}`);
  const {dates} = useContext(SearchContext);
  const [nights, setNights] = useState(1);
  const [currentPhotoIndex , setCurrentPhotoIndex] = useState(0);
  const [showPopUp , setShowPopUp] = useState(false);
  const handleRightSliding = ()=>{
    const size = hotel.photos.length;
    setCurrentPhotoIndex((currentPhotoIndex + 1)%size);
  }
  const handleleftSliding = ()=>{
    const size = hotel.photos.length;
    if(currentPhotoIndex === 0){
      setCurrentPhotoIndex(size-1);
    }else setCurrentPhotoIndex(currentPhotoIndex-1);
  }
  useEffect(()=>{
    if(!user)navigate("/login");
    const link = window.location.href.split("/") ;
    setHotelId(link[link.length-1]);
    console.log(dates);
    if(dates.length){
      let date1 = dates[0].split('-');
      let date2 = dates[1].split('-');
      let d1 = new Date(date1[0],Number(date1[1])-1,date1[2]);
      let d2 = new Date(date2[0],Number(date2[1])-1,date2[2]);
      const MS_PER_DAY = 1000*3600*24;
      let days = (d2.getTime() - d1.getTime())/MS_PER_DAY ;
      setNights(Number(days)+1);
    }
    
  },[user])
  return(
    loading? "Loading..." :<>
      {showPopUp? <ReservePopUp hotel={hotel} user={user} dates={dates} nights={nights} setShow={setShowPopUp}  /> : null}
      <div className="hotel-info-page">
        <div className="hotel-info-top-bar">
          <div className="hotel-info-top-contianer">
            <Logo/>
            {user && <UserTop items={[user.userName, "Logout"]}/>}
          </div>
        </div>
        <div className="hotel-info-body">
          <div className="hotel-info-body-top">
            <div className="hotel-info-title">{hotel.name}</div>
            <div className="hotel-info-address"><GoLocation/> {hotel.address}</div>
          </div>
          <div className="hotel-info-photos">
            <div className="slider" >
              <button className="left-slider-button" onClick={()=> handleRightSliding()} ><AiOutlineArrowLeft/></button>
              <div className="slider-photo">
                {hotel.photos && <img src={hotel.photos[currentPhotoIndex]}/>}
              </div>
              <button className="right-slider-button" onClick={()=> handleleftSliding()}><AiOutlineArrowRight/></button>
            </div>
          </div>
          <div className="hotel-info-details">
            <div className="hotel-info-description">
              <h2>Description</h2>
              <p>{hotel.desc}</p>
            </div>
            <div className="hotel-info-reserve-now-widget">
              <h3>Reserve Now!</h3>
              <p className="hotel-short-desc">{hotel.title}</p>
              <h4 className="hotel-reservation-price">${hotel.cheapestPrice * nights} ({nights || 1} Nights)</h4>
              <button className="reserve-now-button" onClick={()=>setShowPopUp(!showPopUp)}>Reserve Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HotelInfo;