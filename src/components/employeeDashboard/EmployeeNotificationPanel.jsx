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
        const res = await axios.get(`http://localhost:5000/api/notification/employee/${employeeId}`);
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative focus:outline-none"
      >
        <Bell className="h-6 w-6 text-gray-700 hover:text-blue-600" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2 px-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          </div>
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-600 text-sm">No notifications found.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notifications.map((note) => (
                <li key={note._id} className="p-3 hover:bg-gray-50 transition">
                  <p className="text-sm text-gray-800">{note.message}</p>
                  {/* <p className="text-xs text-gray-500 mt-1 text-right">{new Date(note.timestamp).toLocaleString()}</p> */}
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
