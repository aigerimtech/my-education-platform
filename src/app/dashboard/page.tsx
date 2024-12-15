'use client';
import React, { useEffect } from 'react';
import Navbar from '@/app/components/navbar';
import Course from '../components/courseList';
import {useAuth} from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const { isAuthenticated } = useAuth();
    const { push } = useRouter();

    useEffect(() => {
        if (!isAuthenticated) push('/login'); // Redirect to login if not authenticated
    }, [isAuthenticated, push]);

    if (!isAuthenticated) return null; // Prevent rendering while redirecting

    return (
        <div className='w-full max-w-screen-2xl mx-auto'>
            <Navbar />
            <Course />
        </div>
    );
};

export default Dashboard;
