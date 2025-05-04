'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

import bookImage from '../assets/images/book-cover.png';
import TitleHeader from '../components/TitleHeader';
import CardHeader from '../components/CardHeader';
import Card from '../components/Card';

// Hobbies data
const hobbies = [
  { title: 'Soccer', emoji: '⚽', left: '5%', top: '5%' },
  { title: 'Music', emoji: '🎧', left: '50%', top: '5%' },
  { title: 'Hiking', emoji: '🏔️', left: '10%', top: '35%' },
  { title: 'Gym', emoji: '🏋️‍♀️', left: '35%', top: '40%' },
  { title: 'Traveling', emoji: '✈️', left: '70%', top: '45%' },
  { title: 'Cooking', emoji: '🍝', left: '5%', top: '65%' },
  { title: 'Gaming', emoji: '🎮', left: '45%', top: '70%' },
];

const AboutSection = () => {
  const constraintRef = useRef(null);
  const hobbyRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    // Enable draggable functionality for each hobby
    hobbyRefs.current.forEach((hobbyElement) => {
      Draggable.create(hobbyElement, {
        bounds: constraintRef.current, // Constraint to the parent container
        type: 'x,y', // Allow movement in both X and Y axes
        inertia: true, // Enable inertia for smooth dragging
      });
    });

    return () => {
      // Clean up Draggable instances
      hobbyRefs.current.forEach((hobbyElement) => {
        hobbyElement && hobbyElement._gsap && hobbyElement._gsap.kill();
      });
    };
  }, []);

  return (
    <section id="about" className="w-full md:mt-20 mt-10 section-padding xl:px-0">
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Me and My World" sub="❤️ About me" />
        <div className="mt-20 flex flex-col gap-8 mb-28">
          {/* Top Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-[80%] mx-auto">

            {/* Card 1 - My Reads */}
            <Card className="h-[320px] md:col-span-2 lg:col-span-1 flex flex-col items-center">
              <CardHeader title="My Reads" description="Books I Like" />
              <div className="w-32 md:w-40 mt-4">
                <img
                  src={bookImage}
                  alt="Book Cover"
                  className="w-full h-auto object-contain"
                />
              </div>
            </Card>

            {/* Card 2 - Touch the Grass */}
            <Card className="h-[320px] col-span-1 md:col-span-3 lg:col-span-4 flex flex-col">
              <CardHeader className="px-6 py-6" title="Touch the Grass" description="Explore my interests and hobbies beyond the digital realm." />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((hobby, index) => (
                  <div
                    key={hobby.title}
                    ref={(el) => hobbyRefs.current[index] = el} // Assign the ref for each element
                    className="inline-flex items-center gap-2 px-6 py-1.5 absolute bg-gradient-to-r from-white/80 to-white rounded-full"
                    style={{ left: hobby.left, top: hobby.top }}
                  >
                    <span className="font-medium text-black">{hobby.title}</span>
                    <span>{hobby.emoji}</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
