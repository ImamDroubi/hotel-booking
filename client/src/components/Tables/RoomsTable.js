import { useEffect, useState } from "react";
import "./tables.css"
import { TiDelete } from "react-icons/ti";
import useFetch from "../../hooks/useFetch";
import DeletionPopup from "../DeletionPopup/DeletionPopup";
import { FaEdit } from "react-icons/fa";
import UpdateRoomPopup from "../AdminPopups/UpdateRoomPopup";
function RoomsTable({setChanged}) {
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const { data: rooms, loading, error } = useFetch(`${origin}/rooms`);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletionPopup, setShowDeletionPopup] = useState(false);
  const [PopupRoomId, setPopupRoomId] = useState();
  const [PopupHotelId, setPopupHotelId] = useState();
  const handleEditClick = (e,hotelId) => {
    setPopupRoomId(e.target.id);
    setPopupHotelId(hotelId);
    setShowEditPopup(true);
  };
  const handleDeleteClick = (e,hotelId) => {
    setPopupRoomId(e.target.id);
    setPopupHotelId(hotelId);
    setShowDeletionPopup(true);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Hotel ID</th>
            <th>Title</th>
            <th>MaxPeople</th>
            <th>Price</th>
            <th>Control</th>
          </tr>
        </thead>
        
        <tbody>
          {
            rooms.map((room,index)=>{
              return(
                <tr key={index+1}>
                  <td>
                    {index+1}
                  </td>
                  <td>
                    {room._id}
                  </td>
                  <td>
                    {room.hotelId}
                  </td>
                  <td>
                    {room.title}
                  </td>
                  <td>
                    {room.maxPeople}
                  </td>
                  <td>
                    {room.price}
                  </td>
                  <td>
                  <FaEdit
                        onClick={(e)=>handleEditClick(e,room.hotelId)}
                        id={room._id}
                        className="edit-table-item"
                      />
                      <TiDelete
                        onClick={(e)=> handleDeleteClick(e,room.hotelId)}
                        id={room._id}
                        className="delete-table-item"
                      />
                  </td>
                </tr>
              )
            })
          }
          
        </tbody>
      </table>
      {showEditPopup ? (
        <UpdateRoomPopup roomId={PopupRoomId} setShow={setShowEditPopup} />
      ) : null}
      {showDeletionPopup ? (
        <DeletionPopup
          elementId={PopupRoomId}
          hotelId = {PopupHotelId}
          setShow={setShowDeletionPopup}
          message={"Are you sure you want to delete this room"}
          deletionUrl = {`rooms`}
        />
      ) : null}
    </>
  );
}
export default RoomsTable;