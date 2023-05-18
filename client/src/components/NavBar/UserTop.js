import LoogedItems from "./LoggedItems";
function UserTop({items}){
  return(
    <>
    <nav className="logged-nav">
      <LoogedItems items = {items} />
    </nav>
    </>
  )
};
export default UserTop;