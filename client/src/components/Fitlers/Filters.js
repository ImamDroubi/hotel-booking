import { useContext, useEffect, useState } from "react";
import "./filters.css"
import { SearchContext } from "../../context/SearchContext";
function Filters({filters ,setFilters,reFetch}){
  const {city , dates, options , dispatch}= useContext(SearchContext);
  const handleSearch = ()=>{
    console.log(filters.checkIn);
    dispatch({type : "NEW_SEARCH", payload: {
      city : filters.city,
      dates : [
        filters.checkIn,
        filters.checkOut
      ],
      options :{
        people: filters.persons
      }
    }});
    reFetch();
  }
  useEffect(()=>{
    
  },)
  return(
    <>
      <div className="filters-container">
        <h3 className="filters-title">Filters:</h3>

        <div className="filters-input">
          <p>City:</p>
          <input type="text" placeholder="London" onChange={(e)=> setFilters({...filters, city:e.target.value})}></input>
        </div>
        <div className="filters-input">
          <p>Check in:</p>
          <input type="date" value={filters.checkIn} onChange={(e)=> setFilters({...filters, checkIn:e.target.value})}></input>
        </div>
        <div className="filters-input">
          <p>Check out:</p>
          <input type="date" value={filters.checkOut} onChange={(e)=> setFilters({...filters, checkOut:e.target.value})}></input>
        </div>
        <div className="filters-input">
          <p>Persons:</p>
          <input type="number" placeholder="2" onChange={(e)=> setFilters({...filters, persons:e.target.value})}></input>
        </div>
        <div className="filters-input">
          <p>Min Price:</p>
          <input type="number" placeholder="100" onChange={(e)=> setFilters({...filters, minPrice:e.target.value})}></input>
        </div>
        <div className="filters-input">
          <p>Max Price:</p>
          <input type="number" placeholder="200" onChange={(e)=> setFilters({...filters, maxPrice:e.target.value})}></input>
        </div>
      <button className="search-button" onClick={handleSearch}>Saerch</button>
      </div>
    </>
  );
}
export default Filters;