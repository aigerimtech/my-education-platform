import React, { useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

type AboutPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AboutPopup = ({ isOpen, onClose }: AboutPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  useClickOutside(popupRef, onClose); // Close on click outside

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center z-50 pt-36">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg w-4/5 sm:w-3/5 lg:w-1/3 text-black"
      >
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="mb-4">
          Our mission is to provide accessible, high-quality education to learners around the world. 
          We believe that education is the key to success, and we strive to make learning affordable, engaging, and effective. 
          Our platform features a range of courses taught by experienced instructors with a passion for teaching.
        </p>
        <p className="font-semibold text-lg">Join us today and start your learning journey with us!</p>
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

export default AboutPopup;
