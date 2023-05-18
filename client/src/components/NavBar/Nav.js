import NavItems from "./NavItems";
import "./navbar.css"
function Nav({items,setLogged}){
  return(
    <>
    <nav className="nav">
      <NavItems setLogged={setLogged} items = {items} />
    </nav>
    </>
  )
};
export default Nav;