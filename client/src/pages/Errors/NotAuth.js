import { useNavigate } from "react-router-dom";
import "./notAuth.css";
function NotAuth(){
  const navigate = useNavigate();
  return(
    <>
      <div className="not-auth-page">
        <h1>You are not Authurized to view this page!</h1>
        <button onClick={()=> navigate("/")}>Back Home</button>
      </div>
    </>
  );
}
export default NotAuth;