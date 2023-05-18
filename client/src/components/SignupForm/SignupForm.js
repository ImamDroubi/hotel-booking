import { Link, useNavigate } from "react-router-dom";
import "./signupForm.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
function SignupForm(){
  const {user,dispatch} = useContext(AuthContext);
  const [userData , setUserData] = useState({});
  const [passwords, setPasswrods] = useState({});
  const [errMessage , setErrMessage] = useState("Something is wrong, please check your data");
  const [showErr , setShowErr] = useState(false);
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const naviagte = useNavigate();

  const createUser = async ()=>{
    try{
      const res = await axios.post(`${origin}/auth/register` , userData, {withCredentials : true});
      dispatch({type : "LOGIN_START"});
        try{
          const loginData = {"email" : userData.email , "password" : userData.password} 
          const res2 = await axios.post(`${origin}/auth/login` , loginData);
          dispatch({type : "LOGIN_SUCCESS" , payload : res2.data});
          naviagte("/");
          
        }catch(err){
          dispatch({type: "LOGIN_FAILURE" , payload : err.response.data})
        }
    }catch(err){
      setErrMessage(err.response.data)
      setShowErr(true);
    }
  }
  const handleSubmit = ()=>{
    if(!userData || !userData.fullName || !userData.userName || !userData.email || !userData.address || !userData.phoneNumber || !userData.country){
      setErrMessage("Please fill all fields!")
      setShowErr(true);
      return ;
    }
    if(!passwords.password || !passwords.password2 || passwords.password !== passwords.password2){
      setErrMessage("Passwords must match!");
      setShowErr(true);
      return;
    }
    setUserData({...userData , password : passwords.password});
    createUser();
  }
  useEffect(()=>{
    if(user)naviagte(`/`);
    setShowErr(false);
  },[userData])
  return(
    <div className="form-container">
      <h3 className="form-title">Sign Up</h3>
      <form className="main-form">
        <input className="main-form-input" placeholder="Full Name..." onChange={(e)=> setUserData({...userData , fullName : e.target.value})} ></input>
        <input className="main-form-input" placeholder="Username..." onChange={(e)=> setUserData({...userData , userName : e.target.value})} ></input>
        <input className="main-form-input" type="email" placeholder="Email Address..." onChange={(e)=> setUserData({...userData , email : e.target.value})} ></input>
        <input className="main-form-input" placeholder="Phone Number..." onChange={(e)=> setUserData({...userData , phoneNumber : e.target.value})} ></input>
        <input className="main-form-input" type="password" placeholder="Password..." onChange={(e)=> setPasswrods({...passwords , password : e.target.value})} ></input>
        <input className="main-form-input" type="password" placeholder="Confirm Passwrod..." onChange={(e)=> setPasswrods({...passwords , password2 : e.target.value})} ></input>
        <input className="main-form-input" placeholder="Country..." onChange={(e)=> setUserData({...userData , country : e.target.value})} ></input>
        <input className="main-form-input" placeholder="Address..." onChange={(e)=> setUserData({...userData , address : e.target.value})} ></input>
      </form>
      {showErr?<p className="form-error">{errMessage}</p> : null}
      <button onClick={handleSubmit} className="main-button">Register</button>
      <p className="form-tail">Already have an account? <span className="tail-link"><Link to='/login'>Sign in!</Link></span></p>
    </div>
  )
}

export default SignupForm;