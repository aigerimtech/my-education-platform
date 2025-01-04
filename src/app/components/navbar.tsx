import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '../store/useStore';

// Importing the section components
import HomePopup from './home';
import CoursesPopup from './course';
import AboutPopup from './about';
import ContactPopup from './contact';
import ProfilePopup from './profile';

const Navbar: React.FC = () => {
  const [popupContent, setPopupContent] = useState<string | null>(null); // State for section popup content
  const logout = useStore((state) => state.logout); // Zustand logout method
  const router = useRouter();

  // Handle section click to open the popup
  const handleSectionClick = (section: string) => {
    setPopupContent(section); // Set popup content for the clicked section
  };

  // Handle profile popup toggle
  const handleProfileClick = () => {
    setPopupContent('Profile'); // Open the profile popup
  };

  const handleClose = () => {
    setPopupContent(null); // Close the popup
  };

  const handleLogout = () => {
    logout(); // Call Zustand's logout method
    localStorage.clear(); // Optional: Clear any local storage if needed
    router.push('/login'); // Redirect to login
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="w-full container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-semibold hover:text-gray-200">
          EduPlatform
        </a>

        <div className="space-x-6 text-white">
          <button onClick={() => handleSectionClick('Home')} className="hover:text-gray-200 transition-colors">
            Home
          </button>
          <button onClick={() => handleSectionClick('Courses')} className="hover:text-gray-200 transition-colors">
            Courses
          </button>
          <button onClick={() => handleSectionClick('About')} className="hover:text-gray-200 transition-colors">
            About
          </button>
          <button onClick={() => handleSectionClick('Contact')} className="hover:text-gray-200 transition-colors">
            Contact
          </button>
          <button onClick={handleProfileClick} className="hover:text-gray-200 transition-colors">
            My Profile
          </button>
        </div>
      </div>

      {/* Section popups */}
      {popupContent === 'Profile' && (
        <ProfilePopup
          isOpen={true}
          onClose={handleClose}
          onLogout={handleLogout}
        />
      )}

      {popupContent === 'Home' && (
        <HomePopup
          isOpen={true}
          onClose={handleClose}
        />
      )}

      {popupContent === 'Courses' && (
        <CoursesPopup
          isOpen={true}
          onClose={handleClose}
        />
      )}

      {popupContent === 'About' && (
        <AboutPopup
          isOpen={true}
          onClose={handleClose}
        />
      )}

      {popupContent === 'Contact' && (
        <ContactPopup
          isOpen={true}
          onClose={handleClose}
        />
      )}
    </nav>
  );
};

export default Navbar;
