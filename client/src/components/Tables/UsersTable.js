import { useEffect, useState } from "react";
import "./tables.css";
import { TiDelete } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import UpdateUserPopup from "../AdminPopups/UpdateUserPopup";
import useFetch from "../../hooks/useFetch";
import DeletionPopup from "../DeletionPopup/DeletionPopup";
function UsersTable({ setChanged }) {
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const { data: users, loading, error } = useFetch(`${origin}/users/`);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletionPopup, setShowDeletionPopup] = useState(false);
  const [PopupUserId, setPopupUserId] = useState();
  const handleEditClick = (e) => {
    setPopupUserId(e.target.id);
    setShowEditPopup(true);
  };
  const handleDeleteClick = (e) => {
    setPopupUserId(e.target.id);
    setShowDeletionPopup(true);
  };

  // function handleInput(index){
  //   setChanged(true);
  //   if(changedUsers.indexOf(index) === -1){
  //     setChangedUsers([...changedUsers , index]);
  //   }
  // }
  // function handleChangedInput(event,attr, index){
  //   let cUser = users.at(index);
  //   cUser[attr] = attr === "isAdmin" ? event.target.value === "admin" ? true : false  : event.target.value ;
  //   setUsers(users.map((user,indx)=>{
  //     if(indx == index)user = cUser;
  //     return user;
  //   }))
  // }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Control</th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? null
            : users.map((user, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      <FaEdit
                        onClick={handleEditClick}
                        id={user._id}
                        className="edit-table-item"
                      />
                      <TiDelete
                        onClick={handleDeleteClick}
                        id={user._id}
                        className="delete-table-item"
                      />
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {showEditPopup ? (
        <UpdateUserPopup userId={PopupUserId} setShow={setShowEditPopup} />
      ) : null}
      {showDeletionPopup ? (
        <DeletionPopup
          elementId={PopupUserId}
          setShow={setShowDeletionPopup}
          message={"Are you sure you want to delete this user"}
          deletionUrl = {`users`}
        />
      ) : null}
    </>
  );
}
export default UsersTable;
