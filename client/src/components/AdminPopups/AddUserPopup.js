import { useEffect, useState } from "react";
import "./adminPopups.css";
import axios from "axios";
function AddUserPopup({ setShow }) {
  const [userData, setUserData] = useState({});
  const [showErr , setShowErr] = useState(false);
  const [errMessage, setErrMessage] = useState("Something is wrong, please check your information...");
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const handleAdding = async()=>{
    try{
      let res = await axios.post(`${origin}/auth/register` , userData, {withCredentials : true})
      setShow(false);
    }catch(err){
      setErrMessage(err.response.message);
      setShowErr(true);
    }
  }
  const handleSubmitting = ()=>{
    if(!userData.email || !userData.password || !userData.repeatPasswrod || !userData.fullName || !userData.phoneNumber || !userData.address || !userData.country || !userData.userName){
      setShowErr(true);
      return;
    }
    if(userData.password != userData.repeatPasswrod){
      setShowErr(true);
      return;
    }
    handleAdding();

  }
  useEffect(()=>{
    setShowErr(false);
  },[userData])
  return (
    <>
      <div className="pop-up-bg">
        <div className="pop-up-container">
          <button
            className="close-pop-up-button"
            onClick={() => setShow(false)}
          >
            X
          </button>
          <h2>Add new user:</h2>
          <div className="popup-form-container">
            <form className="popup-form">
              <label>Full Name:</label>
              <input
                className="popup-form-input"
                id="fullName"
                placeholder="Full Name..."
                onChange={(e) =>
                  setUserData({ ...userData, fullName: e.target.value })
                }
              ></input>
              <label>Username:</label>
              <input
                className="popup-form-input"
                id="userName"
                placeholder="Username..."
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
              ></input>
              <label>Email Address:</label>
              <input
                className="popup-form-input"
                id="email"
                placeholder="Email Address..."
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              ></input>
              <label>Phone number:</label>
              <input
                className="popup-form-input"
                id="phoneNumber"
                placeholder="Phone Number..."
                onChange={(e) =>
                  setUserData({ ...userData, phoneNumber: e.target.value })
                }
              ></input>
              <label>Password:</label>
              <input
                className="popup-form-input"
                id="password"
                placeholder="Password..."
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              ></input>
              <label>Repeat Password:</label>
              <input
                className="popup-form-input"
                id="repeatPasswrod"
                placeholder="Confirm Passwrod..."
                onChange={(e) =>
                  setUserData({ ...userData, repeatPasswrod: e.target.value })
                }
              ></input>
              <label>Country:</label>
              <input
                className="popup-form-input"
                id="country"
                placeholder="Country..."
                onChange={(e) =>
                  setUserData({ ...userData, country: e.target.value })
                }
              ></input>
              <label>Address:</label>
              <input
                className="popup-form-input"
                id="address"
                placeholder="Address..."
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
              ></input>
              {showErr? <p>{errMessage}</p> : null}
            </form>
          </div>
          <button onClick={handleSubmitting} className="pop-up-button">Add user</button>
        </div>
      </div>
    </>
  );
}
export default AddUserPopup;
