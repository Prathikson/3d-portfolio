'use client'

import React, { useRef, useEffect } from 'react'
import { abilities } from '../constants'

/* ─────────────────────────────────────────────
   Inline SVG icon set — one per common ability
   Falls back to a generic star if no match
───────────────────────────────────────────── */
const IconMap = {
  /* adapt these keys to match your abilities titles */
  default: ({ color }) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3l2.5 7.5H24l-6.2 4.5 2.4 7.5L14 18l-6.2 4.5 2.4-7.5L4 10.5h7.5z" fill={color} opacity="0.9"/>
    </svg>
  ),
  /* ── Flexible ── */
  flexible: ({ color }) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5 14C5 9.03 9.03 5 14 5" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M23 14C23 18.97 18.97 23 14 23" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="14" cy="14" r="3.5" fill={color}/>
      <path d="M20 7l1.5-2.5 1.5 2.5-2.5 1.5z" fill={color} opacity="0.6"/>
      <path d="M8 21l-1.5 2.5-1.5-2.5 2.5-1.5z" fill={color} opacity="0.6"/>
    </svg>
  ),
  /* ── Adaptive ── */
  adaptive: ({ color }) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="2" fill={color} opacity="0.5"/>
      <rect x="16" y="4" width="8" height="8" rx="2" fill={color} opacity="0.8"/>
      <rect x="4" y="16" width="8" height="8" rx="2" fill={color} opacity="0.8"/>
      <rect x="16" y="16" width="8" height="8" rx="2" fill={color} opacity="0.5"/>
      <circle cx="14" cy="14" r="2.5" fill={color}/>
    </svg>
  ),
  /* ── Scalable ── */
  scalable: ({ color }) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M6 22L22 6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 6h8v8" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="22" r="2.5" fill={color} opacity="0.6"/>
    </svg>
  ),
}

/* pick icon by loosely matching title */
const getIcon = (title, color) => {
  const key = title.toLowerCase()
  const match = Object.keys(IconMap).find(k => k !== 'default' && key.includes(k))
  const Comp = match ? IconMap[match] : IconMap.default
  return <Comp color={color} />
}

/* ─────────────────────────────────────────────
   Accent colours cycling per card
───────────────────────────────────────────── */
const ACCENTS = ['#a78bfa', '#60a5fa', '#34d399', '#f472b6', '#fb923c', '#facc15']

/* ─────────────────────────────────────────────
   Single liquid glass card
───────────────────────────────────────────── */
const FeatureCard = ({ imgPath, title, desc, index }) => {
  const cardRef  = useRef(null)
  const glowRef  = useRef(null)
  const iconRef  = useRef(null)
  const accent   = ACCENTS[index % ACCENTS.length]

  /* 3D tilt + roving glow on mouse move */
  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width  / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)

    el.style.transform = `perspective(900px) rotateY(${dx * 8}deg) rotateX(${-dy * 7}deg) translateZ(6px)`

    const gx = ((e.clientX - rect.left) / rect.width)  * 100
    const gy = ((e.clientY - rect.top)  / rect.height) * 100
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, ${accent}22 0%, transparent 65%)`
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.7s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease'
      cardRef.current.style.transform  = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transition = ''
      }, 700)
    }
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at 50% 50%, transparent 0%, transparent 65%)`
    }
  }

  /* icon bob on enter */
  const handleMouseEnter = () => {
    if (!iconRef.current) return
    iconRef.current.animate(
      [{ transform: 'translateY(0px) scale(1)' }, { transform: 'translateY(-5px) scale(1.15)' }, { transform: 'translateY(0px) scale(1)' }],
      { duration: 500, easing: 'cubic-bezier(0.34,1.56,0.64,1)' }
    )
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        position: 'relative',
        borderRadius: '24px',
        padding: '32px 28px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        boxShadow: `0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 0 ${accent}00`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* roving glow */}
      <div ref={glowRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, transition: 'background 0.15s ease', borderRadius: '24px' }} />

      {/* top-edge shine */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)', pointerEvents: 'none', zIndex: 1 }} />

      {/* accent corner arc */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 120, height: 120,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '0' }}>

        {/* icon wrapper */}
        <div ref={iconRef} style={{
          width: 56, height: 56,
          borderRadius: '16px',
          background: `${accent}14`,
          border: `1px solid ${accent}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '22px',
          boxShadow: `0 4px 20px ${accent}20`,
          flexShrink: 0,
        }}>
          {imgPath
            ? <img src={imgPath} alt={title} style={{ width: 28, height: 28, objectFit: 'contain' }} />
            : getIcon(title, accent)
          }
        </div>

        {/* number index */}
        <span style={{
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: `${accent}99`,
          marginBottom: '8px',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3 style={{
          fontSize: 'clamp(17px,1.6vw,21px)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          marginBottom: '12px',
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.48)',
          lineHeight: 1.7,
          fontWeight: 400,
        }}>
          {desc}
        </p>

        {/* bottom accent line */}
        <div style={{
          marginTop: '28px',
          height: '2px',
          borderRadius: '2px',
          background: `linear-gradient(90deg, ${accent}60, ${accent}10, transparent)`,
          width: '60%',
        }} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Section wrapper with staggered entrance
───────────────────────────────────────────── */
const FeatureCards = () => {
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!wrapRef.current) return
    const cards = wrapRef.current.querySelectorAll('[data-card]')
    cards.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(32px) scale(0.97)'
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.23,1,0.32,1)'
        card.style.opacity = '1'
        card.style.transform = 'translateY(0px) scale(1)'
      }, 120 * i + 80)
    })
  }, [])

  return (
    <div className="w-full padding-x-lg mt-42">
      <div
        ref={wrapRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '18px',
          maxWidth: '100%',
        }}
      >
        {abilities.map(({ imgPath, title, desc }, i) => (
          <div key={title} data-card>
            <FeatureCard imgPath={imgPath} title={title} desc={desc} index={i} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureCards