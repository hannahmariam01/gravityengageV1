import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Box, Zap, Globe, MousePointer2, Aperture } from 'lucide-react';
import ParticleField from './ParticleField';
import CrystalOrb from './CrystalOrb';

const LENS_DATA = {
  build: {
    number: '01', label: 'Build', rgb: '139, 92, 246',
    headline: "Design systems built for scale.",
    subtext: "End-to-end design capabilities across product, brand, and experience.",
    categories: [
      { title: "Product", items: ["UI/UX Design", "Interaction Design", "Design Systems", "Prototyping"] },
      { title: "Brand", items: ["Brand Strategy", "Visual Identity", "Brand Guidelines", "Communication Design"] },
      { title: "Motion", items: ["Motion Design", "Micro-interactions", "Product Animation", "Explainer Videos"] },
      { title: "Strategy", items: ["UX Strategy", "Product Thinking", "User Research", "Information Architecture"] }
    ],
    cta: "Start a project"
  },
  understand: {
    number: '02', label: 'Understand', rgb: '139, 92, 246',
    headline: "Structured thinking. Measurable outcomes.",
    subtext: "Our approach combines research, systems thinking, and iterative design.",
    categories: [
      { title: "Content", items: ["Case Studies", "Product Redesigns", "Platform Experiences", "Brand Transformations", "System Implementations"] },
      { title: "Thinking", items: ["Design Frameworks", "Decision Models", "Experience Principles", "System Mapping"] },
      { title: "Process", items: ["Discovery", "Definition", "Design", "Validation", "Delivery"] }
    ],
    cta: "View work"
  },
  industry: {
    number: '03', label: 'Industry', rgb: '139, 92, 246',
    headline: "Context-driven design.",
    subtext: "We work across sectors with tailored design approaches.",
    categories: [
      { title: "Industries", items: ["Healthcare", "Fintech", "SaaS", "E-commerce", "Startups", "Enterprise", "Education", "Mobility"] }
    ],
    cta: "Discuss your use case"
  },
};

const LENSES = Object.entries(LENS_DATA).map(([id, d]) => ({ id, ...d }));

