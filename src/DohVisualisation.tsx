import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";

export default function DohVisualisation() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isAdmin, logout, login } = useAdmin();
  const [logoClicks, setLogoClicks] = useState(0);

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

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    if (newClicks >= 5) {
      setLogoClicks(0);
      if (isAdmin) {
        if (confirm("Logout from Admin?")) logout();
      } else {
        const pass = prompt("Enter Admin Password:");
        if (pass && login(pass)) {
          // Success
        } else if (pass) {
          alert("Incorrect password");
        }
      }
    } else {
      setLogoClicks(newClicks);
      setTimeout(() => setLogoClicks(0), 2000);
      navigate("/");
    }
  };

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
        <img src="https://raw.githubusercontent.com/hannahmariam01/images/main/colored-logo.png"
             alt="Gravity Engage" style={{ height: "40px", cursor: "pointer" }} onClick={handleLogoClick} />
        <div style={{ display: "flex", gap: "3rem" }}>
          {["HOME", "WORK", "PLAYGROUND", "ABOUT"].map((item, idx) => (
            <button key={item} onClick={() => navigate(item === "HOME" ? "/" : `/${item.toLowerCase()}`)}
                    style={{
                      position: "relative", cursor: "pointer", background: "transparent", border: "none",
                      color: idx === 1 ? "#89cff0" : "#ffffff", fontSize: "11px", fontWeight: "400",
                      letterSpacing: "0.2em", fontFamily: "'Outfit', sans-serif", transition: "all 0.3s ease", padding: "8px 0"
                    }}>
              {item}
              {idx === 1 && <div style={{
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
        <button onClick={() => navigate("/work")} style={{
          display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem",
          background: "rgba(137, 207, 240, 0.1)", border: "2px solid rgba(137, 207, 240, 0.3)",
          borderRadius: "50px", color: "#89cff0", fontSize: "14px", fontWeight: 600,
          cursor: "pointer", transition: "all 0.3s ease", backdropFilter: "blur(10px)",
          marginBottom: "3rem", animation: "fadeInUp 0.8s ease-out"
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5m0 0l7 7m-7-7l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Work
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "4rem" }}>
          <div style={{ animation: "fadeInUp 1s ease-out 0.2s backwards" }}>
             <h1 style={{
              fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 300, margin: "0 0 1rem 0",
              background: "linear-gradient(135deg, #ffffff 0%, #89cff0 50%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.1
            }}>
              DoH Landscape &ndash; Australia
            </h1>
            <p style={{ fontSize: "20px", color: "#89cff0", margin: "0 0 3rem 0", fontWeight: 400, letterSpacing: "0.05em" }}>
              Reimagining Strategic Health Policy Visualisation
            </p>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "18px", color: "#ffffff", marginBottom: "1rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Context</h2>
              <p style={{ fontSize: "16px", color: "#e2e2e2", lineHeight: 1.6, fontWeight: 300 }}>
                DHDA shapes Australia&rsquo;s health, disability, and aged care systems through evidence-based policy. 
                Australia&rsquo;s health ecosystem is vast, interconnected, and constantly evolving. 
                Yet, policy systems remained fragmented&mdash;difficult to visualize, navigate, and act upon.
              </p>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "18px", color: "#ffffff", marginBottom: "1rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>The Challenge</h2>
              <p style={{ fontSize: "16px", color: "#e2e2e2", lineHeight: 1.6, fontWeight: 300 }}>
                Enable a whole of system understanding of Australia's Health Landscape and strategic priority areas, by nurturing complexity.
              </p>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "18px", color: "#ffffff", marginBottom: "1rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Approach</h2>
              <p style={{ fontSize: "16px", color: "#e2e2e2", lineHeight: 1.6, fontWeight: 300 }}>
                We transformed complex policy landscape from static documentation into an engaging visualisation, conveying story of connected systems.
              </p>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "18px", color: "#ffffff", marginBottom: "1rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Design &amp; Experience</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "16px", color: "#89cff0", margin: "0 0 0.5rem 0" }}>System as Interface</h3>
                  <p style={{ fontSize: "15px", color: "#e2e2e2", lineHeight: 1.5, fontWeight: 300, margin: 0 }}>The health ecosystem visualized as an explorable landscape.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", color: "#89cff0", margin: "0 0 0.5rem 0" }}>Clarity in Complexity</h3>
                  <p style={{ fontSize: "15px", color: "#e2e2e2", lineHeight: 1.5, fontWeight: 300, margin: 0 }}>Achieving clarity in highly complex systems.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", color: "#89cff0", margin: "0 0 0.5rem 0" }}>Retained Memory</h3>
                  <p style={{ fontSize: "15px", color: "#e2e2e2", lineHeight: 1.5, fontWeight: 300, margin: 0 }}>Providing a recall value of defined hierarchies and relationships in the Health system.</p>
                </div>
              </div>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "18px", color: "#ffffff", marginBottom: "1rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Solution</h2>
              <p style={{ fontSize: "16px", color: "#e2e2e2", lineHeight: 1.6, fontWeight: 300 }}>
                An evolving policy intelligence platform that:<br/>
                &bull; Structures complexity through spatial storytelling to reveal relationships at a glance.<br/>
                &bull; Enables users to trace pathways and understand cross-system interdependencies.
              </p>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "18px", color: "#ffffff", marginBottom: "1rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Impact</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "16px", color: "#89cff0", margin: "0 0 0.5rem 0" }}>Clarity at Scale &rarr; Enabling system-level thinking</h3>
                  <p style={{ fontSize: "15px", color: "#e2e2e2", lineHeight: 1.5, fontWeight: 300, margin: 0 }}>Complex systems became navigable and actionable. Reduces cognitive load through visual and relational clarity.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", color: "#89cff0", margin: "0 0 0.5rem 0" }}>Siloed views &rarr; Holistic System understanding</h3>
                  <p style={{ fontSize: "15px", color: "#e2e2e2", lineHeight: 1.5, fontWeight: 300, margin: 0 }}>Unifies fragmented data and domains into a clear, system-level view for better decisions.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", color: "#89cff0", margin: "0 0 0.5rem 0" }}>Alignment across Departments &rarr; Stronger Outcomes</h3>
                  <p style={{ fontSize: "15px", color: "#e2e2e2", lineHeight: 1.5, fontWeight: 300, margin: 0 }}>Shared system views improved cross-stakeholder alignment.</p>
                </div>
              </div>
            </section>

            <section style={{ 
              padding: "2rem", 
              background: "rgba(137, 207, 240, 0.05)", 
              borderLeft: "4px solid #89cff0",
              borderRadius: "0 12px 12px 0",
              marginTop: "4rem"
            }}>
              <h2 style={{ fontSize: "18px", color: "#ffffff", marginBottom: "1rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Insight</h2>
              <p style={{ fontSize: "18px", color: "#ffffff", lineHeight: 1.5, fontWeight: 400, fontStyle: "italic", margin: 0 }}>
                &ldquo;Complex systems strategically represented visually holds meaning, nurtures alignment and provides clarity.&rdquo;
              </p>
            </section>
          </div>
          <div style={{ position: "relative" }}>
            {/* Visual element placeholder or space for background effect */}
          </div>
        </div>
      </div>
    </>
  );
}
