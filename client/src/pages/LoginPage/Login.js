import { useContext, useEffect } from "react";
import Logo from "../../components/Logo/Logo";
import SigninForm from "../../components/SigninForm/SigninForm";
import "./login.css"
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Login(){
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user)navigate("/");
  },[user])
  return(
    <>
    <div className="page">
      <img className="background" alt="background" src={require("../../assets/background.jpg")}/>
      <div className="container">
        <div className="top">
          <Logo />
        </div>
        <div className="main">
          <SigninForm />
        </div>
      </div>
    </div>
    </>
  )
};
export default Login;