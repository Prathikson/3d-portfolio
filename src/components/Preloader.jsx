import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // GSAP animation for the logo
    gsap.to('.preloader-logo', {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'easeInOut',
      delay: 0.5,
    });

    let progressValue = 0;
    const startTime = Date.now();

    const interval = setInterval(() => {
      progressValue += 2;
      setProgress(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
        
        const timeElapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, 3000 - timeElapsed); // Always show at least 5 seconds

        setTimeout(() => {
          exitPreloader();
        }, remainingTime);
      }
    }, 80);
  }, []);

  const exitPreloader = () => {
    gsap.to('.preloader-inner', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.inOut',
      onComplete: () => {
        onComplete(); // Trigger onComplete callback once preloader is done
      },
    });

    gsap.to('.preloader', {
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.inOut',
    });
  };

  return (
    <div className="preloader fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white transition-opacity duration-700">
      <div className="preloader-inner text-center space-y-6">
        {/* Replace with your logo */}
        <div className="preloader-logo mx-auto size-16 rounded-full bg-white/10 backdrop-blur-md shadow-[0_0_30px_#ffffff33] flex items-center justify-center">
          <img src="/images/LogoContact.png" alt="Logo" className="w-20 h-20" />
        </div>

        {/* Progress bar */}
        <div className="relative w-60 h-2 bg-white/10 rounded-full overflow-hidden mx-auto shadow-inner">
          <div
            className="absolute top-0 left-0 h-full bg-white transition-all ease-out duration-200"
            style={{ width: `${progress}%` }}
          />
    
        </div>

        {/* Progress text */}
        <p className="text-white/60 text-sm tracking-widest uppercase">{progress}%</p>
        <p className="text-white/60 text-sm tracking-widest uppercase">Preloader Cause It's Cool 😎</p>
      </div>
    </div>
  );
};

export default Preloader;
