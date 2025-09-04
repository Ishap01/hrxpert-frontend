import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell } from 'lucide-react'; // you can also use other icons
import { format } from 'date-fns';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notification/admin/get');
        setNotifications(res.data.notifications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="relative ml-auto">
      {/* Bell icon with badge */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded hover:bg-teal-200"
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
            {notifications.length}
          </span>
        )}
      </button>

     
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 overflow-hidden max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No notifications</p>
          ) : (
            notifications.map((note, index) => (
              <div key={index} className="px-4 py-2 border-b hover:bg-gray-100">
                <p className="text-gray-800 text-sm">{note.message}</p>
                <p className="text-gray-500 text-xs">
                  {format(new Date(note.createdAt), 'PPPppp')}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
