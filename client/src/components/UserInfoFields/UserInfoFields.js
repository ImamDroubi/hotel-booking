import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./userInfoFields.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function UserInfoFields({selectedImage,user}){
  const {userL} = useContext(AuthContext);
  const [newData , setNewData] = useState({});
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const uploadImage = async (url,data)=>{
    setIsLoading(true);
    try{
      
      const res = await axios.post(url,data);
      const res2 = await axios.put(`${origin}/users/${user._id}`, {"profilePic" : res.data.url}, {withCredentials : true});
      
    }catch(err){
      throw err;
    }
    setIsLoading(false);
  }
  const preUploadImage = ()=>{
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "bookingUpload");
    const url = "https://api.cloudinary.com/v1_1/imamdroubi/image/upload" ;
    uploadImage(url,formData);
  }
  const updateUser = async()=>{
    setIsLoading(true);
    try{
      
      const res = await axios.put(`${origin}/users/${user._id}`, newData);
      
    }catch(err){
      throw(err);
    }
    setIsLoading(false);
  }
  const handleUpdate = ()=>{
    updateUser();
    if(selectedImage){
      preUploadImage();
    }
    
  }
  useEffect(()=>{
    if(user)setNewData(user);
    const link = window.location.href.split("/") ;
    const userId = link[link.length-1] ;
    if(user && userL && user._id !== userL._id){
      navigate(`/errors/notauth`);
    }
  },[user,userL])
  return(
    newData && <>
      <form className="user-info-form">
        <div className="form-element">
          <label>Full Name</label>
          <input type="text" value={newData.fullName} onChange={(e)=>setNewData({...newData , fullName: e.target.value})}></input>
        </div>
        <div className="form-element">
          <label>Username</label>
          <input type="text" value={newData.userName} onChange={(e)=>setNewData({...newData , userName: e.target.value})}></input>
        </div>
        <div className="form-element">
          <label>Email Address</label>
          <input type="text" value={newData.email} onChange={(e)=>setNewData({...newData , email: e.target.value})}></input>
        </div>
        <div className="form-element">
          <label>Phone Number</label>
          <input type="text" value={newData.phoneNumber} onChange={(e)=>setNewData({...newData , phoneNumber: e.target.value})}></input>
        </div>
        <div className="form-element">
          <label>Country</label>
          <input type="text" value={newData.country} onChange={(e)=>setNewData({...newData , country: e.target.value})}></input>
        </div>
        <div className="form-element">
          <label>Address</label>
          <input type="text" value={newData.address} onChange={(e)=>setNewData({...newData , address: e.target.value})}></input>
        </div>
        {/* <div className="form-element">
          <label>New Password</label>
          <input id="new-pass" type="passwrod"></input>
        </div>
        <div className="form-element">
          <label>Confirm new Password</label>
          <input type="passwrod" ></input>
        </div> */}
      </form>
      {isLoading?"Loading...":null}
      <div className="user-info-form-buttons">
        <button onClick={handleUpdate} className="save-changes-user-info">Save Changes</button>
        <button onClick={()=>setNewData(user)} className="cancel-changes-user-info">Cancel</button>
      </div>
    </>
  )
}
export default UserInfoFields;