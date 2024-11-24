import { create } from 'zustand';

interface User {
    id: number;
    name: string;
    email:string;
    password: string;
    balance: number;
    enrolledCourses: number[];
  }

interface Course {
  id: number;
  name: string;
  instructor: string;
  rating: number;
  duration: string;
  price: number | null;
  category: string;
}

interface StoreState {
    user: User | null;
    courses: Course[];
    existingUsers: User[];
    login: (user: User) => void;
    logout: () => void;
    buyCourse: (courseId: number) => string;
    isCourseAccessible: (courseId: number) => boolean;
  }
  

interface StoreState {
  courses: Course[];
  addCourse: (newCourse: Course) => void;
  updateCourse: (id: number, updatedCourse: Partial<Course>) => void;
  removeCourse: (id: number) => void;
}

export const useStore = create<StoreState>((set, get) => ({
    user: null,
    //List of existing users
    existingUsers: [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: '123456', balance: 100, enrolledCourses: [] },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', password: 'abcdef', balance: 20, enrolledCourses: [1, 3] },
      { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', password: 'alice123', balance: 50, enrolledCourses: [2] },
      { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', password: 'bob@brown', balance: 300, enrolledCourses: [1, 4, 5] },
      { id: 5, name: 'Clara Martinez', email: 'clara.martinez@example.com', password: 'clara789', balance: 150, enrolledCourses: [3, 6] },
      { id: 6, name: 'David Wilson', email: 'david.wilson@example.com', password: 'dwilson#12', balance: 120, enrolledCourses: [] },
      { id: 7, name: 'Emily Davis', email: 'emily.davis@example.com', password: 'emily456', balance: 250, enrolledCourses: [2, 7] },
      { id: 8, name: 'Frank Thomas', email: 'frank.thomas@example.com', password: 'frank000', balance: 400, enrolledCourses: [1, 5, 6, 7] },
      { id: 9, name: 'Grace Lee', email: 'grace.lee@example.com', password: 'grace2024', balance: 90, enrolledCourses: [] },
      { id: 10, name: 'Henry Clark', email: 'henry.clark@example.com', password: 'henrypass', balance: 180, enrolledCourses: [3, 8] },
    ],    

    // Courses Data
    courses: [
      { id: 1, name: 'Algebra Fundamentals', instructor: 'Matantics', rating: 3.8, duration: '1h 43m', price: 29.99, category: 'Math' },
      { id: 2, name: 'Quantum Mechanics Basics', instructor: 'Domain of Science', rating: 4.9, duration: '6h 20m', price: 39.99, category: 'Physics' },
      { id: 3, name: 'Python for Beginners', instructor: 'Telusko', rating: 5.0, duration: '5h 45m', price: 49.99, category: 'IT' },
      { id: 4, name: 'Calculus I', instructor: 'Dr. Trefor Bazett', rating: 2.7, duration: '4h 20m', price: 19.99, category: 'Math' },
      { id: 5, name: 'Artificial Intelligence Basics', instructor: 'Gate Smashers', rating: 4.8, duration: '6h 10m', price: 59.99, category: 'IT' },
      { id: 6, name: 'Data Structures and Algorithms', instructor: 'William Fiset', rating: 4.2, duration: '5h 45m', price: 49.99, category: 'IT' },
      { id: 7, name: 'Geometry Mastery', instructor: 'Mario Math', rating: 3.6, duration: '2h 50m', price: null, category: 'Math' },
    ],
  
    // Login Method
    login: (credentials: { email: string; password: string }) => {
      const { existingUsers } = get(); // Access existing users from store
      const user = existingUsers.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
  
      if (user) {
        set({ user }); // Set the logged-in user
        return 'Login successful';
      } else {
        return 'Invalid email or password';
      }
    },
  
  
    // Logout Method
    logout: () => set({ user: null }),
  
    // Buy Course Method
    buyCourse: (courseId) => {
      const { user, courses } = get();
      if (!user) return 'User not logged in';
  
      const course = courses.find((c) => c.id === courseId);
      if (!course) return 'Course not found';
  
      if (user.enrolledCourses.includes(courseId))
         return 'Already enrolled in this course';

      // Check if the course is free
      if (course.price === null) {
        set({
          user: {
           ...user,
           enrolledCourses: [...user.enrolledCourses, courseId],
          },
        });
      return 'Course purchased successfully (free course)';
      }

      // Check for sufficient balance
      if (course.price > user.balance) {
          alert ('Insufficient balance');
      }

       // Deduct course price from balance and enroll user
      set({
        user: {
          ...user,
          balance: user.balance - course.price,
          enrolledCourses: [...user.enrolledCourses, courseId],
        },
      });
      return 'Course purchased successfully';
    },
  
    // Check if Course is Accessible
    isCourseAccessible: (courseId) => {
      const { user, courses } = get();
      const course = courses.find((c) => c.id === courseId);
      if (!user || !course) return false;
  
      return course.price === null || user.enrolledCourses.includes(courseId);
    },
  
    // Add a New Course
    addCourse: (newCourse) =>
      set((state) => ({
        courses: [...state.courses, newCourse],
      })),
  
    // Update an Existing Course
    updateCourse: (id, updatedCourse) =>
      set((state) => ({
        courses: state.courses.map((course) =>
          course.id === id ? { ...course, ...updatedCourse } : course
        ),
      })),
  
    // Remove a Course by ID
    removeCourse: (id) =>
      set((state) => ({
        courses: state.courses.filter((course) => course.id !== id),
      })),
  }));