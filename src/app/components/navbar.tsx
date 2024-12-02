'use client';
import React, { useState } from 'react';
import ProfilePopup from './profile';
import { useRouter } from 'next/navigation';
import { useStore } from '../store/useStore';

const Navbar: React.FC = () => {
  const [searchItem, setSearchItem] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false); 
  const logout = useStore((state) => state.logout); // Zustand logout method
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchItem);
  };

  const handleProfileClick = () => {
    setPopupOpen(true);
  };

  const handleCloseProfile = () => {
    setPopupOpen(false);
  };

  const handleLogout = () => {
    logout(); // Call Zustand's logout method
    localStorage.clear(); // Optional: Clear any local storage if needed
    router.push('/login'); // Redirect to login
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-semibold hover:text-gray-200">
          EduPlatform
        </a>

        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full overflow-hidden shadow">
          <input
            type="text"
            className="px-4 py-2 w-full text-gray-700 focus:outline-none"
            placeholder="Search for a course..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="space-x-6 text-white">
          <a href="/" className="hover:text-gray-200 transition-colors">Home</a>
          <a href="/courses" className="hover:text-gray-200 transition-colors">Courses</a>
          <a href="/about" className="hover:text-gray-200 transition-colors">About</a>
          <a href="/contact" className="hover:text-gray-200 transition-colors">Contact</a>
          <a href="#" onClick={handleProfileClick} className="hover:text-gray-200 transition-colors">
            My Profile
          </a>
        </div>
      </div>

      {isPopupOpen && (
        <ProfilePopup
          isOpen={isPopupOpen}
          onClose={handleCloseProfile}
          onLogout={handleLogout}
        />
      )}
    </nav>
  );
};

export default Navbar;
