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
  const [searchItem, setSearchItem] = useState('');
  const [popupContent, setPopupContent] = useState<string | null>(null); // State for section popup content
  const logout = useStore((state) => state.logout); // Zustand logout method
  const router = useRouter();

  // Handle search input change
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchItem); // Implement your search logic here
  };

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
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
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
