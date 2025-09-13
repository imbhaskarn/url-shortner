import React from 'react';
import { Bell, CheckCircle } from 'lucide-react';

const NotificationsComponent = ({ notifications, markAsRead }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-indigo-600 px-4 py-2 flex items-center justify-between">
        <h2 className="text-white text-lg font-semibold">Notifications</h2>
        <Bell className="text-white" size={20} />
      </div>

      
      <div className="divide-y divide-gray-200">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <small className="text-xs text-gray-500">{new Date(notification.created_at).toLocaleString()}</small>
                </div>
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="ml-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out"
                >
                  <CheckCircle size={16} className="mr-1" />
                  Mark as read
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-sm text-gray-500">No new notifications.</p>
        )}
      </div>
      
    </div>
  );
};

export default NotificationsComponent;