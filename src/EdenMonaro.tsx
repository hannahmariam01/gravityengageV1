import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function EdenMonaro() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(137, 207, 240, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(137, 207, 240, 0.7);
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {/* Frosted Background Image */}
        <div
          style={{
            position: "absolute",
            inset: -50,
            backgroundImage: "url('/edden monaro.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(40px) brightness(0.4)",
            zIndex: 1,
          }}
        />

        {/* Navigation Bar */}
        <nav
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem 3rem",
            zIndex: 10000,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(137, 207, 240, 0.2)",
            animation: "fadeInDown 0.8s ease-out",
          }}
        >
          <img
            src="https://raw.githubusercontent.com/hannahmariam01/images/main/colored-logo.png"
            alt="Gravity Engage"
            onClick={() => navigate("/")}
            style={{ height: "40px", cursor: "pointer" }}
          />

          <div style={{ display: "flex", gap: "3rem" }}>
            {["HOME", "WORK", "PLAYGROUND", "ABOUT"].map((item, idx) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "HOME") {
                    navigate("/");
                  } else if (item === "WORK") {
                    navigate("/work");
                  } else if (item === "PLAYGROUND") {
                    navigate("/playground");
                  } else if (item === "ABOUT") {
                    navigate("/about");
                  }
                }}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  color: idx === 1 ? "#89cff0" : "#ffffff",
                  fontSize: "11px",
                  fontWeight: "400",
                  letterSpacing: "0.2em",
                  fontFamily: "'Outfit', sans-serif",
                  transition: "all 0.3s ease",
                  padding: "8px 0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#89cff0";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  if (idx !== 1) e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {item}
                {idx === 1 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(90deg, #89cff0, #8b5cf6)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate("/work")}
          style={{
            position: "fixed",
            top: "8rem",
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

        {/* Main Content Area */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            height: "100vh",
            padding: "12rem 4rem 4rem",
            display: "flex",
            zIndex: 100,
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <div
            style={{
              maxWidth: "1600px",
              margin: "0 auto",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "4rem",
              alignItems: "center",
              animation: "fadeInUp 1s ease-out",
            }}
          >
            {/* Left Column: Text Content */}
            <div style={{ color: "#fff" }}>
              <h1
                style={{
                  fontSize: "clamp(36px, 4vw, 56px)",
                  fontWeight: 400,
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Eden-Monaro
              </h1>
              
              <p
                style={{
                  fontSize: "clamp(18px, 2vw, 22px)",
                  lineHeight: 1.5,
                  color: "rgba(255, 255, 255, 0.9)",
                  marginBottom: "3rem",
                  fontWeight: 300,
                }}
              >
                Reframing Political Communication Through Interactive Storytelling
              </p>

              <div style={{ marginBottom: "2.5rem" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    marginBottom: "1rem",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  Context
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "1rem",
                    fontWeight: 300,
                  }}
                >
                  Campaign impact is often buried in fragmented updates and static
                  reports—hard to navigate, harder to trust.
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "rgba(255, 255, 255, 0.6)",
                    fontWeight: 300,
                  }}
                >
                  Here, the challenge wasn't the work—it was how people
                  experienced it.
                </p>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    marginBottom: "1rem",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  The Challenge
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "rgba(255, 255, 255, 0.6)",
                    fontWeight: 300,
                  }}
                >
                  Turn a scattered set of initiatives into a clear, engaging, and
                  explorable narrative—one that allows people to intuitively understand value.
                </p>
              </div>
            </div>

            {/* Right Column: Video */}
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <video
                ref={videoRef}
                src="/Eden monaro.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
