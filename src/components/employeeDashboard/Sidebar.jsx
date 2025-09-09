// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaClipboardList,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaTimes,
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id || '';

  return (
    <>
      {/* Dark overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Header with back button for mobile */}
        <div className="bg-teal-400 h-12 flex items-center justify-between px-4">
          <h3 className="text-xl md:text-2xl font-pecific">HRXpert</h3>
          <button
            className="md:hidden text-white text-xl"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col mt-2 space-y-1">
          <NavLink
            to="/employee-dashboard"
            end
            className={({ isActive }) =>
              `${isActive ? 'bg-teal-300' : ''} flex items-center space-x-3 py-2.5 px-4 rounded`
            }
            onClick={toggleSidebar}
          >
            <FaTachometerAlt />
            <span className="text-sm md:text-base">Dashboard</span>
          </NavLink>

          <NavLink
            to={`/employee-dashboard/myprofile/${userId}`}
            className={({ isActive }) =>
              `${isActive ? 'bg-teal-300' : ''} flex items-center space-x-3 py-2.5 px-4 rounded`
            }
            onClick={toggleSidebar}
          >
            <FaUser />
            <span className="text-sm md:text-base">My Profile</span>
          </NavLink>

          <NavLink
            to={`/employee-dashboard/leaves/${user._id}`}
            className={({ isActive }) =>
              `${isActive ? 'bg-teal-300' : ''} flex items-center space-x-3 py-2.5 px-4 rounded`
            }
            onClick={toggleSidebar}
          >
            <FaClipboardList />
            <span className="text-sm md:text-base">Leave</span>
          </NavLink>

          <NavLink
            to="/employee-dashboard/payslip"
            className={({ isActive }) =>
              `${isActive ? 'bg-teal-300' : ''} flex items-center space-x-3 py-2.5 px-4 rounded`
            }
            onClick={toggleSidebar}
          >
            <FaMoneyBillWave />
            <span className="text-sm md:text-base">PayslipDownload</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
