import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./adminPopups.css";
import axios from "axios";
function UpdateUserPopup({ setShow, userId }) {
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const { data: user, loading, error, reFetch } = useFetch(`${origin}/users/user/${userId}`);
  const [userData, setUserData] = useState();
  const updateData = async()=>{
    try{
      const res = await axios.put(`${origin}/users/${userId}`, userData, {withCredentials : true});
      setShow(false);
    }catch(err){
      throw err;
    }
  }
  const handleUpdate = ()=>{
    updateData();
  }
  useEffect(() => {
    setUserData(user);
  }, [user]);
  return (
    user && <>
      <div className="pop-up-bg">
        <div className="pop-up-container">
          <button
            className="close-pop-up-button"
            onClick={() => setShow(false)}
          >
            X
          </button>
          <h2>Update user:</h2>
          <div className="popup-form-container">
            {userData &&  (
              <form className="popup-form">
                <label>Full Name:</label>
                <input
                  className="popup-form-input"
                  id="fullName"
                  value={userData.fullName}
                  onChange={(e)=> setUserData({...userData , fullName : e.target.value})}
                ></input>
                <label>Username:</label>
                <input
                  className="popup-form-input"
                  id="userName"
                  value={userData.userName}
                  onChange={(e)=> setUserData({...userData , userName : e.target.value})}
                ></input>
                <label>Email Address:</label>
                <input
                  className="popup-form-input"
                  id="email"
                  value={userData.email}
                  onChange={(e)=> setUserData({...userData , email : e.target.value})}
                ></input>
                <label>Phone number:</label>
                <input
                  className="popup-form-input"
                  id="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={(e)=> setUserData({...userData , phoneNumber : e.target.value})}
                ></input>
                <label>Country:</label>
                <input
                  className="popup-form-input"
                  id="country"
                  value={userData.country}
                  onChange={(e)=> setUserData({...userData , country : e.target.value})}
                ></input>
                <label>Address:</label>
                <input
                  className="popup-form-input"
                  id="address"
                  value={userData.address}
                  onChange={(e)=> setUserData({...userData , address : e.target.value})}
                ></input>
              </form>
            )}
          </div>
          <button className="pop-up-button" onClick={handleUpdate}>Update user</button>
        </div>
      </div>
    </>
  );
}
export default UpdateUserPopup;
