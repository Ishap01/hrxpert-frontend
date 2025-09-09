// EmployeeNavbar.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeNotifications from './EmployeeNotificationPanel';
import { useAuth } from '../../context/authContext';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.name || 'user';

  return (
    <div className='mt-0 flex items-center text-white h-14 bg-teal-300 px-4 md:px-5 shadow-md mb-0 sticky top-0'>
      {/* Burger menu - visible only on mobile */}
      <button
        className="md:hidden mr-3 text-xl"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      <p className='text-sm md:text-lg font-semibold truncate'>Welcome {username}</p>
      <div className='ml-auto flex items-center gap-2 md:gap-4'>
        <EmployeeNotifications />
        <button
          className='px-2 py-1 md:px-4 md:py-1 bg-teal-500 hover:bg-teal-700 text-xs md:text-sm'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar;
