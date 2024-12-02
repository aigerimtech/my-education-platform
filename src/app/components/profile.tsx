import React from 'react';
import { useStore } from '../store/useStore';

type ProfilePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const ProfilePopup = ({ isOpen, onClose, onLogout}:ProfilePopupProps) => {
  const user = useStore((state) => state.user);

  if (!isOpen ||!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl text-black font-bold mb-4">Profile Info</h2>
        <p className="text-black">
          <strong>Full Name:</strong> {user.name}
        </p>
        <p className="text-black">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-black">
          <strong>Balance:</strong> ${user.balance.toFixed(2)}
        </p>
        <p className="text-black">
          <strong>Enrolled Courses:</strong> {user.enrolledCourses.length > 0
            ? user.enrolledCourses.join(', ')
            : 'None'}
        </p>

        <div className="mt-4 flex gap-4">
          <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Log Out
          </button>
        </div>

        <button onClick={onClose} className="absolute top-2 right-2 text-black hover:text-black">
          ✕
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;