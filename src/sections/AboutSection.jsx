'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

import bookImage from '../assets/images/book-cover.png';
import TitleHeader from '../components/TitleHeader';

/* ─── Data ───────────────────────────────────────────────────────────── */
const hobbies = [
  { title: 'Soccer',    emoji: '⚽', left: '4%',  top: '10%' },
  { title: 'Music',     emoji: '🎧', left: '46%', top: '8%'  },
  { title: 'Hiking',    emoji: '🏔️', left: '6%',  top: '48%' },
  { title: 'Gym',       emoji: '🏋️', left: '30%', top: '52%' },
  { title: 'Traveling', emoji: '✈️', left: '62%', top: '40%' },
  { title: 'Cooking',   emoji: '🍝', left: '5%',  top: '76%' },
  { title: 'Gaming',    emoji: '🎮', left: '52%', top: '74%' },
];

const PILL_COLORS = [
  { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.14)' },
  { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.30)'   },
  { bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.30)'  },
  { bg: 'rgba(234,179,8,0.10)',   border: 'rgba(234,179,8,0.28)'   },
  { bg: 'rgba(34,197,94,0.10)',   border: 'rgba(34,197,94,0.26)'   },
  { bg: 'rgba(14,165,233,0.10)',  border: 'rgba(14,165,233,0.26)'  },
  { bg: 'rgba(168,85,247,0.10)',  border: 'rgba(168,85,247,0.26)'  },
];

