import './App.css';
import { Routes , Route } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Register from './pages/RegisterPage/Register';
import Login from './pages/LoginPage/Login';
import AdminUsers from './adminPages/AdminUsers/AdminUsers';
import AdminHotels from './adminPages/AdminHotels/AdminHotels';
import AdminRooms from './adminPages/AdminRooms/AdminRooms';
import Search from './pages/SearchPage/Search';
import HotelInfo from './pages/HotelnfoPage/HotelInfo';
import UserInfo from './pages/UserPage/UserInfo';
import NotAuth from './pages/Errors/NotAuth';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/search' element={<Search/>}></Route>
      <Route path='/hotel/:id' element={<HotelInfo/>}></Route>
      <Route path ='/user/:id' element={<UserInfo/>}></Route>
      <Route path='/admin/Users' element={<AdminUsers/>}></Route>
      <Route path='/admin/Hotels' element={<AdminHotels/>}></Route>
      <Route path='/admin/Rooms' element={<AdminRooms/>}></Route>
      <Route path='/errors/notauth' element={<NotAuth/>}></Route>
      
    </Routes>
  );
}

export default App;
