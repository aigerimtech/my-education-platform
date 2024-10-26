'use client'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const courseVideos: Record<number, {
  name: string;
  description: string;
  playlistUrl: string;
  instructor: string;
  rating: number;
  duration: string;
  lectures: { id: number; title: string; url: string }[];
}> = {
  1: {
    name: 'Algebra Fundamentals',
    description: "Learn the basics of Algebra including variables, equations, and functions",
    playlistUrl: "https://www.youtube.com/embed/videoseries?si=6_tFX1o-0e0ie1JV&amp;list=PLUPEBWbAHUsy-ow8RdnlRokMT9UrHb2Kd",
    instructor: 'Dr. Alan Turing',
    rating: 4.5,
    duration: "1h 43m",
    lectures: [
      { id: 1, title: "What is Algebra?", url: "https://www.youtube.com/embed/videoseries?si=L0-7oIHp03xG6rAD&amp;list=PLUPEBWbAHUsy-ow8RdnlRokMT9UrHb2Kd" },
      { id: 2, title: "Solving Basic Equations Part 1", url: "https://www.youtube.com/embed/l3XzepN03KQ?si=txv0nxl55DUipJLm" },
      { id: 3, title: "Solving Basic Equations Part 2", url: "https://www.youtube.com/embed/Qyd_v3DGzTM?si=iRUf-28oANtMirvl" },
      { id: 4, title: "Solving 2 Step Equations", url: "https://www.youtube.com/embed/LDIiYKYvvdA?si=rfLjfmwVxmP8Pb1-" },
      { id:5, title: "Exponents in Algebra", url:"https://www.youtube.com/embed/S3IEeCyUWWA?si=IpIUcGoSKgwMdXjJ"},
      { id:6, title:"What Are Polynomials?", url:"https://www.youtube.com/embed/ffLLmV4mZwU?si=wVjYyeXXLX_d7tzU"},
      { id:7, title:"Simplifying Polynomials", url:"https://www.youtube.com/embed/DKC74YKJpNY?si=2IhVKfXhJS7NC1Xy"},
      { id:8, title:"The Distributive Property", url:"https://www.youtube.com/embed/v-6MShC82ow?si=pNImilDagf_9fnwA"},
      { id:9, title:"Laws Of Exponents", url:"https://www.youtube.com/embed/LkhPRz7Hocg?si=BFicPQ52E_nZ7Lm_"},
      { id:10, title:"Graphing On The Coordinate Plane", url:"https://www.youtube.com/embed/9Uc62CuQjc4?si=cfMFygIQDpSrsi6s"},
      { id:11, title:"What are functions", url:"https://www.youtube.com/embed/52tpYl2tTqk?si=UbGC8e0CBdD_7NA8"},
      { id:12, title:"Basic Linear Functions", url:"https://www.youtube.com/embed/MXV65i9g1Xg?si=DxPd5lfuaVInBxc9"},
      { id:13, title:"Slope and Distance", url:"https://www.youtube.com/embed/rpMu98yRk40?si=nN-buhcKaPc-Jv6t"},
      { id:14, title:"Inequalities in Algebra", url:"https://www.youtube.com/embed/RyesLifeUBw?si=yEE_3c9JB0qQ2xKK"},
    ]
  },
  2: {
    name: 'Quantum Mechanics Basics',
    description: "An introduction to Quantum Mechanics and its core concepts",
    playlistUrl: "https://www.youtube.com/embed/videoseries?si=jFh9zhSoZaCTbIxt&amp;list=PLOYRlicwLG3RBvX1e7HNjB1IgUAufvUii",
    instructor: 'Domain of Science',
    rating: 4.8,
    duration: "5h 49m",
    lectures: [
      {id:1, title: "Quantum Physics Explained", url: "https://www.youtube.com/embed/Usu9xZfabPM?si=BeS2pBAbyw2PIT9X" },
      {id:2, title: "Atomic Spectroscopy Explained", url: "https://www.youtube.com/embed/crWBFuUW6kI?si=MPVYUjKEfTMxlooG" },
      {id:3, title: "Double Slit Experiment Explained", url: "https://www.youtube.com/embed/A9tKncAdlHQ?si=Y8sluIS9SVAIw55F"},
      {id:4, title:"Electrons aren't actual waves", url:"https://www.youtube.com/embed/XV46ALr3OMg?si=Px4KctRB06YhQUV-"},
      {id:5, title:"The Schrodinger equation made simple", url:"https://www.youtube.com/embed/ZfKq3g3MHqE?si=pzeTUgkWS0eLk8uX"},
      {id:6, title:"Bell's Theorem: The Quantum Venn Diagram Paradox", url:"https://www.youtube.com/embed/zcqZHYo7ONs?si=-Eg9EBV6gGEkFZkM"},
      {id:7, title:"The Heisenberg Uncertainty Principle Explained", url:"https://www.youtube.com/embed/qwt6wUUD2QI?si=zA7r1ayWBNMFfqFY"},
      {id:8, title:"What is a spin?", url:"https://www.youtube.com/embed/cd2Ua9dKEl8?si=SiZEpzsWFxqzgB6M"},
      {id:9, title:"Quantum Entanglement & Spooky Action at a Distance", url:"https://www.youtube.com/embed/ZuvK-od647c?si=ZN_uti9AxAkXuLkH"},
      {id:10,title:"Zero-Point Energy Demystified", url:"https://www.youtube.com/embed/Rh898Yr5YZ8?si=Se0O1AQpjw9uZI3S"},
      {id:11, title:"The Quantum Technology in Your Pocket", url:"https://www.youtube.com/embed/Dt_PSoZLjPE?si=XZQzgDvTYbAGDRqc"},
      {id:12, title:"Quantum Cryptography Explained", url:"https://www.youtube.com/embed/UiJiXNEm-Go?si=1iTqH_YUW-oi-YeI"},
      {id:13, title:"Five Quantum Computing Misconceptions", url:"https://www.youtube.com/embed/kEry1TaN4-k?si=sl9NxE5lukwdBSDo"},
      {id:14, title:"Quantum Simulation Explained", url:"https://www.youtube.com/embed/kD370qyxTyw?si=ynAY3ZqKoltI4g6_"},
      {id:15, title:"You Use Quantum Physics to Smell", url:"https://www.youtube.com/embed/DJsJIVXkrGQ?si=XZksMxWhAvaHbTy7"}
    ]
  },
  3: {
   name: 'Python for Beginners',
   description: 'Begin your Python journey: Master variables, functions, operators, and debugging, then build your own projects!',
   playlistUrl: "https://www.youtube.com/embed/videoseries?si=SVRyNQ3VB_eBOqxs&amp;list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3",
   instructor: 'Telusko',
   rating: 5.0,
   duration: '5h 45m',
   lectures: [
      {id:1, title:"Introduction to Python", url:"https://www.youtube.com/embed/hEgO047GxaQ?si=oquHEJwsbMQTWzf2"},
      {id:2, title:"Python Installation", url:"https://www.youtube.com/embed/CScxy0294SE?si=OsTYsMv42icGxZ8O"},
      {id:3, title:"Getting Started with Python", url:"https://www.youtube.com/embed/DWgzHbglNIo?si=QeBPaW5z9a8b1XRi"},
      {id:4, title:"Variables in Python", url:"https://www.youtube.com/embed/TqPzwenhMj0?si=GpcPQZAFrBBQCJkD"},
      {id:5, title:"List in Python", url:"https://www.youtube.com/embed/Eaz5e6M8tL4?si=MubnhrBKLhXYU2PN"},
      {id:6, title:"Tuple | Set in Python", url:"https://www.youtube.com/embed/Mf7eFtbVxFM?si=t_moAbbx4TUHSWQO"},
      {id:7, title:"Dictionary in Python", url:"https://www.youtube.com/embed/2IsF7DEtVjg?si=6HNSlyXYSQyhtDBJ"},
      {id:8, title:"Python Editor | Sublime Text", url:"https://www.youtube.com/embed/1U8TI16AR4s?si=AUMho_mbIlawlUdD"},
      {id:9, title:"More on Variables in Python", url:"https://www.youtube.com/embed/_OZIAHg5i7M?si=_4D_zHpR6PuwsPHK"},
      {id:10, title:"Data Types in Python", url:"https://www.youtube.com/embed/gCCVsvgR2KU?si=cUhncoaoCPIaBDXI"},
      {id:11, title:"Operators in Python", url:"https://www.youtube.com/embed/v5MR5JnKcZI?si=MoNyJMFwTQLiQKcr"},
      {id:12, title:"Number System Conversion in Python", url:"https://www.youtube.com/embed/AWAjbtWBzGs?si=nWZrpxz-aF73Paqt"},
      {id:13, title:"Python Bitwise Operators", url:"https://www.youtube.com/embed/PyfKCvHALj8?si=RJ3rSVwt8Dv6yzbG"},
      {id:14, title:"Import Math Functions in Python", url:"https://www.youtube.com/embed/EkYrfV7M1ks?si=G3KS6GvtqwDeJxfm"},
      {id:15, title:"Working with PyCharm | Run | Debug", url:"https://www.youtube.com/embed/akcEaEH91gI?si=XFIqPPU2CPuUQK2H"},
   ]
  },
  4: {
   name: 'Calculus I',
   description: "Dive into world of limits, derivatives and integrals",
   playlistUrl: "https://www.youtube.com/embed/videoseries?si=ieJ5mzh-AfpoOBJO&amp;list=PLHXZ9OQGMqxfT9RMcReZ4WcoVILP4k6-m",
   instructor: 'Dr. Trefor Bazett',
   rating: 4.7,
   duration:'4h 20m',
   lectures: [
      {id:1, title:"The Velocity Problem | Part I: Numerically", url:"https://www.youtube.com/embed/LWPzHlSBlxI?si=oQtQe7DkD2BL0gS9"},
      {id:2, title:"The Velocity Problem | Part II: Graphically", url:"https://www.youtube.com/embed/fzh-jmeDOvw?si=Iqg7oF1Q3roWy9Sa"},
      {id:3, title:"A Tale of Three Functions | Intro to Limits Part I", url:"https://www.youtube.com/embed/Qspc6uBMdEY?si=z4hKsXQ16z5cyIWn"},
      {id:4, title:"A Tale of Three Functions | Intro to Limits Part II", url:"https://www.youtube.com/embed/PllF7oQg8Og?si=so_nVuBWHiFDSsHz"},
      {id:5, title:"What is an infinite limit?", url:"https://www.youtube.com/embed/5hfHbOCeFoU?si=cTxL-oDS9zJgZy0M"},
      {id:6, title:"Limit Laws | Breaking up Complicated Limits into Simpler Ones", url:"https://www.youtube.com/embed/dY5T7BcQ2Nc?si=Yxi0eStXYTbn8qAa"},
      {id:7, title:"Building up to computing limits of rational functions", url:"https://www.youtube.com/embed/XDcy_wqWQVs?si=DjDiW_cbwyDKcodX"},
      {id:8, title:"Limits of Oscillating Functions and the Squeeze Theorem", url:"https://www.youtube.com/embed/vIRvEvjKM58?si=9TUoiQSm86xTJWMf"},
      {id:9, title:"Top 4 Algebraic Tricks for Computing Limits", url:"https://www.youtube.com/embed/zswMgrZqj4E?si=ojDJtExRU9Pwagnr"},
      {id:10, title:"A Limit Example Combining Multiple Algebraic Tricks", url:"https://www.youtube.com/embed/tWoYGRy8eQg?si=RKvfIpXKsg6Dzmo8"},
      {id:11, title:"Limits are simple for continuous functions", url:"https://www.youtube.com/embed/0S01H4S8djs?si=U2FKXhuBmXwK3TTj"},
      {id:12, title:"Were you ever exactly 3 feet tall? The Intermediate Value Theorem", url:"https://www.youtube.com/embed/n3G1L3yqPI0?si=X9ZkQppVwJr56LIu"},      
   ]
  },
  5: {
   name: 'Artificial Intelligence Basics',
   description: "Learn about various search algorithms,uninformed and informed search, their applications in problem-solving.",
   playlistUrl:"https://www.youtube.com/embed/videoseries?si=3v9Ii7qLIeY8q2Jw&amp;list=PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
   instructor: 'Gate Smashers',
   rating: 4.8,
   duration: '6h 10m',
   lectures: [
      {id:1, title:"What is Artificial Intelligence", url:"https://www.youtube.com/embed/s-s9ilkMVj8?si=Qp5-XUcLP1_h-P13"},
      {id:2, title:"What is State Space Search", url:"https://www.youtube.com/embed/E5jVBqe59EE?si=uj8dMqM5ZP82LDJm"},
      {id:3, title:"Uninformed Vs Informed Search in Artificial Intelligence", url:"https://www.youtube.com/embed/gZpUcsB9TFc?si=xok60M1sS-uqWYzo"},
      {id:4, title:"Breadth First Search (BFS)", url:"https://www.youtube.com/embed/qul0f79gxGs?si=7fF3x6FRiEDGFP8k"},
      {id:5, title:"Depth First Search (DFS)", url:"https://www.youtube.com/embed/f8luGFRtshY?si=3y3o3hBagsPqq9N7"},
      {id:6, title:"Bidirectional Search Algorithm", url:"https://www.youtube.com/embed/rEema9uQ02c?si=sWNFzMuvO4u0BhLl"},
      {id:7, title:"8-Puzzle Problem in Artificial Intelligence Without Heuristic", url:"https://www.youtube.com/embed/_CrEYrcImv0?si=aN-t3GENWeFUYlP1"},
      {id:8, title:"What is Heuristic in AI | How to Calculate Heuristic", url:"https://www.youtube.com/embed/5F9YzkpnaRw?si=G9JIvDWy9xNkvnN6"},
      {id:9, title:"How to Solve 8-Puzzle Problem with Heuristic", url:"https://www.youtube.com/embed/nmWGhb9E4es?si=XsPKOWWIm1hkRYfi"},
      {id:10, title:"Generate and Test Search in Artificial Intelligence", url:"https://www.youtube.com/embed/h-AfcPvpld4?si=-8L3xLC3eYBRGy6s"},
      {id:11, title:"Best First Search Algorithm", url:"https://www.youtube.com/embed/7ffDUDjwz5E?si=5ZO2Xv9s7udHugCO"},
      {id:12, title:"Beam Search Algorithm in Artificial Intelligence", url:"https://www.youtube.com/embed/jhoXO1XF6Fk?si=uqb1uPqgujl4NVF7"},  
   ]
  }
};

