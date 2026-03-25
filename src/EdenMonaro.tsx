import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function EdenMonaro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background: radial-gradient(ellipse at top, #1a0a2e 0%, #000000 50%, #000000 100%);
          overflow: hidden;
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
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse at top, #1a0a2e 0%, #000000 50%, #000000 100%)",
          zIndex: -1,
        }}
      />

      <div
        style={{
          width: "100vw",
          height: "100vh",
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
            height: "45vh",
            background: "transparent",
            color: "#fff",
            padding: "2rem 4rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 400,
              margin: "0 0 1.5rem 0",
              letterSpacing: "0.02em",
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
