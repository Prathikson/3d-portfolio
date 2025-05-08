// components/CrosshairCursor.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CrosshairCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="text-white mix-blend-difference"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="12" y1="0" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="24" />
        <line x1="0" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="24" y2="12" />
      </svg>
    </div>
  );
};

export default CrosshairCursor;
