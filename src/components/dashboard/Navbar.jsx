import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationPanel from './NotificationPanel';
import { useAuth } from '../../context/authContext';
import { FaBars, FaSignOutAlt, FaBell } from 'react-icons/fa'; // Added FaSignOutAlt for logout icon

const Navbar = ({ onMenuClick }) => {
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
    <div className="sticky top-0 z-20 bg-teal-300 text-white shadow-md">
      <div className="h-14 px-3 md:px-5 flex items-center gap-3 flex-wrap">
        {/* Burger menu */}
        <button
          className="md:hidden mr-1 text-white"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          type="button"
        >
          <FaBars size={20} />
        </button>

        <p className="text-base sm:text-lg font-semibold truncate max-w-[55%] sm:max-w-none">
          Welcome {username}
        </p>

        {/* Desktop Actions */}
        <div className="ml-auto hidden md:flex items-center gap-4">
          <NotificationPanel />
          <button
            className="px-4 py-1 bg-teal-500 hover:bg-teal-700 rounded whitespace-nowrap"
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="ml-auto flex md:hidden items-center gap-4">
          {/* Mobile notification button */}
          <NotificationPanel />

          {/* Mobile logout icon button */}
          <button
            className="text-white"
            onClick={handleLogout}
            aria-label="Logout"
            type="button"
          >
            <FaSignOutAlt size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;