const CoursePage = () => {
   const [courseId, setCourseId] = useState<number | null>(null);
   const [selectedLecture, setSelectedLecture] = useState<string | null>(null);
   const [videoLoading, setVideoLoading] = useState(true); // Video loading state
   const pathname = usePathname();
 
   useEffect(() => {
     const id = parseInt(pathname.split('/')[2]);
     if (!isNaN(id)) {
       setCourseId(id);
     }
   }, [pathname]);
 
   const course = courseVideos[courseId ?? 0];
 
   if (!course) {
     return (
       <div className="container mx-auto py-8 text-center">
         <h1 className="text-2xl font-bold text-white mb-6">Course not found</h1>
         <p className="text-red-200">The course you're looking for does not exist.</p>
       </div>
     );
   }
 
   const handleLectureSelect = (url: string) => {
     setVideoLoading(true);      setSelectedLecture(url);
   };
 
   return (
     <div className="container mx-auto py-8 flex flex-col md:flex-row gap-6">
       {/* Sidebar for lectures */}
       <div className="w-full md:w-1/3 max-h-[90vh] overflow-y-auto p-4 bg-gray-800 text-white rounded-lg">
         <h2 className="text-xl font-semibold text-white mb-4">{course.name} Lectures</h2>
         <ul className="space-y-2">
           {course.lectures.map((lecture) => (
             <li key={lecture.id}>
               <button
                 onClick={() => handleLectureSelect(lecture.url)}
                 className="p-2 rounded-md cursor-pointer hover:bg-gray-700"
               >
                  <span className="text-sm font-semibold text-gray-400 mr-2">{lecture.id}.</span>
                 {lecture.title}
               </button>
             </li>
           ))}
         </ul>
       </div>
 
       <div className="w-full md:w-2/3">
         <div className="text-center mb-4">
           <h1 className="text-3xl font-bold text-white">{course.name}</h1>
           <p className="text-lg mt-[5px] text-red-200">{course.description}</p>
           <p className="text-base mt-[2px] text-gray-300 ">Instructor: {course.instructor}</p>
           <p className="text-sm mt-[2px] text-yellow-400">Rating: {course.rating} / 5</p>
         </div>
 
         {/* Video Section */}
         <div className="w-[950px] h-[500px] ml-3 mb-8">
           {videoLoading && <Skeleton height={300} />}
           <iframe
             src={selectedLecture || course.playlistUrl}
             title="YouTube video player"
             frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             referrerPolicy="strict-origin-when-cross-origin"
             allowFullScreen
             className={`w-full h-full rounded-lg ${videoLoading ? 'hidden' : ''}`} // Hide iframe if videoLoading is true
             onLoad={() => setVideoLoading(false)} // Remove skeleton once the iframe is loaded
           ></iframe>
         </div>
       </div>
     </div>
   );
 };
 
 export default CoursePage;
