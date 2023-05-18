import "./hotelCard.css";
import {GoLocation} from "react-icons/go" ;
import {AiOutlineStar, AiFillStar} from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

function HotelCard({hotel}){
  
  return(
    <>
      <div className="hotel-card-container">
          <div className="hotel-card-image">
            <Link to={"/hotel/" + hotel._id}><img src={hotel.photos[0]} /></Link>
          </div>
          <div className="hotel-card-info">
            <div className="main-info">
              <h2 className="hotel-title"><Link to={"/hotel/" + hotel._id}>{hotel.title}</Link></h2>
              <p className="hotel-address"><GoLocation/>{hotel.distance}m from downtown</p>
              <p className="hotel-description">{hotel.desc.slice(0,Math.min(hotel.desc.length , 90))}{hotel.desc.length > 100?"...":""}</p>
            </div>
            <div className="side-info">
              <div className="hotel-rating">
                <div className="stars">
                  {
                    (()=>{
                      const stars = [];
                      for(let i=0;i<5;i++){
                        if(i<hotel.rating) stars.push(<AiFillStar key={i} />)
                        else stars.push(<AiOutlineStar key={i}/>)
                      }
                      return stars;
                    })()
                  }
                </div>
                {/* <p className="reviews"><span>23</span> reviews</p> */}
              </div>
              <h3 className="hotel-cheapest-price"><span>{hotel.cheapestPrice}</span>$/night</h3>
              <Link to={"/hotel/" + hotel._id} className="check-availability-button">Check availability</Link>
            </div>
          </div>
      </div>
    </>
  )
}
export default HotelCard;