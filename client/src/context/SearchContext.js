import { useEffect, useReducer } from "react";
import { createContext } from "react";

const getDate = (x)=>{
  let str = x.toLocaleDateString();
  let lst = str.split('/');
  str = `${lst[2]}-${lst[0]}-${lst[1]}`
  return str;
}
const INITIAL_STATE = {
  city : undefined,
  dates : localStorage.getItem("dates")?localStorage.getItem("dates").split(",") : [getDate(new Date()),getDate(new Date())],
  options:{
    people: undefined,
    room : undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action)=>{
  switch(action.type){
    case  "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({children}) =>{
  const [state,dispatch] = useReducer(SearchReducer,INITIAL_STATE);
  useEffect(()=>{
    localStorage.setItem("dates" , state.dates);
  },[state.dates])
  return(
    <SearchContext.Provider value={{city : state.city , dates : state.dates , options : state.options, dispatch,} }>
      {children}
    </SearchContext.Provider>
  )
}