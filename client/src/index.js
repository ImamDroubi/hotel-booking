import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Register from "./pages/RegisterPage/Register";
import Home from "./pages/HomePage/Home";
import Login from './pages/LoginPage/Login';
import App from './App';
import AdminUsers from './adminPages/AdminUsers/AdminUsers';
import AdminHotels from './adminPages/AdminHotels/AdminHotels';
import AdminRooms from './adminPages/AdminRooms/AdminRooms';
import Search from './pages/SearchPage/Search';
import HotelInfo from './pages/HotelnfoPage/HotelInfo';
import UserInfo from './pages/UserPage/UserInfo';
import { SearchContextProvider } from './context/SearchContext';
import { AuthContextProvider } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

