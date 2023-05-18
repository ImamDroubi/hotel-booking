import "./logo.css"
import {RiHotelLine} from "react-icons/ri";
import { Link } from "react-router-dom";
function Logo(){
  return(
    <>

      <div className="logo">
        <RiHotelLine size="2rem" color="white"/>
        <Link to="/">BOOKER</Link>
      </div>
    </>
  )
}
export default Logo;