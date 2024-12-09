'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    router.push('/dashboard');
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);

    if (result === 'Login successful') {
      router.push('/dashboard');
    } else {
       setErrorMessage('You are not signed up to this platform!'); // Display error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>

      {errorMessage && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-red-500 text-white p-6 rounded-lg">
          <p>{errorMessage}</p>
          <button 
            onClick={() => setErrorMessage(null)} 
            className="mt-4 p-2 ml-24 bg-white text-red-500 rounded hover:bg-gray-200"
          > Close </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Login;
