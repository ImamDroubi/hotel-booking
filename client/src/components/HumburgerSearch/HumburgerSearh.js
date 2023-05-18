import { AiOutlineClose } from "react-icons/ai";
import Logo from "../Logo/Logo";
import "../SideNavAdmin/humburger.css"
import Filters from "../Fitlers/Filters";
function HumburgerSearch({menuShown,closeHumMenue,setFilters,filters,reFetch}){
  return(
    <>
        {menuShown && 
          <>
          <AiOutlineClose className="close-humburger" onClick={()=>closeHumMenue()}/>
          <Logo/>
          <Filters reFetch = {reFetch} filters = {filters} setFilters={setFilters}/>
          </>
        }

    </>
  );
}
export default HumburgerSearch;