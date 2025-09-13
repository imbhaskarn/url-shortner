import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react'; // Assuming you're using lucide-react for icons

const Piplinetoggle = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {userRole === 'solo' && (
        <div className="relative group">
          <MoreVertical
            className="cursor-pointer"
            size={16}
            onClick={toggleDropdown} // Toggle dropdown on click
          />
          {isOpen && ( // Render dropdown based on isOpen state
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white">
              <button
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Edit Deal
              </button>
              <button
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Reassign Deal
              </button>
              <button
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
              >
                Delete Deal
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Piplinetoggle;