/* ─── Liquid Glass Card ──────────────────────────────────────────────── */
const GlassCard = ({ children, style = {} }) => {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    gsap.to(el, { rotateY: dx * 5, rotateX: -dy * 4, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width)  * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - rect.top)  / rect.height) * 100}%`);
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1,0.5)' });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        boxShadow: '0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        height: '100%',
        ...style,
      }}
    >
      {/* roving shimmer */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.06) 0%, transparent 60%)',
      }} />
      {/* top edge shine */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>{children}</div>
    </div>
  );
};

/* ─── Book Visual ────────────────────────────────────────────────────── */
const BookVisual = () => {
  const bookRef = useRef(null);
  return (
    <div
      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '600px' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
        const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
        gsap.to(bookRef.current, { rotateY: dx * 16, rotateX: -dy * 12, scale: 1.05, duration: 0.35, ease: 'power2.out' });
      }}
      onMouseLeave={() => gsap.to(bookRef.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1,0.55)' })}
    >
      <div ref={bookRef} style={{ transformStyle: 'preserve-3d', filter: 'drop-shadow(0 24px 36px rgba(0,0,0,0.6))' }}>
        <img src={bookImage} alt="Book Cover" style={{ width: '120px', height: 'auto', objectFit: 'contain', borderRadius: '4px', display: 'block' }} draggable={false} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg,rgba(255,255,255,0.1) 0%,transparent 55%)', borderRadius: '4px', pointerEvents: 'none' }} />
      </div>
    </div>
  );
};

/* ─── Social Link ────────────────────────────────────────────────────── */
const SocialLink = ({ label, href, icon, color }) => {
  const ref = useRef(null);
  return (
    <a ref={ref} href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => gsap.to(ref.current, { x: 5, duration: 0.2, ease: 'power2.out' })}
      onMouseLeave={() => gsap.to(ref.current, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.6)' })}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '11px 16px', borderRadius: '14px',
        background: `${color}0C`, border: `1px solid ${color}22`,
        color, textDecoration: 'none', fontSize: '13px', fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    >
      {icon} {label}
    </a>
  );
};

/* ─── Icons ──────────────────────────────────────────────────────────── */
const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ─── Label ──────────────────────────────────────────────────────────── */
const Label = ({ children }) => (
  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
    {children}
  </p>
);

/* ─── Main Section ───────────────────────────────────────────────────── */
const AboutSection = () => {
  const constraintRef = useRef(null);
  const hobbyRefs     = useRef([]);
  const draggables    = useRef([]);
  const gridRef       = useRef(null);

  /* grid entrance */
  useEffect(() => {
    if (!gridRef.current) return;
    const cells = gridRef.current.querySelectorAll('[data-cell]');
    gsap.fromTo(cells,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.1 }
    );
  }, []);

  /* pill entrance — triggered once constraint ref is ready */
  useEffect(() => {
    if (!constraintRef.current) return;
    const pills = constraintRef.current.querySelectorAll('.hobby-pill');
    gsap.fromTo(pills,
      { opacity: 0, scale: 0.65, y: 14 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.06, delay: 0.6 }
    );
  }, []);

  /* draggable */
  useEffect(() => {
    gsap.registerPlugin(Draggable);
    // small timeout so DOM is fully painted
    const t = setTimeout(() => {
      draggables.current = hobbyRefs.current.filter(Boolean).flatMap((el) =>
        Draggable.create(el, {
          bounds: constraintRef.current,
          type: 'x,y',
          inertia: true,
          cursor: 'grabbing',
          onPress()   { gsap.to(el, { scale: 1.08, duration: 0.18, ease: 'power2.out' }); },
          onRelease() { gsap.to(el, { scale: 1,    duration: 0.4,  ease: 'elastic.out(1,0.6)' }); },
        })
      );
    }, 100);
    return () => {
      clearTimeout(t);
      draggables.current.forEach((d) => d.kill());
    };
  }, []);

  return (
    <section id="about" className="w-full md:mt-20 mt-10 section-padding xl:px-10">
      <div className="w-full h-full px-4 md:px-10 xl:px-16">

        <TitleHeader title="Me and My World" sub="❤️ About me" />

        <div style={{ marginTop: '72px', marginBottom: '96px' }} ref={gridRef}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridAutoRows: 'auto',
            gap: '14px',
            maxWidth: '100%',
          }}>

            {/* ── ROW 1 ── */}

            {/* 1A · Identity — 5 cols, tall */}
            <div data-cell style={{ gridColumn: 'span 5', gridRow: 'span 2' }}>
              <GlassCard>
                <div style={{ padding: '36px 32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                  <div>
                    {/* status pill */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.28)', borderRadius: '999px', padding: '4px 13px', marginBottom: '28px' }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 8px #a78bfa', display: 'inline-block' }} />
                      <span style={{ fontSize: '11px', color: '#c4b5fd', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Open to work</span>
                    </div>
                    <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '14px' }}>
                      Prathikson<br />Jeyakumar
                    </h2>
                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '300px' }}>
                      Full Stack Developer & Operations Manager.{' '}
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>Founder of Xtoic Studio</span>
                      {' '}— a creative agency crafting bold digital experiences.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '28px' }}>
                    {['Builder', 'Creator', 'Founder'].map((tag) => (
                      <span key={tag} style={{
                        padding: '5px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 700,
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                        color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* 1B · Xtoic Studio — 4 cols */}
            <div data-cell style={{ gridColumn: 'span 4' }}>
              <GlassCard style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(99,102,241,0.07) 100%)' }}>
                <div style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '28px' }}>🏛️</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.015em' }}>Xtoic Studio</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
                    Creative & design-development agency crafting next-level digital experiences for forward-thinking brands.
                  </p>
                  <a href="https://xtoicstudio.com" target="_blank" rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#c4b5fd', fontWeight: 700, letterSpacing: '0.05em', textDecoration: 'none', marginTop: '4px' }}>
                    Visit Studio →
                  </a>
                </div>
              </GlassCard>
            </div>

            {/* 1C · Connect — 3 cols */}
            <div data-cell style={{ gridColumn: 'span 3' }}>
              <GlassCard>
                <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                  <Label>Connect</Label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <SocialLink label="GitHub"   href="https://github.com/prathikson"      icon={<GithubIcon />}   color="#e2e8f0" />
                    <SocialLink label="LinkedIn" href="https://www.linkedin.com/in/prathikson-jeyakumar-b06956220/" icon={<LinkedInIcon />} color="#60a5fa" />
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* ── ROW 2 continues identity (span 2 above) ── */}

            {/* 2B · What I Do — 4 cols */}
            <div data-cell style={{ gridColumn: 'span 4' }}>
              <GlassCard>
                <div style={{ padding: '28px 28px' }}>
                  <Label>What I Do</Label>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
                    {[
                      { icon: '⚡', text: 'Full-stack digital products' },
                      { icon: '🤖', text: 'LLM & Agentic AI systems' },
                      { icon: '🎨', text: 'Creative UI/UX & design' },
                      { icon: '🏢', text: 'Operations & strategy' },
                    ].map(({ icon, text }) => (
                      <li key={text} style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <span style={{ fontSize: '16px', flexShrink: 0 }}>{icon}</span>
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>

            {/* 2C · Philosophy — 3 cols */}
            <div data-cell style={{ gridColumn: 'span 3' }}>
              <GlassCard style={{ background: 'linear-gradient(160deg, rgba(14,165,233,0.08) 0%, rgba(99,102,241,0.06) 100%)' }}>
                <div style={{ padding: '28px 24px' }}>
                  <Label>Philosophy</Label>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, letterSpacing: '-0.01em' }}>
                    "Engineering precision meets{' '}
                    <span style={{ color: '#7dd3fc' }}>creative vision</span>
                    {' '}— every line of code is a design decision."
                  </p>
                </div>
              </GlassCard>
            </div>

            {/* ── ROW 3 ── */}

            {/* 3A · Hobbies — 8 cols */}
            <div data-cell style={{ gridColumn: 'span 8' }}>
              <GlassCard>
                <div style={{ display: 'flex', flexDirection: 'column', height: '320px' }}>
                  <div style={{ padding: '22px 26px 10px', flexShrink: 0 }}>
                    <Label>Touch the Grass</Label>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '-8px' }}>Drag & explore my world beyond the screen</p>
                  </div>
                  {/* constraint box — pills are direct children so Draggable bounds work */}
                  <div
                    ref={constraintRef}
                    style={{
                      position: 'relative',
                      flex: 1,
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)`,
                      backgroundSize: '44px 44px',
                    }}
                  >
                    <span style={{ position: 'absolute', bottom: 10, right: 14, fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.13)', fontFamily: 'monospace', pointerEvents: 'none' }}>drag me</span>

                    {hobbies.map((hobby, i) => {
                      const { bg, border } = PILL_COLORS[i % PILL_COLORS.length];
                      return (
                        <div
                          key={hobby.title}
                          ref={(el) => { hobbyRefs.current[i] = el; }}
                          className="hobby-pill"
                          style={{
                            position: 'absolute',
                            left: hobby.left,
                            top: hobby.top,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '7px 16px',
                            borderRadius: '999px',
                            background: bg,
                            border: `1px solid ${border}`,
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            cursor: 'grab',
                            userSelect: 'none',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.88)', letterSpacing: '0.01em' }}>{hobby.title}</span>
                          <span style={{ fontSize: '15px', lineHeight: 1 }}>{hobby.emoji}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* 3B · My Reads — 4 cols */}
            <div data-cell style={{ gridColumn: 'span 4' }}>
              <GlassCard>
                <div style={{ display: 'flex', flexDirection: 'column', height: '320px' }}>
                  <div style={{ padding: '22px 26px 10px', flexShrink: 0 }}>
                    <Label>My Reads</Label>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '-8px' }}>Books I like</p>
                  </div>
                  <BookVisual />
                </div>
              </GlassCard>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;