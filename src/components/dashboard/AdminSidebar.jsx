import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaClipboardList,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = ({ closeSidebar }) => {
  return (
    <div className="flex flex-col bg-gray-800 text-white h-screen w-64">
      {/* Header */}
      <div className="bg-teal-400 h-12 flex items-center justify-between px-4">
        <h3 className="text-2xl font-bold">HRXpert</h3>

        {/* Close button (mobile only) */}
        {closeSidebar && (
          <button
            className="md:hidden text-white hover:text-gray-200 transition-colors duration-200"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <FaTimes size={20} />
          </button>
        )}
      </div>

      {/* Navigation links */}
      <nav className="mt-2 space-y-1">
        <NavLink
          to="/admin-dashboard"
          end
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded transition-colors ${
              isActive ? "bg-teal-300 text-gray-900" : "hover:bg-gray-700"
            }`
          }
          onClick={() => closeSidebar && closeSidebar()}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded transition-colors ${
              isActive ? "bg-teal-300 text-gray-900" : "hover:bg-gray-700"
            }`
          }
          onClick={() => closeSidebar && closeSidebar()}
        >
          <FaUser />
          <span>Employee</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/department"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded transition-colors ${
              isActive ? "bg-teal-300 text-gray-900" : "hover:bg-gray-700"
            }`
          }
          onClick={() => closeSidebar && closeSidebar()}
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded transition-colors ${
              isActive ? "bg-teal-300 text-gray-900" : "hover:bg-gray-700"
            }`
          }
          onClick={() => closeSidebar && closeSidebar()}
        >
          <FaClipboardList />
          <span>Leave</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/attendance"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded transition-colors ${
              isActive ? "bg-teal-300 text-gray-900" : "hover:bg-gray-700"
            }`
          }
          onClick={() => closeSidebar && closeSidebar()}
        >
          <FaCalendarAlt />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/salary"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded transition-colors ${
              isActive ? "bg-teal-300 text-gray-900" : "hover:bg-gray-700"
            }`
          }
          onClick={() => closeSidebar && closeSidebar()}
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
