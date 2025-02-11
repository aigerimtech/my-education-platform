import React, { useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

type ContactPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContactPopup = ({ isOpen, onClose }: ContactPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  useClickOutside(popupRef, onClose); // Close on click outside

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center z-50 pt-40 ">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg w-4/5 sm:w-3/5 lg:w-1/3 text-black"
      >
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions or need support, feel free to reach out to us. 
          Our team is here to assist you with any inquiries you may have regarding our courses, platform, or anything else.
        </p>
        <p className="mb-4">
          <strong>KZ:</strong> +7 7777 333 44 55<br />
          <strong>TR:</strong> +90 123 456 78 90
        </p>
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

export default ContactPopup;
