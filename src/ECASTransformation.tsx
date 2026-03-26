import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ECASTransformation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

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
    }> = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.3 + 0.1,
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
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.fill();
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "#fff",
          color: "#1a1a1a",
          overflowX: "hidden",
        }}
      >
        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Back Button */}
        <button
          onClick={() => navigate("/work")}
          style={{
            position: "fixed",
            top: "2rem",
            left: "3rem",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: "rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "50px",
            color: "#6366f1",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.transform = "translateX(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5m0 0l7 7m-7-7l7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Projects
        </button>

        {/* Hero Section */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "55vh",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            background: "#ffffff",
            overflow: "hidden",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          {/* Background Branding for Title Area */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "50%",
              backgroundImage: "url('/ECAS BG.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
              opacity: 1,
            }}
          />
          
          <div style={{ flex: 1, zIndex: 1, padding: "0 5%" }}>
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 600,
                color: "#4f46e5",
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: "-0.01em",
                opacity: 0,
                animation: "fadeIn 1s ease-out forwards",
                textShadow: "0 2px 10px rgba(255,255,255,0.8)",
              }}
            >
              Executive Council<br />
              Affairs System (ECAS)<br />
              Transformation
            </h1>
          </div>

          <div 
            style={{ 
              flex: 1, 
              height: "100%",
              zIndex: 1, 
              position: "relative",
              opacity: 0,
              animation: "fadeIn 1s ease-out 0.3s forwards",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8f9ff",
              }}
            >
              <video
                ref={videoRef}
                src="/ECAS.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div
          style={{
            width: "100%",
            background: "#000000",
            color: "#fff",
            padding: "6rem 8%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ maxWidth: "1000px" }}>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 400,
                marginBottom: "4rem",
                color: "#fff",
              }}
            >
              Overview
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              <section>
                <h3 style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem", fontWeight: 400 }}>
                  Context
                </h3>
                <div style={{ fontSize: "20px", lineHeight: 1.6, fontWeight: 300, color: "rgba(255,255,255,0.9)" }}>
                  <p style={{ margin: 0 }}>
                    Campaign impact is often buried in fragmented updates and static reports—hard to navigate,
                  </p>
                  <p style={{ margin: "0.5rem 0" }}>
                    harder to trust.
                  </p>
                  <p style={{ margin: 0 }}>
                    Here, the challenge wasn't the work—it was how people experienced it.
                  </p>
                </div>
              </section>

              <section>
                <h3 style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem", fontWeight: 400 }}>
                  The Challenge
                </h3>
                <div style={{ fontSize: "20px", lineHeight: 1.6, fontWeight: 300, color: "rgba(255,255,255,0.9)" }}>
                  <p style={{ margin: 0 }}>
                    Turn a scattered set of initiatives into a clear, engaging, and explorable narrative—one that
                  </p>
                  <p style={{ margin: "0.5rem 0" }}>
                    accelerates decision making and fosters transparency across the organization.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
