'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const courseVideos: { [key: number]: { name: string; playlistUrl: string } } = {
  1: { name: 'Algebra Fundamentals', playlistUrl: 'https://youtu.be/LwCRRUa8yTU?si=VaCBmh1pB3VrmtoG' },
  2: { name: 'Quantum Mechanics Basics', playlistUrl: 'https://youtu.be/tsbCSkvHhMo?si=bO2C7RmJd2dQorus' },
  3: { name: 'Introduction to Programming with Python', playlistUrl: 'https://youtu.be/kqtD5dpn9C8?si=yuNlWPkPB95lhLOW' },
  4: { name: 'Calculus 1', playlistUrl: 'https://youtu.be/G-ti56DEXE8?si=fRqvMwtZxq9dwj5v' },
  5: { name: 'Artificial Intelligence Basics', playlistUrl: 'https://youtu.be/5NgNicANyqM?si=S5bMCOxsq4425Z7W' },
  6: { name: 'Classical Physics: Motion and Forces', playlistUrl: 'https://youtu.be/b1t41Q3xRM8?si=EYd2NEsDf_bX-5RT' },
  7: { name: 'Data Structures and Algorithms', playlistUrl: 'https://youtu.be/8hly31xKli0?si=KSM-PtzE1ffacF9p' },
  8: { name: 'Geometry Mastery', playlistUrl: 'https://youtu.be/302eJ3TzJQU?si=apjn_drqCMz354DW' },
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
        <iframe
          src={course.playlistUrl}
          title={course.name}
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default CoursePage;