/* ── Top glassmorphic organic shape ─────── */
const LensShape = ({ lens, hovered, active, onHover, onLeave, onClick }) => {
  const isActive  = active  === lens.id;
  const isHovered = hovered === lens.id;
  const isDimmed  = (active || hovered) && !isActive && !isHovered;
  const lit       = isActive || isHovered;

  return (
    <motion.div
      className={`lens-shape lens-shape--${lens.id}${isDimmed ? ' lens-shape--dimmed' : ''}${isActive ? ' lens-shape--active' : ''}`}
      style={{
        '--label-rgb': lens.rgb,
        borderColor: lit
          ? `rgba(${lens.rgb}, 0.55)`
          : 'rgba(255,255,255,0.06)',
        boxShadow: lit
          ? `0 0 50px rgba(${lens.rgb},0.22), inset 0 0 20px rgba(${lens.rgb},0.1)`
          : '0 8px 32px rgba(0,0,0,0.18)',
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => onHover(lens.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(lens.id)}
    >
      <div className="lens-shape-content">
        <span className="lens-shape-number">{lens.number}</span>
        <span
          className="lens-shape-label"
          style={{ color: lit ? `#fff` : 'rgba(255,255,255,0.55)' }}
        >
          {lens.label}
        </span>
      </div>
      <div className={`lens-active-indicator ${lit ? 'lit' : ''}`} style={{ background: `rgb(${lens.rgb})` }} />
    </motion.div>
  );
};

/* ── Negative space info blocks ───────────── */
const NegativeSpaceInfo = ({ lens }) => {
  const d = LENS_DATA[lens];
  if (!d) return null;

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
  const item    = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25,0.46,0.45,0.94] } } };

  return (
    <div className="lens-info-overlay">
      <motion.div
        className="lens-info-grid"
        variants={stagger} initial="hidden" animate="visible"
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {/* TOP: Headline and Subtext */}
        <div className="lens-info-header">
          <motion.h2 className="lens-info-headline" variants={item}>{d.headline}</motion.h2>
          <motion.p className="lens-info-subtext" variants={item}>{d.subtext}</motion.p>
        </div>

        {/* BOTTOM: Split Categories */}
        <div className="lens-info-categories">
          {d.categories.map((cat, idx) => (
            <motion.div key={cat.title} className="lens-info-cat" variants={item}>
              <h4 className="cat-title" style={{ color: `rgba(${d.rgb}, 0.6)` }}>{cat.title}</h4>
              <ul className="cat-list">
                {cat.items.map(li => <li key={li}>{li}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="lens-info-footer" variants={item}>
          <a href="#contact" className="lens-cta" style={{ borderColor: `rgba(${d.rgb}, 0.35)`, background: `rgba(${d.rgb}, 0.05)` }}>
            {d.cta} →
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ── Main LensWorld ───────────────────────── */
const LensWorld = ({ activeLens, setActiveLens, hoveredLens, setHoveredLens, scrollRef }) => {
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const sectionRef = useRef();

  const [mounted, setMounted] = useState(false);
  const [promptState, setPromptState] = useState(0);

  useEffect(() => {
    if (activeLens) return;
    const interval = setInterval(() => {
      setPromptState(p => (p + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeLens]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const bgState = activeLens || hoveredLens || 'idle';

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleHover = (id) => { if (!activeLens) setHoveredLens(id); };
  const handleLeave = ()  => { if (!activeLens) setHoveredLens(null); };
  const handleClick = (id) => {
    setActiveLens(prev => (prev === id ? null : id));
    setHoveredLens(null);
  };

  const glowRGB = activeLens
    ? LENS_DATA[activeLens]?.rgb
    : hoveredLens
      ? LENS_DATA[hoveredLens]?.rgb
      : '100,110,255';

  return (
    <section
      ref={sectionRef}
      className="lens-world"
      id="home"
      onMouseMove={handleMouseMove}
    >
      {/* ── Background layers ── */}
      {[
        { key: 'idle',       src: '/bg2@2x-100.jpg', filter: 'brightness(0.52)' },
        { key: 'build',      src: '/bg1@2x-100.jpg', filter: 'brightness(0.52)' },
        { key: 'understand', src: '/bg2@2x-100.jpg', filter: 'brightness(0.52)' },
        { key: 'industry',   src: '/bg1@2x-100.jpg', filter: 'brightness(0.52)' },
      ].map(({ key, src, filter }) => (
        <div
          key={key}
          className="lens-bg-layer"
          style={{
            opacity: bgState === key ? 1 : 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter,
          }}
        />
      ))}

      {/* ── Arc glow overlay ── */}
      <div className="hero-arc-glow" />
      <div className="hero-arc-ring" />

      {/* ── Cursor glow ── */}
      <div
        className="cursor-glow"
        style={{
          left: cursorPos.x,
          top:  cursorPos.y,
          background: `radial-gradient(circle, rgba(${glowRGB},0.12) 0%, transparent 70%)`,
        }}
      />

      {/* ── Three.js Canvas ── */}
      <div className="lens-canvas" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 22], fov: 38 }}
            gl={{ antialias: false, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <ParticleField
              activeLens={activeLens || hoveredLens || (promptState === 1 ? 'build' : promptState === 2 ? 'industry' : null)}
              scrollRef={scrollRef}
            />
          </Canvas>
        )}
      </div>

      {/* ── IDLE & HOVERED: central prompt ── */}
      <AnimatePresence mode="wait">
        {!activeLens && promptState !== 2 && (
          <motion.div
            key="central-loop"
            className="central-prompt"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)', transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="prompt-headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%" }}
            >
              <AnimatePresence mode="wait">
                {promptState === 0 && (
                  <motion.div key="st0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
                    <span style={{ fontSize: '0.35em', display: 'block', marginBottom: '10px', fontWeight: 400, opacity: 0.8, fontFamily: "'Poppins', sans-serif", letterSpacing: '0.15em' }}>The problem</span>Ideas break down between human complexity and technical execution.
                  </motion.div>
                )}
                {promptState === 1 && (
                  <motion.div key="st1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
                    <span style={{ fontSize: '0.35em', display: 'block', marginBottom: '10px', fontWeight: 400, opacity: 0.8, fontFamily: "'Poppins', sans-serif", letterSpacing: '0.15em' }}>What we do</span>
                    We turn complexity into products, systems,<br />
                    and experiences that work.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}

        {!activeLens && promptState === 2 && (
          <motion.div
            key="st2-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'absolute', inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "6rem 6rem 6rem 12rem", zIndex: 10, pointerEvents: 'none' }}
          >
            <h2 style={{ fontSize: "35px", fontWeight: 300, lineHeight: "1.4", color: "#ffffff", margin: "0 0 4rem 0", textAlign: "left", maxWidth: "1100px", width: "100%", pointerEvents: 'auto' }}>
              How we bridge the gap
            </h2>
            <div style={{ width: "100%", maxWidth: "1200px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem 6rem", textAlign: "left", fontFamily: "'Poppins', sans-serif", pointerEvents: 'auto' }}>

              {/* Item 1 */}
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ marginTop: "0.5rem", filter: "drop-shadow(0 0 10px rgba(137, 207, 240, 0.4))", flexShrink: 0 }}>
                  <img src="/accelerated.svg" alt="Icon" style={{ width: 48, height: 48 }} />
                </div>
                <div style={{ borderLeft: "2px solid rgba(137, 207, 240, 0.5)", paddingLeft: "2rem", width: "100%" }}>
                  <h3 style={{ fontSize: "28px", fontWeight: 600, color: "#ffffff", marginBottom: "0.25rem", lineHeight: "1.2", marginTop: 0 }}>Accelerated Innovation &</h3>
                  <h3 style={{ fontSize: "28px", fontWeight: 600, color: "#ffffff", marginBottom: "0.5rem", lineHeight: "1.2", marginTop: 0 }}>Prototyping</h3>
                  <p style={{ fontSize: "15px", lineHeight: "1.5", fontWeight: 300, color: "rgba(255, 255, 255, 0.7)", margin: 0, marginBottom: "1.5rem" }}>Using AI-driven workflows to move from concept to high-fidelity prototypes in days.</p>
                  <div style={{ display: "flex", flexWrap: "nowrap", gap: "0.4rem", width: "100%" }}>
                    <span style={{ backgroundColor: "rgba(137, 207, 240, 0.08)", border: "1px solid rgba(137, 207, 240, 0.2)", color: "#89cff0", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "11.5px", fontWeight: 400, whiteSpace: "nowrap" }}>Interactive Prototypes</span>
                    <span style={{ backgroundColor: "rgba(137, 207, 240, 0.08)", border: "1px solid rgba(137, 207, 240, 0.2)", color: "#89cff0", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "11.5px", fontWeight: 400, whiteSpace: "nowrap" }}>Technical Roadmaps</span>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ marginTop: "0.5rem", filter: "drop-shadow(0 0 10px rgba(137, 207, 240, 0.4))", flexShrink: 0 }}>
                  <img src="/digital%20product.svg" alt="Icon" style={{ width: 48, height: 48 }} />
                </div>
                <div style={{ borderLeft: "2px solid rgba(137, 207, 240, 0.5)", paddingLeft: "2rem", width: "100%" }}>
                  <h3 style={{ fontSize: "28px", fontWeight: 600, color: "#ffffff", marginBottom: "0.25rem", lineHeight: "1.2", marginTop: 0 }}>Digital Product &</h3>
                  <h3 style={{ fontSize: "28px", fontWeight: 600, color: "#ffffff", marginBottom: "0.5rem", lineHeight: "1.2", marginTop: 0 }}>System Design</h3>
                  <p style={{ fontSize: "15px", lineHeight: "1.5", fontWeight: 300, color: "rgba(255, 255, 255, 0.7)", margin: 0, marginBottom: "1.5rem" }}>User research, experience and interface design and thorough development handoff to bring concepts to reality.</p>
                  <div style={{ display: "flex", flexWrap: "nowrap", gap: "0.4rem", width: "100%" }}>
                    <span style={{ backgroundColor: "rgba(137, 207, 240, 0.08)", border: "1px solid rgba(137, 207, 240, 0.2)", color: "#89cff0", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "11.5px", fontWeight: 400, whiteSpace: "nowrap" }}>User Flow Maps</span>
                    <span style={{ backgroundColor: "rgba(137, 207, 240, 0.08)", border: "1px solid rgba(137, 207, 240, 0.2)", color: "#89cff0", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "11.5px", fontWeight: 400, whiteSpace: "nowrap" }}>Scalable Design Systems</span>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ marginTop: "0.5rem", filter: "drop-shadow(0 0 10px rgba(137, 207, 240, 0.4))", flexShrink: 0 }}>
                  <img src="/immersive.svg" alt="Icon" style={{ width: 48, height: 48 }} />
                </div>
                <div style={{ borderLeft: "2px solid rgba(137, 207, 240, 0.5)", paddingLeft: "2rem", width: "100%" }}>
                  <h3 style={{ fontSize: "28px", fontWeight: 600, color: "#ffffff", marginBottom: "0.25rem", lineHeight: "1.2", marginTop: 0 }}>Immersive Narratives &</h3>
                  <h3 style={{ fontSize: "28px", fontWeight: 600, color: "#ffffff", marginBottom: "0.5rem", lineHeight: "1.2", marginTop: 0 }}>Experiences</h3>
                  <p style={{ fontSize: "15px", lineHeight: "1.5", fontWeight: 300, color: "rgba(255, 255, 255, 0.7)", margin: 0, marginBottom: "1.5rem" }}>We design spatial and interactive experiences to tell compelling stories and support product understanding.</p>
                  <div style={{ display: "flex", flexWrap: "nowrap", gap: "0.4rem", width: "100%" }}>
                    <span style={{ backgroundColor: "rgba(137, 207, 240, 0.08)", border: "1px solid rgba(137, 207, 240, 0.2)", color: "#89cff0", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "11.5px", fontWeight: 400, whiteSpace: "nowrap" }}>3D Environments</span>
                    <span style={{ backgroundColor: "rgba(137, 207, 240, 0.08)", border: "1px solid rgba(137, 207, 240, 0.2)", color: "#89cff0", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "11.5px", fontWeight: 400, whiteSpace: "nowrap" }}>Spatial Visual Assets</span>
                  </div>
                </div>
              </div>

              {/* Item 4 */}
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ marginTop: "0.5rem", filter: "drop-shadow(0 0 10px rgba(137, 207, 240, 0.4))", flexShrink: 0 }}>
                  <img src="/ecosystem.svg" alt="Icon" style={{ width: 48, height: 48 }} />
                </div>
                <div style={{ borderLeft: "2px solid rgba(137, 207, 240, 0.5)", paddingLeft: "2rem", width: "100%" }}>
                  <h3 style={{ fontSize: "28px", fontWeight: 600, color: "#ffffff", marginBottom: "0.25rem", lineHeight: "1.2", marginTop: 0 }}>Ecosystem Visualization &</h3>
                  <h3 style={{ fontSize: "28px", fontWeight: 600, color: "#ffffff", marginBottom: "0.5rem", lineHeight: "1.2", marginTop: 0 }}>Digital Systems</h3>
                  <p style={{ fontSize: "15px", lineHeight: "1.5", fontWeight: 300, color: "rgba(255, 255, 255, 0.7)", margin: 0, marginBottom: "1.5rem" }}>Mapping data, workflows, and system relationships into clear visual structures, making gaps easier to identify.</p>
                  <div style={{ display: "flex", flexWrap: "nowrap", gap: "0.4rem", width: "100%" }}>
                    <span style={{ backgroundColor: "rgba(137, 207, 240, 0.08)", border: "1px solid rgba(137, 207, 240, 0.2)", color: "#89cff0", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "11.5px", fontWeight: 400, whiteSpace: "nowrap" }}>Interactive Infographics</span>
                    <span style={{ backgroundColor: "rgba(137, 207, 240, 0.08)", border: "1px solid rgba(137, 207, 240, 0.2)", color: "#89cff0", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "11.5px", fontWeight: 400, whiteSpace: "nowrap" }}>Visual Dashboards</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM DOT NAVIGATION ── */}
      {!activeLens && (
        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 100, pointerEvents: 'auto' }}>
          <button onClick={() => setPromptState(p => p === 0 ? 2 : p - 1)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', padding: '0.5rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[0, 1, 2].map(idx => (
              <button 
                key={idx} 
                onClick={() => setPromptState(idx)} 
                style={{ width: 10, height: 10, borderRadius: '50%', background: promptState === idx ? '#fff' : 'rgba(255,255,255,0.3)', border: 'none', padding: 0, cursor: 'pointer', transition: 'background 0.3s ease' }} 
              />
            ))}
          </div>

          <button onClick={() => setPromptState(p => (p + 1) % 3)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', padding: '0.5rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      )}

      {/* ── ACTIVE: Crystal orb (video inside sphere) ── */}
      <AnimatePresence mode="wait">
        {activeLens && <CrystalOrb key={activeLens} lens={activeLens} />}
      </AnimatePresence>

      {/* ── ACTIVE: Negative space info ── */}
      <AnimatePresence mode="wait">
        {activeLens && (
          <NegativeSpaceInfo key={activeLens} lens={activeLens} />
        )}
      </AnimatePresence>

    </section>
  );
};

export default LensWorld;
