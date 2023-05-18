import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Nav from "../../components/NavBar/Nav";
import UserTop from "../../components/NavBar/UserTop";
import "./home.css"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
function Home(){
  const {user} = useContext(AuthContext);
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const navigate = useNavigate();
  const items =["Login" , "Register"];
  const [isAdmin,setIsAdmin] = useState(null);
  const checkAdmin = async ()=>{
    try{
      let res = await axios.get(`${origin}/users/check/${user._id}`, {withCredentials : true});
      if(res.data === "NO")setIsAdmin(false);
      else setIsAdmin(true);
    }catch(err){
      throw(err);
    }
  }
  useEffect(()=>{
    user && checkAdmin();
  },[user])
  return(
    <>
    <div className="page">
      <img className="background" alt="background" src={require("../../assets/background.jpg")}/>
      <div className="container">
        <div className="top">
          <Logo />
          {user? <UserTop  items={[user.userName,isAdmin?"Admin Panel":null, "Logout"]} /> :<Nav items = {items}/>}
        </div>
        <div className="main">
          <h1 className="hero-text">Feel Like Home...</h1>
          <h3 className="slogan">The best hotels with the best prices</h3>
          <Link to={user? "/search" : "/login"} className="main-button home-button">Book Now!</Link>
        </div>
      </div>
    </div>
    </>
  )
};
export default Home;