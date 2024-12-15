'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '../store/useStore';

const Register: React.FC = () => {
  const { register} = useStore();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

   const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(), // Unique ID
      name: `${firstName} ${lastName}`,
      email,
      password,
      balance: 0,
      enrolledCourses: [],
    };

    const result = register(newUser); // Call the register function

    if (result === 'Registration successful. Please log in now.') {
      alert(result); // Notify user of success
      router.push('/login'); // Navigate to the login page
    } else {
      setErrorMessage(result); // Set error message for duplicate email
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">First Name</label>
            <input
              type="text"
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Last Name</label>
            <input
              type="text"
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-pink-600 hover:underline">
            Login
          </a>
        </p>
      </div>

      {errorMessage && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-red-500 text-white p-6 rounded-lg">
          <p>{errorMessage}</p>
          <button 
            onClick={() => setErrorMessage(null)} 
            className="mt-4 p-2 ml-16 bg-white text-red-500 rounded hover:bg-gray-200"
          > Close </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Register;
