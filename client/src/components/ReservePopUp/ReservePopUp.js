import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./reservePopUp.css";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
function ReservePopUp(props) {
  const [origin] = useState(process.env.REACT_APP_ROOT_ORIGIN);
  const {
    data: rooms,
    loading,
    error,
    reFetch,
  } = useFetch(`${origin}/hotels/room/${props.hotel._id}`);
  const { dates } = useContext(SearchContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomNumbers, setSelectedRoomNumber] = useState([]);
  const [price, setPrice] = useState(0);
  const handleInputChange = (e) => {
    const isChecked = e.target.checked;
    const val = e.target.value;
    const valNumber = e.target.id;
    const roomPrice = e.target.getAttribute("parentPrice");
    setSelectedRooms(
      isChecked
        ? [...selectedRooms, val]
        : selectedRooms.filter((el) => el !== val)
    );
    setSelectedRoomNumber(
      isChecked
        ? [...selectedRoomNumbers, valNumber]
        : selectedRoomNumbers.filter((el) => el !== valNumber)
    );
    setPrice(
      isChecked
        ? Number(price) + Number(roomPrice)
        : Number(price) + Number(roomPrice)
    );
  };
  const getDatesRange = () => {
    let date1 = dates[0].split("-");
    let date2 = dates[1].split("-");
    let d1 = new Date(date1[0], date1[1] - 1, date1[2]);
    let d2 = new Date(date2[0], date2[1] - 1, date2[2]);
    const date = new Date(d1.getTime());
    let list = [];
    while (date <= d2) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const createReservation = async (data) => {
    try {
      const res = await axios.post(`${origin}/reservations`, data);
      console.log(res);
      props.setShow(false);
    } catch (err) {
      throw err;
    }
  };
  const handleReserveClick = () => {
    const reservationData = {
      userId: props.user._id,
      hotelId: props.hotel._id,
      hotelName: props.hotel.name,
      roomNumbers: selectedRoomNumbers,
      roomNumbersIds: selectedRooms,
      dates: getDatesRange(),
      price: price * props.nights,
    };
    createReservation(reservationData);
  };
  const isAvailableRoom = (roomNumber)=>{
    const list = getDatesRange();
    let isFound= false;
    roomNumber.unavailableDates.map(date=>{
      if(list.includes(new Date(date).getTime())){
        isFound = true;
      }
    })
    return !isFound;
  }
  useEffect(() => {
    if (!rooms) reFetch();
  }, []);
  return (
    <>
      <div className="pop-up-bg">
        <div className="pop-up-container">
          <button
            className="close-pop-up-button"
            onClick={() => props.setShow(false)}
          >
            X
          </button>
          <h2>Select your rooms:</h2>
          <div className="rooms-contianer">
            {rooms &&
              rooms.map((room, index) => {
                return (
                  <div className="pop-up-room-container" key={index}>
                    <div className="pop-up-room-info">
                      <h3>{room.title}</h3>
                      <p>{room.desc}</p>
                      <p className="max-people">Max people: {room.maxPeople}</p>
                      <h4>${room.price}</h4>
                    </div>
                    <div className="pop-up-room-numbers">
                      {room.roomNumbers.map((r, index) => {
                        return (
                          <div className="square-component" key={index}>
                            {/* <p className="room-number">101</p>
                        <div className="square"></div> */}
                            <label className="room-number" htmlFor={r._id}>
                              {r.number}
                            </label>
                            <input
                              className="square"
                              type="checkbox"
                              parentPrice={room.price}
                              id={r.number}
                              value={r._id}
                              onChange={handleInputChange}
                              disabled={!isAvailableRoom(r)}
                            ></input>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
          <button onClick={handleReserveClick} className="pop-up-button">
            Reserve Now!
          </button>
        </div>
      </div>
    </>
  );
}
export default ReservePopUp;
