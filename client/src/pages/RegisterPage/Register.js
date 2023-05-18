import Logo from "../../components/Logo/Logo";
import SignupForm from "../../components/SignupForm/SignupForm";
import "./register.css"
function Register(){
  return(
    <>
    <div className="page">
      <img className="background" alt="background" src={require("../../assets/background.jpg")}/>
      <div className="container">
        <div className="top">
          <Logo />
        </div>
        <div className="main">
          <SignupForm />
        </div>
      </div>
    </div>
    </>
  )
};
export default Register;