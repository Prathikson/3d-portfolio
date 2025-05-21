// components/CrosshairCursor.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CrosshairCursor = () => {
  const cursorRef = useRef(null);
  const linesRef = useRef([]);
  const saberRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power3.out",
      });
    };

    const isInteractive = (el) => {
      return (
        el.tagName === "BUTTON" ||
        el.tagName === "A" ||
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT"
      );
    };

    const onHover = (e) => {
      if (isInteractive(e.target)) {
        gsap.killTweensOf(linesRef.current);
        gsap.killTweensOf(saberRef.current);

        gsap.to(linesRef.current, {
          duration: 0.35,
          stagger: 0.05,
          ease: "elastic.out(1, 0.5)",
          x: (i) => (i % 2 === 0 ? (i < 2 ? 12 : -12) : 0),
          y: (i) => (i % 2 === 1 ? (i < 2 ? 12 : -12) : 0),
          stroke: "#ff0055",
          strokeWidth: 2.5,
          onComplete: () => {
            gsap.to(linesRef.current, {
              duration: 0.6,
              x: 0,
              y: 0,
              ease: "elastic.out(1, 0.4)",
              stroke: "#ffffff",
              strokeWidth: 1.8,
            });
          },
        });

        gsap.fromTo(
          cursorRef.current,
          { filter: "drop-shadow(0 0 4px #ff0055)" },
          {
            filter: "drop-shadow(0 0 10px #ff3399)",
            duration: 0.6,
            yoyo: true,
            repeat: 3,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          saberRef.current,
          { opacity: 0, scaleY: 0.3 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.3,
            ease: "power2.out",
            transformOrigin: "bottom center",
          }
        );
      }
    };

    const onHoverOut = (e) => {
      if (isInteractive(e.target)) {
        gsap.to(saberRef.current, {
          opacity: 0,
          scaleY: 0,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "bottom center",
        });
      }
    };

    const clickEffect = (e) => {
      gsap.killTweensOf(linesRef.current);
      gsap.killTweensOf(saberRef.current);

      gsap
        .timeline()
        .to(linesRef.current, {
          rotation: 360,
          scale: 1.6,
          stroke: "#ff2200",
          strokeWidth: 3,
          duration: 0.3,
          transformOrigin: "center center",
          stagger: 0.08,
          ease: "power1.out",
        })
        .to(linesRef.current, {
          rotation: 0,
          scale: 1,
          stroke: "#ffffff",
          strokeWidth: 2,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.08,
        });

      gsap.to(saberRef.current, {
        opacity: 0,
        scaleY: 0,
        duration: 0.15,
        ease: "power2.out",
        transformOrigin: "bottom center",
      });

      if (rippleRef.current) {
        const ripple = rippleRef.current;
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        gsap.killTweensOf(ripple);
        gsap.fromTo(
          ripple,
          { scale: 0, opacity: 0.4 },
          {
            scale: 15,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", clickEffect);
    window.addEventListener("mouseover", onHover);
    window.addEventListener("mouseout", onHoverOut);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", clickEffect);
      window.removeEventListener("mouseover", onHover);
      window.removeEventListener("mouseout", onHoverOut);
    };
  }, []);

  const setLineRef = (el, index) => {
    if (el) linesRef.current[index] = el;
  };

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ width: 30, height: 30, marginLeft: -15, marginTop: -15 }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          className="text-white mix-blend-difference"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line ref={(el) => setLineRef(el, 0)} x1="12" y1="0" x2="12" y2="7" />
          <line ref={(el) => setLineRef(el, 1)} x1="12" y1="17" x2="12" y2="24" />
          <line ref={(el) => setLineRef(el, 2)} x1="0" y1="12" x2="7" y2="12" />
          <line ref={(el) => setLineRef(el, 3)} x1="17" y1="12" x2="24" y2="12" />
        </svg>

        {/* Light saber beam */}
        <div
          ref={saberRef}
          style={{
            position: "absolute",
            bottom: 15,
            left: "50%",
            width: 4,
            height: 30,
            background:
              "linear-gradient(45deg, #ff0055, #ff3399, #ff0055, #ff3399)",
            filter: "drop-shadow(0 0 8px #ff3399)",
            transformOrigin: "bottom center",
            opacity: 0,
            borderRadius: 2,
            pointerEvents: "none",
            transform: "rotate(-15deg)",
            marginLeft: -2,
          }}
        />
      </div>

      {/* Ripple effect */}
      <div
        ref={rippleRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "2px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "0 0 12px 2px rgba(255, 255, 255, 0.6)",
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
          mixBlendMode: "difference",
          zIndex: 9999,
        }}
      />
    </>
  );
};

export default CrosshairCursor;
