import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function GravityGameSpace() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(137, 207, 240, ${particle.opacity})`;
        ctx.fill();
      });
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(137, 207, 240, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        body, html, #root {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #000;
          font-family: 'Inter', sans-serif;
        }

        .content-container::-webkit-scrollbar {
          width: 8px;
        }
        .content-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .content-container::-webkit-scrollbar-thumb {
          background: rgba(137, 207, 240, 0.3);
          border-radius: 4px;
        }
        .content-container::-webkit-scrollbar-thumb:hover {
          background: rgba(137, 207, 240, 0.5);
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(137, 207, 240, 0.4); }
          50% { box-shadow: 0 0 40px rgba(137, 207, 240, 0.8); }
        }
      `}</style>

      <div style={{
        position: "fixed",
        inset: 0,
        background: "radial-gradient(ellipse at top, #1a0a2e 0%, #000000 50%, #000000 100%)",
        zIndex: -1
      }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, opacity: 0.7 }} />
        <div style={{
          position: "absolute", top: "15%", left: "8%", width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(137, 207, 240, 0.4), transparent 60%)",
          filter: "blur(90px)", animation: "pulse 10s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "10%", width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 60%)",
          filter: "blur(100px)", animation: "pulse 12s ease-in-out infinite", animationDelay: "3s"
        }} />
      </div>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "1.5rem 3rem", zIndex: 10000,
        background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(137, 207, 240, 0.2)", animation: "fadeInDown 0.8s ease-out"
      }}>
        <img src="/New logo.svg"
             alt="Gravity Engage" style={{ height: "16px", cursor: "pointer", opacity: 0.8 }} onClick={() => navigate("/")} />
        <div style={{ display: "flex", gap: "3rem" }}>
          {["HOME", "WORK", "EXPERIMENTS", "ABOUT"].map((item, idx) => (
            <button key={item} onClick={() => navigate(item === "HOME" ? "/" : `/${item.toLowerCase()}`)}
                    style={{
                      position: "relative", cursor: "pointer", background: "transparent", border: "none",
                      color: item === "EXPERIMENTS" ? "#89cff0" : "#ffffff", fontSize: "11px", fontWeight: "400",
                      letterSpacing: "0.2em", fontFamily: "'Outfit', sans-serif", transition: "all 0.3s ease", padding: "8px 0"
                    }}>
              {item}
              {item === "EXPERIMENTS" && <div style={{
                position: "absolute", bottom: -8, left: 0, right: 0, height: "2px",
                background: "linear-gradient(90deg, #89cff0, #8b5cf6)", animation: "glow 2s ease-in-out infinite"
              }} />}
            </button>
          ))}
        </div>
      </nav>

      <div className="content-container" style={{
        position: "relative", zIndex: 1, width: "100%", height: "100vh", overflowY: "auto",
        padding: "8rem 4rem 4rem", boxSizing: "border-box"
      }}>
        <button onClick={() => navigate("/experiments")} style={{
          display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem",
          background: "rgba(137, 207, 240, 0.1)", border: "2px solid rgba(137, 207, 240, 0.3)",
          borderRadius: "50px", color: "#89cff0", fontSize: "14px", fontWeight: 600,
          cursor: "pointer", transition: "all 0.3s ease", backdropFilter: "blur(10px)",
          marginBottom: "3rem", animation: "fadeInUp 0.8s ease-out"
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5m0 0l7 7m-7-7l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Experiments
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "4rem" }}>
          <div style={{ animation: "fadeInUp 1s ease-out 0.2s backwards" }}>
             <h1 style={{
              fontSize: "clamp(48px, 5vw, 64px)", fontWeight: 300, margin: "0 0 1rem 0",
              background: "linear-gradient(135deg, #ffffff 0%, #89cff0 50%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.1
            }}>
              Gravity Game Space
            </h1>
            <p style={{ fontSize: "20px", color: "#89cff0", margin: "0 0 3rem 0", fontWeight: 400, letterSpacing: "0.05em" }}>
              3D spaces make business systems intuitive.
            </p>

            <section style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "16px", color: "#e2e2e2", lineHeight: 1.6, fontWeight: 300 }}>
                At Engage, we continuously explore new ways to make complex information intuitive and actionable. A key focus is reimagining how business ecosystems are visualised- transforming abstract processes and interdependencies into clear, navigable experiences that enable better oversight across functions. 
              </p>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "16px", color: "#e2e2e2", lineHeight: 1.6, fontWeight: 300 }}>
                The Gravity Game Space is an experimental framework that translates organisational structures into immersive 3D environments. Each space mirrors a specific function within a company, creating a dynamic, spatial representation of how different parts of the business operate and interact. 
              </p>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "16px", color: "#e2e2e2", lineHeight: 1.6, fontWeight: 300 }}>
                These environments are designed to be populated with live data, capturing performance metrics and ongoing activities in real time. Users can move through these virtual spaces to gain immediate visibility, uncover patterns, and understand relationships across the organisation in a more intuitive way. 
              </p>
            </section>
          </div>
          <div style={{ position: "relative", animation: "fadeInUp 1.2s ease-out 0.4s backwards" }}>
             <div style={{
               position: "sticky",
               top: "2rem",
               width: "100%",
               borderRadius: "32px",
               overflow: "hidden",
               border: "1px solid rgba(137, 207, 240, 0.3)",
               boxShadow: "0 40px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(137, 207, 240, 0.15)",
               background: "rgba(10, 5, 25, 0.6)",
               backdropFilter: "blur(20px)"
             }}>
               <img src="/GRAVITY GAME SPACE.png" alt="Gravity Game Space" style={{ width: "100%", height: "auto", display: "block" }} />
               <div style={{
                 position: "absolute",
                 inset: 0,
                 background: "linear-gradient(to bottom, transparent 60%, rgba(10, 5, 25, 0.8))",
                 pointerEvents: "none"
               }} />
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
