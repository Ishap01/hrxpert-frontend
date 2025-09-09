import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bell } from 'lucide-react'; 

const EmployeeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [authorized, setAuthorized] = useState(true);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const employeeId = user?.employeeId;
  const role = user?.role;

  useEffect(() => {
    if (role !== 'Employee' || !employeeId) {
      setAuthorized(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/notification/employee/${employeeId}`);
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, [employeeId, role]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!authorized) {
    return <div className="text-red-600 text-center mt-10 font-semibold text-lg">You are not authorized to view this panel.</div>;
  }

 return (
  <div className="relative inline-block text-left w-auto" ref={dropdownRef}>
    {/* Bell Icon */}
    <button
      onClick={() => setOpen((prev) => !prev)}
      className="relative focus:outline-none"
      aria-label="Toggle notifications"
    >
      <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-blue-600 transition-colors" />
      {notifications.length > 0 && (
        <span className="absolute -top-1 -right-1 sm:top-0 sm:right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-xs font-bold leading-none text-white bg-red-600 rounded-full transform sm:translate-x-1/2 sm:-translate-y-1/2">
          {notifications.length}
        </span>
      )}
    </button>

    {/* Dropdown */}
    {open && (
      <div className="origin-top-right absolute right-0 mt-2 w-72 sm:w-80 max-h-96 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 text-sm sm:text-base">
        {/* Header */}
        <div className="py-2 px-4 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Notifications
          </h2>
        </div>

        {/* Notification List */}
        {notifications.length === 0 ? (
          <div className="p-4 text-gray-600 text-sm text-center">
            No notifications found.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map((note) => (
              <li key={note._id} className="p-3 hover:bg-gray-50 transition text-gray-800">
                <p className="text-sm">{note.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>
);

};

export default EmployeeNotifications;
