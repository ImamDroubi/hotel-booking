import "./userInfo.css"
import { useContext, useEffect, useState } from "react";
import UserInfoFields from "../../components/UserInfoFields/UserInfoFields";
import Logo from "../../components/Logo/Logo"
import LoggedItems from "../../components/NavBar/LoggedItems"
import Reservations from "../../components/Reservations/Reservations";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
function UserInfo(){
  const link = window.location.href.split("/") ;
  const userId = link[link.length-1];
  const {user:userL} = useContext(AuthContext);
  const [user,setUser] = useState();
  const [showUserInfo , setShowUserInfo] = useState(true);
  const navigate = useNavigate();
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const [selectedImage, setSelectedImage] = useState();
  const handleSelect = (e)=>{
    setSelectedImage(e.target.files[0]);
  }
  const getUser = async()=>{
    try{
      const res = await axios.get(`${origin}/users/user/${userId}`,{withCredentials : true});
      setUser(res.data);
    }catch(err){
      throw err;
    }
  }
  useEffect(()=>{
    if(!userL)navigate("/login");
    if(!user)getUser();
    if(user && userL && user._id !== userL._id){
      navigate("/errors/notauth");
    }
  },[user,userL])
  return(
    user && userL && <>
      <div className="user-page">
          <div className="user-page-top-bar">
            <div className="user-page-top-container">
              <Logo/>
              <ul className="user-page-top-info">
                <LoggedItems items={[user.userName , "Logout"]}/>
              </ul>
            </div>
          </div>
        <div className="user-page-container">
          <div className="user-page-content">
            <div className="user-left-content">
              <div className="user-profile-picture">
                <img src={user.profilePic}></img>
                <input className="profile-pic-input" type="file" onChange={(e)=>handleSelect(e)}/>
                {selectedImage && <p className="profile-pic-indicator">{selectedImage.name}</p>}
              </div>
              <h3>{user.fullName}</h3>
            </div>
            <div className="user-right-content">
              <div className="user-right-headers">
                <h2 onClick={()=> setShowUserInfo(true)} id="user-informations" className={showUserInfo ? "user-page-selected" : "" }><a>User Info</a></h2>
                <h2 onClick={()=> setShowUserInfo(false)} id="user-reservations" className={!showUserInfo ? "user-page-selected" : "" }><a>Reservations</a></h2>
              </div>
              <div className="user-right-content-content">
                {showUserInfo ? 
                <UserInfoFields user={user} selectedImage={selectedImage} />
                :
                <Reservations/>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo;