'use client'
import React, {useState} from 'react';
import Navbar from '@/app/components/navbar';
import Course from '../components/course';

const dashboard=()=>{
    return(
        <div>
            <Navbar/>
            <Course/>
        </div>
    );
};

export default dashboard;