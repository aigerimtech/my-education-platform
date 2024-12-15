'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import FilterModal from './filter';
import { useStore } from '../store/useStore';

const CourseList: React.FC = () => {
  const courses = useStore((state) => state.courses); 
  const buyCourse = useStore((state) => state.buyCourse); 
  const user = useStore((state) => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filters, setFilters] = useState({ price: '', rating: '', duration: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]); // Track purchased courses

  const resetFilters = () => setFilters({ price: '', rating: '', duration: '' });

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      filters.price === '' || (course.price !== null && course.price <= parseFloat(filters.price));
    const matchesRating = filters.rating === '' || course.rating >= parseFloat(filters.rating);

    const convertDurationToMinutes = (duration: string): number => {
      let minutes = 0;
      const hoursMatch = duration.match(/(\d+)h/);
      const minutesMatch = duration.match(/(\d+)m/);

      if (hoursMatch) {
        minutes += parseInt(hoursMatch[1]) * 60;
      }
      if (minutesMatch) {
        minutes += parseInt(minutesMatch[1]);
      }

      return minutes;
    };

    const matchesDuration =
      filters.duration === '' ||
      convertDurationToMinutes(course.duration) <= convertDurationToMinutes(filters.duration);

    return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesDuration;
  });

  // Handle course purchase
  const handlePurchase = (courseId: number) => {
    const result = buyCourse(courseId);
    if (result === 'Course purchased successfully') {
      alert(`You have successfully purchased the course: ${courseId}`);
    } else {
      alert(result); // Show error message if the purchase fails
    }
  };

  return (
    <div className="container mx-auto bg-slate-200 py-8">
      <h1 className="text-3xl ml-[20px] font-bold text-black mb-6">Course Catalog</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          className="w-[700px] h-[40px] text-black rounded-2xl ml-[10px] px-2 py-1 mr-2"
          placeholder="Search by course name or instructor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border text-black rounded-lg px-4 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Math">Math</option>
          <option value="Physics">Physics</option>
          <option value="IT">IT</option>
        </select>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
          onClick={() => setIsModalOpen(true)}
        >
          Set Filters
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(newFilters) => {
          setFilters(newFilters);
          setIsModalOpen(false);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-semibold text-green-700 mb-2">{course.name}</h2>
              <p className="text-sm text-gray-700">Instructor: {course.instructor}</p>
              <p className="text-sm text-gray-700">Rating: {course.rating} ⭐</p>
              <p className="text-sm text-gray-700">Duration: {course.duration}</p>
              {course.price ? (
                <p className="text-lg font-semibold text-pink-400 mt-2">${course.price.toFixed(2)}</p>
              ) : (
                <p className="text-lg font-semibold text-red-600 mt-2">Free</p>
              )}

              <div className="mt-4">
                {user?.enrolledCourses.includes(course.id) ? (
                  <Link href={`/course/${course.id}`} className="text-blue-500 hover:underline block">
                    View Course
                  </Link>
                ) : (
                  <button
                    onClick={() => handlePurchase(course.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded ml-1 text-sm"
                  >
                    Buy Course
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
