import { AiOutlineClose } from "react-icons/ai";
import Logo from "../Logo/Logo";
import SideNavAdmin from "./SideNavAdmin";
import "./humburger.css";
function HumburgerAdmin({menuShown,closeHumMenue,selected}){
  return(
    <>
        {menuShown && 
        <>
        <AiOutlineClose className="close-humburger" onClick={()=>closeHumMenue()}/>
        <Logo/>
        <SideNavAdmin selected={selected}/>
        </>
        }
        


    </>
  );
}
export default HumburgerAdmin;