'use client'
import Link from 'next/link';
import React, { useState } from 'react';

interface Course {
  id: number;
  name: string;
  instructor: string;
  rating: number;
  duration: string;
  price: number | null;
  category: string;
}

const coursesData: Course[] = [
  { id: 1, name: 'Algebra Fundamentals', instructor: 'Dr. Alan Turing', rating: 4.8, duration: '3h 30m', price: 29.99, category: 'Math' },
  { id: 2, name: 'Quantum Mechanics Basics', instructor: 'Dr. Niels Bohr', rating: 4.9, duration: '4h 15m', price: 39.99, category: 'Physics' },
  { id: 3, name: 'Introduction to Programming with Python', instructor: 'Ada Lovelace', rating: 5.0, duration: '5h 45m', price: 49.99, category: 'IT' },
  { id: 4, name: 'Calculus I', instructor: 'Isaac Newton', rating: 4.7, duration: '3h 20m', price: 19.99, category: 'Math' },
  { id: 5, name: 'Artificial Intelligence Basics', instructor: 'Elon Musk', rating: 4.8, duration: '6h 10m', price: 59.99, category: 'IT' },
  { id: 6, name: 'Classical Physics: Motion and Forces', instructor: 'Galileo Galilei', rating: 4.6, duration: '3h 10m', price: null, category: 'Physics' },
  { id: 7, name: 'Data Structures and Algorithms', instructor: 'Donald Knuth', rating: 4.9, duration: '6h 45m', price: 49.99, category: 'IT' },
  { id: 8, name: 'Geometry Mastery', instructor: 'Euclid', rating: 4.6, duration: '2h 50m', price: null, category: 'Math' },
];

const CourseList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto bg-slate-200 py-8">
      <h1 className="text-3xl ml-[20px] font-bold text-black mb-6">Available Courses</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          className="w-[700px] h-[40px] text-black rounded-2xl px-2 py-1 mr-2"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-semibold text-green-700 mb-2">{course.name}</h2>
              <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
              <p className="text-sm text-gray-600">Rating: {course.rating} ⭐</p>
              <p className="text-sm text-gray-600">Duration: {course.duration}</p>
              {course.price ? (
                <p className="text-lg font-semibold text-pink-400 mt-2">${course.price.toFixed(2)}</p>
              ) : (
                <p className="text-lg font-semibold text-red-600 mt-2">Free</p>
              )}
              
              <Link 
                href={`/course/${course.id}`} 
                className="text-blue-500 hover:underline"> View Course
              </Link>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
