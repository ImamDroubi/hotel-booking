import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function LogedItems({ items }) {
  const navigate = useNavigate();
  const { user , dispatch } = useContext(AuthContext);
  return (
    <>
      {items.map((item, index) => {
        return (
          <li className="user-navigation-item" key={index}>
            <a
              onClick={
                item === "Logout"
                  ? () => dispatch({type:"LOGOUT"})
                  : item === "Admin Panel" 
                  ? ()=> navigate(`/admin/hotels`)
                  :() => navigate(`/user/${user._id}`)
              }
            >
              {item}
            </a>
          </li>
        );
      })}
    </>
  );
}
export default LogedItems;
