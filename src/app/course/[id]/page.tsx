'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const courseVideos: { [key: number]: { name: string; playlistUrl: string } } = {
  1: { name: 'Algebra Fundamentals', playlistUrl: 'https://www.youtube.com/embed/NybHckSEQBI?si=9WH8nnVWNuHTAouI' },
  2: { name: 'Quantum Mechanics Basics', playlistUrl: 'https://www.youtube.com/embed/Usu9xZfabPM?si=1Y9B5oRsvvrtBTyP' },
  3: { name: 'Introduction to Programming with Python', playlistUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc?si=p0vdcfuA0lg8RV7A' },
  4: { name: 'Calculus 1', playlistUrl: 'https://www.youtube.com/embed/HfACrKJ_Y2w?si=x2IzN0bRiZC4aVao' },
  5: { name: 'Artificial Intelligence Basics', playlistUrl: 'https://www.youtube.com/embed/5NgNicANyqM?si=xh6bcJKSk0hRNaQ-' },
  6: { name: 'Classical Physics: Motion and Forces', playlistUrl: 'https://www.youtube.com/embed/8aHAvm3ZsE8?si=z9U0eTaHHKmo8Vgw' },
  7: { name: 'Data Structures and Algorithms', playlistUrl: 'https://www.youtube.com/embed/8hly31xKli0?si=yrKGQ4kf7qAra-7X' },
  8: { name: 'Geometry Mastery', playlistUrl: 'https://www.youtube.com/embed/MD1Ob370TIA?si=uXiTgO1_s7UMmHMV' },
};

const CoursePage: React.FC = () => {
  const [id, setId] = useState(1);
  const pathname = usePathname()
  useEffect(()=>{
    setId(parseInt(pathname.split('/')[2]));
  },[])

  const course = courseVideos[id];

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-black mb-6">{course.name}</h1>
      <div className="w-full aspect-video">
      <iframe width="560" height="315" src={courseVideos[id].playlistUrl} title="YouTube video player" frameBorder={"0"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
    </div>
  );
};

export default CoursePage;
