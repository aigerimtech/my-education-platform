import React, { useRef } from 'react';
import { useStore } from '../store/useStore';
import { useClickOutside } from '../hooks/useClickOutside';

type ProfilePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const ProfilePopup = ({ isOpen, onClose, onLogout}:ProfilePopupProps) => {
  const { user, getBonusBalance } = useStore((state) => ({
    user: state.user,
    getBonusBalance: state.getBonusBalance,
  }));

  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutside(popupRef, onClose);

  if (!isOpen ||!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg w-80 relative text-black"
      >
        <h2 className="text-xl font-bold mb-4">Profile Info</h2>
        <p>
          <strong>Full Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Balance:</strong> ${user.balance.toFixed(2)}
        </p>
        <p>
          <strong>Enrolled Courses:</strong>{' '}
          {user.enrolledCourses.length > 0
            ? user.enrolledCourses.join(', ')
            : 'None'}
        </p>

        {/* //Conditional rendering for "Get $100" button
        {user.balance === 0 && (
          <button
            onClick={getBonusBalance}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Get $100
          </button>
        )} */}

        <div className="mt-4 flex gap-4">
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Log Out
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;