import { Link } from "react-router-dom";

function NavItems({items,setLogged}){
  return(
    <>
      {
        items.map((item, index)=>{
          return <li key={index}><Link to={`/${item}`}>{item}</Link></li>
        })
      }
    </>
  )
};
export default NavItems;