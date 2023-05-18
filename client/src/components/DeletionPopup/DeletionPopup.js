import axios from "axios";
import "./deletionPopup.css";
import { useState } from "react";
function DeletionPopup(props){
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const deleteItem = async (url)=>{
    try{
      let res ;
      if(props.hotelId){
        res = await axios.delete(`${origin}/${url}/${props.elementId}/${props.hotelId}`, {withCredentials : true});
      }else{
        res = await axios.delete(`${origin}/${url}/${props.elementId}`, {withCredentials : true});
      }
      props.setShow(false);
    }catch(err){
      throw (err);
    }
  }
  console.log(props.elementId);
  const handleDeleteClick = ()=>{
    deleteItem(props.deletionUrl);
  }
  return(
    <>
      <div className="pop-up-bg">
        <div className="deletion-pop-up-container">
          <button className="close-deletion-pop-up-button" onClick={()=> props.setShow(false)}>X</button>
            <p>{props.message}</p>
            <div className="deletion-popup-buttons">
          <button onClick={handleDeleteClick} className="deletion-confirm-button">
              Delete
            </button>
            <button onClick={()=> props.setShow(false)} className="deletion-cancel-button">
              Cancel
            </button>
          </div>
        </div>
        
      </div>
    </>
  )
}
export default DeletionPopup;