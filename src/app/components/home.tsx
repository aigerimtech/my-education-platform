import React, { useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

type HomePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HomePopup = ({ isOpen, onClose }: HomePopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  useClickOutside(popupRef, onClose); // Close on click outside

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center z-50 pt-24">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg w-4/5 sm:w-3/5 lg:w-1/3 text-black"
      >
        <h2 className="text-2xl font-bold mb-4">Welcome to Our Online Education Platform</h2>
        <p className="mb-4">
          Unlock your potential with high-quality courses in Math, Physics, IT, AI, and more. 
          Our platform offers interactive lessons, expert instructors, and an engaging learning experience 
          that caters to your needs.
        </p>
        <p className="mb-4">
          Whether you're looking to master complex mathematical equations, dive into the world of quantum mechanics, 
          or learn cutting-edge AI technologies, we have the right course for you.
        </p>
        <p className="font-semibold text-lg">Get started with a free course today and take your skills to the next level!</p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose} // Close on button click
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePopup;
