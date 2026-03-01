import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/* ──────────────────────────────────────────────────────────────────────
   PRELOADER
   · Center: big bold name + tagline
   · Bottom-left: SVG orbital / morphing animation
   · Bottom-right: live counter
   · Glassy dark aesthetic, curtain exit
────────────────────────────────────────────────────────────────────── */

/* ── SVG Loader animation (bottom-left) ──────────────────────────── */
const SVGLoader = ({ progress }) => {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (progress / 100) * circ;

  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  useEffect(() => {
    gsap.to(orb1Ref.current, {
      rotation: 360,
      transformOrigin: '50px 50px',
      duration: 3,
      ease: 'none',
      repeat: -1,
    });
    gsap.to(orb2Ref.current, {
      rotation: -360,
      transformOrigin: '50px 50px',
      duration: 4.5,
      ease: 'none',
      repeat: -1,
    });
    gsap.to(orb3Ref.current, {
      rotation: 360,
      transformOrigin: '50px 50px',
      duration: 7,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      style={{ display: 'block' }}
    >
      {/* outer faint ring */}
      <circle
        cx="50" cy="50" r={r + 14}
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
      />

      {/* progress arc — fills with progress */}
      <circle
        cx="50" cy="50" r={r + 14}
        stroke="rgba(167,139,250,0.35)"
        strokeWidth="1"
        strokeDasharray={`${(progress / 100) * (2 * Math.PI * (r + 14))} 9999`}
        strokeLinecap="round"
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '50px 50px',
          transition: 'stroke-dasharray 0.12s ease',
        }}
      />

      {/* middle ring */}
      <circle
        cx="50" cy="50" r={r}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      />

      {/* orbiting dot 1 */}
      <g ref={orb1Ref}>
        <circle cx="50" cy={50 - r} r="3" fill="#a78bfa" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* orbiting dot 2 — opposite, smaller */}
      <g ref={orb2Ref}>
        <circle cx="50" cy={50 - (r - 8)} r="2" fill="#60a5fa" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="4.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* outer slow orbit */}
      <g ref={orb3Ref}>
        <circle cx="50" cy={50 - (r + 14)} r="2.5" fill="#f472b6" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="7s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* inner progress fill circle */}
      <circle
        cx="50" cy="50" r={r - 8}
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      />

      {/* centre dot */}
      <circle cx="50" cy="50" r="4" fill="rgba(255,255,255,0.15)" />
      <circle cx="50" cy="50" r="2" fill="rgba(167,139,250,0.8)" />

      {/* filled arc on inner circle */}
      <circle
        cx="50" cy="50" r={r - 8}
        stroke="rgba(167,139,250,0.5)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray={`${(progress / 100) * (2 * Math.PI * (r - 8))} 9999`}
        strokeLinecap="round"
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '50px 50px',
          transition: 'stroke-dasharray 0.12s ease',
          filter: 'drop-shadow(0 0 4px rgba(167,139,250,0.6))',
        }}
      />
    </svg>
  );
};

/* ── Main Preloader ───────────────────────────────────────────────── */
const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  const rootRef    = useRef(null);
  const curtainRef = useRef(null);
  const nameRef    = useRef(null);
  const line2Ref   = useRef(null);
  const tagRef     = useRef(null);
  const counterRef = useRef(null);
  const loaderRef  = useRef(null);
  const progressVal = useRef(0);
  const countObj    = useRef({ val: 0 });

  /* entrance */
  useEffect(() => {
    gsap.set([nameRef.current, line2Ref.current], { yPercent: 105, opacity: 0 });
    gsap.set(tagRef.current, { opacity: 0, y: 12 });
    gsap.set(counterRef.current, { opacity: 0, y: 8 });
    gsap.set(loaderRef.current, { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl
      .to(nameRef.current,  { yPercent: 0, opacity: 1, duration: 0.9 }, 0.2)
      .to(line2Ref.current, { yPercent: 0, opacity: 1, duration: 0.9 }, 0.38)
      .to(tagRef.current,   { opacity: 1, y: 0, duration: 0.6 }, 0.7)
      .to(loaderRef.current,{ opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, 0.5)
      .to(counterRef.current,{ opacity: 1, y: 0, duration: 0.6 }, 0.6);

    /* progress ticker */
    const interval = setInterval(() => {
      progressVal.current += 1.4;
      const capped = Math.min(Math.round(progressVal.current), 100);
      setProgress(capped);

      /* GSAP tween the counter number */
      gsap.to(countObj.current, {
        val: capped,
        duration: 0.15,
        ease: 'none',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(countObj.current.val)).padStart(2, '0') + '%';
          }
        },
      });

      if (capped >= 100) {
        clearInterval(interval);
        setTimeout(exitPreloader, 500);
      }
    }, 38);

    return () => clearInterval(interval);
  }, []);

  /* exit */
  const exitPreloader = () => {
    const tl = gsap.timeline({ onComplete: () => onComplete?.() });
    tl
      .to([nameRef.current, line2Ref.current, tagRef.current], {
        yPercent: -40, opacity: 0,
        duration: 0.55, ease: 'power3.in', stagger: 0.06,
      })
      .to([loaderRef.current, counterRef.current], {
        opacity: 0, duration: 0.35, ease: 'power2.in',
      }, '<')
      .to(curtainRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1,
        ease: 'power4.inOut',
      }, '+=0.05')
      .to(rootRef.current, { opacity: 0, duration: 0.2 }, '-=0.1');
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* noise grain */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)',
        }}
      />

      {/* exit curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ background: '#080808', transformOrigin: 'bottom center', transform: 'scaleY(0)' }}
      />

      {/* ── CENTER — big name ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8">
        <div className="text-center overflow-hidden mb-1">
          <div className="overflow-hidden">
            <h1
              ref={nameRef}
              className="font-black text-white uppercase"
              style={{
                fontSize: 'clamp(48px, 9vw, 120px)',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
              }}
            >
              Prathikson
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              ref={line2Ref}
              className="font-black uppercase"
              style={{
                fontSize: 'clamp(48px, 9vw, 120px)',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                background: 'linear-gradient(110deg, #fff 20%, #a78bfa 60%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Jeyakumar
            </h1>
          </div>
        </div>

        {/* tagline */}
        <p
          ref={tagRef}
          className="mt-6 text-white/25 text-xs font-semibold uppercase tracking-[0.3em]"
        >
          Full Stack &nbsp;·&nbsp; AI &nbsp;·&nbsp; Xtoic Studio
        </p>
      </div>

      {/* ── BOTTOM LEFT — SVG orbital ── */}
      <div
        ref={loaderRef}
        className="absolute bottom-8 left-8 z-10"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '20px',
          padding: '14px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <SVGLoader progress={progress} />
      </div>

      {/* ── BOTTOM RIGHT — counter ── */}
      <div className="absolute bottom-8 right-8 z-10 text-right">
        <span
          ref={counterRef}
          className="text-white font-black tabular-nums"
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(167,139,250,0.7))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          00%
        </span>
        <p className="text-white/20 text-[9px] uppercase tracking-[0.2em] font-semibold mt-1">
          Loading
        </p>
      </div>

    </div>
  );
};

export default Preloader;