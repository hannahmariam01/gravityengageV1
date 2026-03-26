import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EdenMonaro() {
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
            ctx.strokeStyle = `rgba(137, 207, 240, ${0.15 * (1 - distance / 120)
              })`;
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background: radial-gradient(ellipse at top, #1a0a2e 0%, #000000 50%, #000000 100%);
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse at top, #1a0a2e 0%, #000000 50%, #000000 100%)",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.7,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "8%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(137, 207, 240, 0.4), transparent 60%)",
            filter: "blur(90px)",
            animation: "pulse 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 60%)",
            filter: "blur(100px)",
            animation: "pulse 12s ease-in-out infinite",
            animationDelay: "3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)",
            filter: "blur(80px)",
            animation: "pulse 8s ease-in-out infinite",
            animationDelay: "1.5s",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/work")}
          style={{
            position: "fixed",
            top: "2rem",
            left: "3rem",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: "rgba(137, 207, 240, 0.1)",
            border: "2px solid rgba(137, 207, 240, 0.3)",
            borderRadius: "50px",
            color: "#89cff0",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
            animation: "fadeInDown 1s ease-out 0.3s backwards",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(137, 207, 240, 0.2)";
            e.currentTarget.style.borderColor = "#89cff0";
            e.currentTarget.style.transform = "translateX(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(137, 207, 240, 0.1)";
            e.currentTarget.style.borderColor = "rgba(137, 207, 240, 0.3)";
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

        {/* Top Section */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "55vh",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Frosted Background Image */}
          <div
            style={{
              position: "absolute",
              inset: -20,
              backgroundImage: "url('/edden monaro.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
              opacity: 0.8,
              zIndex: 1,
            }}
          />

          {/* Centered Video */}
          <video
            ref={videoRef}
            src="/Eden monaro.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
            }}
          />
        </div>

        {/* Bottom Section */}
        <div
          style={{
            width: "100%",
            background: "transparent",
            color: "#fff",
            padding: "2rem 4rem 6rem 4rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(48px, 6vw, 72px)",
              fontWeight: 300,
              margin: "0 0 1.5rem 0",
              background: "linear-gradient(135deg, #ffffff 0%, #89cff0 50%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Eden-Monaro
          </h1>
          
          <p
            style={{
              fontSize: "18px",
              margin: "0 0 2rem 0",
              fontWeight: 400,
              color: "#e2e2e2",
              lineHeight: 1.4,
            }}
          >
            Reframing Political Communication Through Interactive<br />Storytelling
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <p style={{ margin: "0 0 0.5rem 0", fontSize: "16px", fontWeight: 400, color: "#e2e2e2" }}>
              Context
            </p>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: 400, color: "#e2e2e2", lineHeight: 1.4 }}>
              Campaign impact is often buried in fragmented updates and static reports—hard to navigate,
            </p>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: 400, color: "#e2e2e2", lineHeight: 1.4 }}>
              harder to trust.
            </p>
            <p style={{ margin: "0 0 1rem 0", fontSize: "16px", fontWeight: 400, color: "#e2e2e2", lineHeight: 1.4 }}>
              &nbsp;Here, the challenge wasn't the work—it was how people experienced it.
            </p>

            <p style={{ margin: "0 0 0.5rem 0", fontSize: "16px", fontWeight: 400, color: "#e2e2e2" }}>
              The Challenge
            </p>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: 400, color: "#e2e2e2", lineHeight: 1.4 }}>
              Turn a scattered set of initiatives into a clear, engaging, and explorable narrative—one that
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
