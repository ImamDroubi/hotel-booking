import { Link } from "react-router-dom";
import "./sideNav.css";
function SideNavAdmin({selected}) {
  const links = ["Users" , "Hotels" , "Rooms"];
  return (
    <>
      <ul className="admin-side-nav">
        {
          links.map((item,index)=>{
            return <li key={index} className={item == selected ? "side-nav-item selected" : "side-nav-item"}><Link to={`/admin/${item}`}>{item}</Link></li>
          })
        }
      </ul>
    </>
  );
}
export default SideNavAdmin;
