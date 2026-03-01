import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

/* ── Projects data ─────────────────────────────────────────────────── */
const projects = [
  {
    id: "pdfnope",
    title: "PDFnope",
    tag: "Productivity Tool",
    desc: "Clean, instant PDF processing — no sign-ups, no nonsense. Just upload and get it done.",
    href: "https://pdfnope.xtoicstudio.com/",
    img: "/images/project4.png",
    accent: "#f472b6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
        <line x1="12" y1="12" x2="12" y2="18"/>
      </svg>
    ),
  },
  {
    id: "mp4tomp3",
    title: "MP4 → MP3",
    tag: "Converter",
    desc: "On-demand media converter built with Next.js & Express. Fast, browser-based, zero friction.",
    href: "https://mp4-to-mp3-frontend.vercel.app/",
    img: "/images/project1.png",
    accent: "#60a5fa",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    ),
  },
  {
    id: "notezai",
    title: "Notez AI",
    tag: "AI · Productivity",
    desc: "Meeting notes taker powered by AI. Captures, summarises, and organises everything automatically.",
    href: "https://notez-ai-frontend.vercel.app/",
    img: "/images/project2.png",
    accent: "#34d399",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    id: "interviewai",
    title: "Interview AI",
    tag: "AI · Career",
    desc: "Mock interview practice platform. AI-driven questions, real-time feedback, zero nerves.",
    href: "https://interview-ai-dun.vercel.app/sign-in",
    img: "/images/project3.png",
    accent: "#a78bfa",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

/* ── Arrow icon ─────────────────────────────────────────────────────── */
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Single Project Card ─────────────────────────────────────────────── */
const ProjectCard = ({ project, cardRef }) => {
  const { title, tag, desc, href, img, accent, icon } = project;
  const innerRef  = useRef(null);
  const glowRef   = useRef(null);
  const imgRef    = useRef(null);
  const btnRef    = useRef(null);

  const onMouseMove = (e) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    el.style.transform = `perspective(1000px) rotateY(${dx * 6}deg) rotateX(${-dy * 5}deg) translateZ(4px)`;
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top)  / rect.height) * 100;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, ${accent}1a 0%, transparent 65%)`;
    }
  };

  const onMouseEnter = () => {
    if (imgRef.current) {
      imgRef.current.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
      imgRef.current.style.transform  = "scale(1.04)";
    }
    if (btnRef.current) {
      btnRef.current.style.background = accent;
      btnRef.current.style.color      = "#000";
      btnRef.current.style.borderColor = accent;
    }
  };

  const onMouseLeave = () => {
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 0.7s cubic-bezier(0.23,1,0.32,1)";
      innerRef.current.style.transform  = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
      setTimeout(() => { if (innerRef.current) innerRef.current.style.transition = ""; }, 700);
    }
    if (glowRef.current) glowRef.current.style.background = "transparent";
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1)";
    }
    if (btnRef.current) {
      btnRef.current.style.background  = "rgba(255,255,255,0.04)";
      btnRef.current.style.color       = "rgba(255,255,255,0.7)";
      btnRef.current.style.borderColor = "rgba(255,255,255,0.1)";
    }
  };

  return (
    <div ref={cardRef} style={{ opacity: 0 }}>
      <div
        ref={innerRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          position: "relative",
          borderRadius: "22px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* roving glow */}
        <div ref={glowRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, borderRadius: "22px", transition: "background 0.1s ease" }} />
        {/* top shine */}
        <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)", pointerEvents: "none", zIndex: 2 }} />

        {/* image */}
        <div style={{ position: "relative", overflow: "hidden", height: "270px", background: "rgba(0,0,0,0.3)" }}>
          <img
            ref={imgRef}
            src={img}
            alt={title}
            loading="lazy"
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
              display: "block",
            }}
          />
          {/* image overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)", pointerEvents: "none" }} />
          {/* tag pill on image */}
          <div style={{
            position: "absolute", top: 14, left: 14, zIndex: 3,
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", borderRadius: "999px",
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
            border: `1px solid ${accent}30`,
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: accent,
          }}>
            {icon} {tag}
          </div>
        </div>

        {/* body */}
        <div style={{ position: "relative", zIndex: 2, padding: "28px 28px 26px" }}>
          <h3 style={{
            fontSize: "clamp(18px,2vw,22px)", fontWeight: 800,
            color: "#fff", letterSpacing: "-0.025em", marginBottom: "8px", lineHeight: 1.2,
          }}>
            {title}
          </h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "20px" }}>
            {desc}
          </p>

          {/* CTA */}
          <a
            ref={btnRef}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "9px 18px", borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
            }}
          >
            View Live <ArrowIcon />
          </a>

          {/* bottom accent bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
            background: `linear-gradient(90deg, ${accent}60, ${accent}20, transparent)`,
            borderRadius: "0 0 22px 22px",
          }} />
        </div>
      </div>
    </div>
  );
};

/* ── Main Section ───────────────────────────────────────────────────── */
const AppShowcase = () => {
  const sectionRef = useRef(null);
  const cardRefs   = useRef([]);

  useGSAP(() => {
    /* section fade */
    gsap.fromTo(sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    /* staggered card reveal */
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=80",
          },
          delay: i * 0.08,
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} style={{ width: "100%", paddingLeft: "clamp(8px,2vw,32px)", paddingRight: "clamp(8px,2vw,32px)" }}>

      <div style={{ marginBottom: "64px" }}>
        <TitleHeader title="Recent Projects" sub="💻 Featured Works" />
      </div>

      {/* ── 2-col grid, first card is featured (wider) ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "20px",
        maxWidth: "1600px",
        margin: "0 auto",
      }}>

        {/* Featured — PDFnope — 7 cols */}
        <div style={{ gridColumn: "span 7" }}>
          <FeaturedCard project={projects[0]} cardRef={(el) => { cardRefs.current[0] = el; }} />
        </div>

        {/* Side col — MP4→MP3 stacked + Notez — 5 cols */}
        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "20px" }}>
          <ProjectCard project={projects[1]} cardRef={(el) => { cardRefs.current[1] = el; }} />
          <ProjectCard project={projects[2]} cardRef={(el) => { cardRefs.current[2] = el; }} />
        </div>

        {/* Interview AI — full width bottom */}
        <div style={{ gridColumn: "span 12" }}>
          <WideCard project={projects[3]} cardRef={(el) => { cardRefs.current[3] = el; }} />
        </div>

      </div>
    </div>
  );
};

/* ── Featured (tall left) card ──────────────────────────────────────── */
const FeaturedCard = ({ project, cardRef }) => {
  const { title, tag, desc, href, img, accent, icon } = project;
  const innerRef = useRef(null);
  const glowRef  = useRef(null);
  const imgRef   = useRef(null);
  const btnRef   = useRef(null);

  const onMouseMove = (e) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    el.style.transform = `perspective(1000px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg) translateZ(4px)`;
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top)  / rect.height) * 100;
    if (glowRef.current) glowRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, ${accent}18 0%, transparent 60%)`;
  };

  const onMouseEnter = () => {
    if (imgRef.current) { imgRef.current.style.transition = "transform 0.6s cubic-bezier(0.23,1,0.32,1)"; imgRef.current.style.transform = "scale(1.04)"; }
    if (btnRef.current) { btnRef.current.style.background = accent; btnRef.current.style.color = "#000"; btnRef.current.style.borderColor = accent; }
  };

  const onMouseLeave = () => {
    if (innerRef.current) { innerRef.current.style.transition = "transform 0.7s cubic-bezier(0.23,1,0.32,1)"; innerRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)"; setTimeout(() => { if (innerRef.current) innerRef.current.style.transition = ""; }, 700); }
    if (glowRef.current) glowRef.current.style.background = "transparent";
    if (imgRef.current) imgRef.current.style.transform = "scale(1)";
    if (btnRef.current) { btnRef.current.style.background = "rgba(255,255,255,0.05)"; btnRef.current.style.color = "rgba(255,255,255,0.75)"; btnRef.current.style.borderColor = "rgba(255,255,255,0.12)"; }
  };

  return (
    <div ref={cardRef} style={{ opacity: 0, height: "100%" }}>
      <div ref={innerRef} onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
        style={{
          position: "relative", borderRadius: "22px", overflow: "hidden", height: "100%",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          boxShadow: `0 12px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 1px ${accent}08`,
          transformStyle: "preserve-3d", willChange: "transform",
          display: "flex", flexDirection: "column",
        }}>

        <div ref={glowRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, borderRadius: "22px" }} />
        <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)", pointerEvents: "none", zIndex: 2 }} />

        {/* image — bigger for featured */}
        <div style={{ position: "relative", overflow: "hidden", height: "420px", flexShrink: 0 }}>
          <img ref={imgRef} src={img} alt={title} loading="eager"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7) 100%)", pointerEvents: "none" }} />
          {/* FEATURED badge */}
          <div style={{
            position: "absolute", top: 14, left: 14, zIndex: 3,
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "5px 14px", borderRadius: "999px",
            background: `${accent}22`, backdropFilter: "blur(8px)",
            border: `1px solid ${accent}45`,
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: accent,
          }}>
            ★ Featured
          </div>
          <div style={{
            position: "absolute", top: 14, right: 14, zIndex: 3,
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", borderRadius: "999px",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.6)",
          }}>
            {icon} {tag}
          </div>
        </div>

        {/* body */}
        <div style={{ position: "relative", zIndex: 2, padding: "32px 32px 30px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: "10px", lineHeight: 1.1 }}>{title}</h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.48)", lineHeight: 1.75 }}>{desc}</p>
          </div>
          <div style={{ marginTop: "24px" }}>
            <a ref={btnRef} href={href} target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "11px 22px", borderRadius: "14px",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: 700,
                letterSpacing: "0.04em", textDecoration: "none",
                transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
              }}>
              View Live <ArrowIcon />
            </a>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${accent}70, ${accent}20, transparent)`, borderRadius: "0 0 22px 22px" }} />
        </div>
      </div>
    </div>
  );
};

/* ── Wide bottom card ───────────────────────────────────────────────── */
const WideCard = ({ project, cardRef }) => {
  const { title, tag, desc, href, img, accent, icon } = project;
  const innerRef = useRef(null);
  const glowRef  = useRef(null);
  const imgRef   = useRef(null);
  const btnRef   = useRef(null);

  const onMouseMove = (e) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    el.style.transform = `perspective(1200px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg) translateZ(3px)`;
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top)  / rect.height) * 100;
    if (glowRef.current) glowRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, ${accent}14 0%, transparent 60%)`;
  };

  const onMouseEnter = () => {
    if (imgRef.current) { imgRef.current.style.transition = "transform 0.6s cubic-bezier(0.23,1,0.32,1)"; imgRef.current.style.transform = "scale(1.05)"; }
    if (btnRef.current) { btnRef.current.style.background = accent; btnRef.current.style.color = "#000"; btnRef.current.style.borderColor = accent; }
  };

  const onMouseLeave = () => {
    if (innerRef.current) { innerRef.current.style.transition = "transform 0.7s cubic-bezier(0.23,1,0.32,1)"; innerRef.current.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)"; setTimeout(() => { if (innerRef.current) innerRef.current.style.transition = ""; }, 700); }
    if (glowRef.current) glowRef.current.style.background = "transparent";
    if (imgRef.current) imgRef.current.style.transform = "scale(1)";
    if (btnRef.current) { btnRef.current.style.background = "rgba(255,255,255,0.04)"; btnRef.current.style.color = "rgba(255,255,255,0.7)"; btnRef.current.style.borderColor = "rgba(255,255,255,0.1)"; }
  };

  return (
    <div ref={cardRef} style={{ opacity: 0 }}>
      <div ref={innerRef} onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
        style={{
          position: "relative", borderRadius: "22px", overflow: "hidden",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          transformStyle: "preserve-3d", willChange: "transform",
          display: "grid", gridTemplateColumns: "1fr 1.4fr",
        }}>

        <div ref={glowRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, borderRadius: "22px" }} />
        <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)", pointerEvents: "none", zIndex: 2 }} />

        {/* text side */}
        <div style={{ position: "relative", zIndex: 2, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", background: `${accent}14`, border: `1px solid ${accent}30`, width: "fit-content", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: accent }}>
            {icon} {tag}
          </div>
          <h3 style={{ fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.15 }}>{title}</h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>{desc}</p>
          <a ref={btnRef} href={href} target="_blank" rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px", width: "fit-content",
              padding: "10px 20px", borderRadius: "12px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.04em", textDecoration: "none", marginTop: "8px",
              transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
            }}>
            View Live <ArrowIcon />
          </a>
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "40%", height: "2px", background: `linear-gradient(90deg, ${accent}60, transparent)` }} />
        </div>

        {/* image side */}
        <div style={{ position: "relative", overflow: "hidden", height: "280px" }}>
          <img ref={imgRef} src={img} alt={title} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 40%)", pointerEvents: "none" }} />
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
