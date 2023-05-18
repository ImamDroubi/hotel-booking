import { useEffect, useState } from "react";
import "./tables.css"
import { TiDelete } from "react-icons/ti";
import useFetch from "../../hooks/useFetch";
import { FaEdit } from "react-icons/fa";
import DeletionPopup from "../DeletionPopup/DeletionPopup";
import UpdateHotelPopup from "../AdminPopups/UpdateHotelPopup";
function HotelsTable({setChanged}) {
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const {data:hotels, loading, error ,reFetch} = useFetch(`${origin}/hotels/`);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletionPopup, setShowDeletionPopup] = useState(false);
  const [PopupHotelId, setPopupHotelId] = useState();
  const handleEditClick = (e) => {
    setPopupHotelId(e.target.id);
    setShowEditPopup(true);
  };
  const handleDeleteClick = (e) => {
    setPopupHotelId(e.target.id);
    setShowDeletionPopup(true);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Address</th>
            <th>Featured</th>
            <th>Control</th>
          </tr>
        </thead>
        
        <tbody>
          {
            hotels.map((hotel,index)=>{
              return(
                <tr key={index+1}>
                  <td>
                    {index+1}
                  </td>
                  <td>
                    {hotel._id}
                  </td>
                  <td>
                    {hotel.name}
                  </td>
                  <td>
                    {hotel.type}
                  </td>
                  <td>
                    {hotel.address}
                  </td>
                  <td>
                    {hotel.featured?"YES":"NO"}
                  </td>
                  <td>
                  <FaEdit
                        onClick={handleEditClick}
                        id={hotel._id}
                        className="edit-table-item"
                      />
                      <TiDelete
                        onClick={handleDeleteClick}
                        id={hotel._id}
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
        <UpdateHotelPopup hotelId={PopupHotelId} setShow={setShowEditPopup} />
      ) : null}
      {showDeletionPopup ? (
        <DeletionPopup
          elementId={PopupHotelId}
          setShow={setShowDeletionPopup}
          message={"Are you sure you want to delete this hotel"}
          deletionUrl = {`hotels`}
        />
      ) : null}
    </>
  );
}
export default HotelsTable;