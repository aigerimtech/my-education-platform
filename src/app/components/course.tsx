import React, { useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

type CoursesPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CoursesPopup = ({ isOpen, onClose }: CoursesPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  useClickOutside(popupRef, onClose); // Close on click outside

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center z-50 pt-20">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg w-4/5 sm:w-3/5 lg:w-1/3 text-black"
      >
        <h2 className="text-2xl font-bold mb-4">Our Courses</h2>
        <p className="mb-4">
          We offer a diverse range of courses designed to equip you with the skills needed to excel in the fields of Math, Physics, IT, and AI. Our expert instructors ensure that you receive a world-class education, backed by engaging video lessons and hands-on assignments.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Algebra Fundamentals</li>
          <li>Quantum Mechanics Basics</li>
          <li>Artificial Intelligence Basics</li>
          <li>Calculus I</li>
          <li>Data Structures and Algorithms</li>
          <li>Python for Beginners</li>
          <li>Geometry Mastery</li>
        </ul>
        <p className="font-semibold text-lg">
          Enroll in a course now and start learning today!
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

export default CoursesPopup;
