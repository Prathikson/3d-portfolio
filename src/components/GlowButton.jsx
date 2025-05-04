import React, { useRef } from 'react';

const GlowButton = ({ text, children, onClick, id = '', className = '' }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    button.style.setProperty('--start', angle + 60);
  };

  const handleClick = (e) => {
    e.preventDefault();

    const target = document.getElementById(id);
    if (target && id) {
      const offset = window.innerHeight * 0.15;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    }

    if (onClick) onClick(e);
  };

  return (
    <button
      ref={buttonRef}
      className={`glow-button ${className}`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <span className="glow" />
      <span className="content">{text || children}</span>
    </button>
  );
};

export default GlowButton;
