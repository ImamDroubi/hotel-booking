import { Link, useNavigate } from "react-router-dom";
import "./signinForm.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
function SigninForm() {
  const [userData , setUserData] = useState();
  const {user,loading,error, dispatch} = useContext(AuthContext);
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const naviagte = useNavigate();
  const handleChange = (e)=>{
    setUserData(prev=>({...prev , [e.target.id] : e.target.value}));
  }
  const handleClick = async(e)=>{
    e.preventDefault();
    dispatch({type : "LOGIN_START"});
    try{
      const res = await axios.post(`${origin}/auth/login` , userData, {withCredentials : true});
      dispatch({type : "LOGIN_SUCCESS" , payload : res.data});
      naviagte("/");
      
    }catch(err){
      dispatch({type: "LOGIN_FAILURE" , payload : err.response.data})
    }
  };
  return (
    <div className="form-container login-form-contianer">
      <h3 className="form-title">Sign In</h3>
      <form className="main-form login-form">
        <input
          className="main-form-input login-input"
          id="email"
          placeholder="Email Address..."
          required
          onChange={(e)=>handleChange(e)}
        ></input>
        <input
          className="main-form-input login-input"
          type="password"
          id="password"
          placeholder="Password..."
          required
          onChange={(e)=>handleChange(e)}
        ></input>
      </form>
      <button className="main-button" onClick={(e)=>handleClick(e)}>Login</button>
      {error && <p className="form-error">{error.message}</p>}
      <p className="form-tail">
        Don't you have an account?{" "}
        <span className="tail-link">
          <Link to="/register">Sign Up!</Link>
        </span>
      </p>
    </div> 
  );
}

export default SigninForm;
