import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import Navbar from "./components/Navbar";

export default function ADCognitive() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const stages = [
    {
      title: "Digital City",
      subtitle: "The present reality",
      description:
        "Services are digitized but disconnected. Data exists, yet insight remains limited. The city functions but responds slowly.",
      color: "#3b82f6",
      features: [
        "Effective digital operating model",
        "Digital native inhouse talent & culture",
        "Tech-savvy civil service",
        "Vibrant partner ecosystem",
      ],
    },
    {
      title: "Smart City",
      subtitle: "The integrative layer",
      description:
        "Infrastructure connects across domains. Data flows between systems. Services begin responding dynamically to real world demand. Technology shifts from enabling operations to actively improving outcomes.",
      color: "#10b981",
      features: [
        "Unified enterprise architecture & data",
        "World-class digital execution",
        "Effective digital operating model",
        "Digital native inhouse talent & culture",
      ],
    },
    {
      title: "Cognitive City",
      subtitle: "The future state",
      description:
        "Intelligence is embedded across the city. AI enables prediction, autonomy, and continuous learning. Systems anticipate needs, reduce inefficiencies, and support citizens without demanding attention.",
      color: "#8b5cf6",
      features: [
        "AI-powered City Management Platform",
        "Autonomous Decision-Making Engines",
        "AI Powered algorithms on infrastructure",
        "Innovative procurement models",
      ],
    },
  ];

  // Single screen recording for all stages
  const screenRecordingUrl =
    "https://raw.githubusercontent.com/hannahmariam01/images/main/SMART%20CITY%20SR%20(online-video-cutter.com).mp4";

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

    const particles = Array.from({ length: 80 }, () => ({
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

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollTop = container.scrollTop;
        const viewportHeight = window.innerHeight;

        const heroSectionHeight = viewportHeight;
        const challengeSectionHeight = viewportHeight * 0.6;
        const combinedHeight = heroSectionHeight + challengeSectionHeight;

        const stagesScrollDistance = Math.max(0, scrollTop - combinedHeight);

        const stage1End = viewportHeight * 2.5;
        const stage2End = viewportHeight * 4.5;

        if (stagesScrollDistance < stage1End) {
          setCurrentStage(0);
        } else if (stagesScrollDistance < stage2End) {
          setCurrentStage(1);
        } else {
          setCurrentStage(2);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const currentStageData = stages[currentStage];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Playback was interrupted or blocked
        });
      }
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
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
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
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
          background:
            "radial-gradient(ellipse at top, #1a0a2e 0%, #000000 50%, #000000 100%)",
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
            background:
              "radial-gradient(circle, rgba(137, 207, 240, 0.4), transparent 60%)",
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
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 60%)",
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
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)",
            filter: "blur(80px)",
            animation: "pulse 8s ease-in-out infinite",
            animationDelay: "1.5s",
          }}
        />

        {/* Navigation Bar */}
        <Navbar />

        {/* Back Button */}
        <button
          onClick={() => navigate("/work")}
          style={{
            position: "fixed",
            top: "6rem",
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

        {/* Scrollable Content */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            height: "100vh",
            padding: "6rem 4rem 4rem",
            display: "flex",
            flexDirection: "column",
            zIndex: 100,
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {/* Hero Section */}
          <section
            style={{
              minHeight: "calc(100vh - 10rem)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8rem",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                textAlign: "center",
                animation: "fadeInUp 1s ease-out",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  letterSpacing: "0.3em",
                  color: "#89cff0",
                  marginBottom: "1.5rem",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                A Vision For Tomorrow
              </div>
              <h1
                style={{
                  fontSize: "clamp(48px, 8vw, 96px)",
                  fontWeight: 300,
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #89cff0 50%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "2rem",
                  lineHeight: 1.2,
                  textShadow: "0 0 30px rgba(137, 207, 240, 0.3)",
                }}
              >
                AD Cognitive Smart City
              </h1>
              <p
                style={{
                  fontSize: "clamp(18px, 2vw, 24px)",
                  color: "rgba(255, 255, 255, 0.7)",
                  maxWidth: "800px",
                  margin: "0 auto 3rem",
                  lineHeight: 1.8,
                }}
              >
                This project began with a simple question: <br></br>
                How might we help people understand what a truly intelligent
                city could feel like?
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 2rem",
                  background: "rgba(137, 207, 240, 0.1)",
                  border: "2px solid rgba(137, 207, 240, 0.3)",
                  borderRadius: "50px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(137, 207, 240, 0.2)",
                }}
                onClick={() =>
                  containerRef.current?.scrollTo({
                    top: 800,
                    behavior: "smooth",
                  })
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(137, 207, 240, 0.2)";
                  e.currentTarget.style.borderColor = "#89cff0";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(137, 207, 240, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(137, 207, 240, 0.1)";
                  e.currentTarget.style.borderColor =
                    "rgba(137, 207, 240, 0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(137, 207, 240, 0.2)";
                }}
              >
                <span
                  style={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}
                >
                  Explore the Evolution
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14m0 0l7-7m-7 7l-7-7"
                    stroke="#89cff0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </section>

          {/* Challenge Section */}
          <section
            style={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem 0",
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                maxWidth: "1000px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 300,
                  color: "#fff",
                  marginBottom: "2rem",
                  lineHeight: 1.3,
                  textShadow: "0 0 30px rgba(137, 207, 240, 0.2)",
                }}
              >
                The Challenge
              </h2>
              <p
                style={{
                  fontSize: "clamp(18px, 2vw, 22px)",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                Creating a city that could not just operate digitally, but
                learn, adapt, and evolve over time. That was the challenge we
                were given.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "2rem",
                  marginTop: "4rem",
                }}
              >
                {[
                  {
                    title: "The Vision",
                    text: "Translate a future that had yet to exist",
                  },
                  {
                    title: "The Challenge",
                    text: "Making intelligence-driven cities understandable",
                  },
                  {
                    title: "The Approach",
                    text: "Creating a shared mental model across audiences",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "2rem",
                      background: "rgba(137, 207, 240, 0.05)",
                      border: "1px solid rgba(137, 207, 240, 0.2)",
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(137, 207, 240, 0.1)";
                      e.currentTarget.style.borderColor = "#89cff0";
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 30px rgba(137, 207, 240, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(137, 207, 240, 0.05)";
                      e.currentTarget.style.borderColor =
                        "rgba(137, 207, 240, 0.2)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <h3
                      style={{
                        color: "#89cff0",
                        marginBottom: "1rem",
                        fontSize: "20px",
                        fontWeight: 600,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "16px",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Single Stage Section with Smooth Transitions */}
          <section
            style={{
              minHeight: "600vh",
              display: "flex",
              alignItems: "flex-start",
              paddingTop: "6rem",
              paddingBottom: "4rem",
              marginBottom: "8rem",
              position: "relative",
            }}
          >
            <div
              style={{
                maxWidth: "1600px",
                margin: "0 auto",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr",
                gap: "4rem",
                alignItems: "center",
                position: "sticky",
                top: "60px",
                maxHeight: "none",
                overflow: "visible",
              }}
            >
              {/* Content */}
              <div
                style={{
                  transition: "all 0.8s ease-in-out",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1.5rem",
                    background: `${currentStageData.color}20`,
                    border: `2px solid ${currentStageData.color}`,
                    borderRadius: "50px",
                    marginBottom: "2rem",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: currentStageData.color,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "all 0.6s ease-in-out",
                  }}
                >
                  STAGE {currentStage + 1}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(36px, 4vw, 56px)",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "1rem",
                    lineHeight: 1.2,
                    transition: "all 0.6s ease-in-out",
                  }}
                >
                  {currentStageData.title}
                </h2>
                <p
                  style={{
                    fontSize: "20px",
                    color: currentStageData.color,
                    marginBottom: "2rem",
                    fontWeight: 500,
                    transition: "all 0.6s ease-in-out",
                  }}
                >
                  {currentStageData.subtitle}
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    color: "rgba(255, 255, 255, 0.7)",
                    lineHeight: 1.8,
                    marginBottom: "3rem",
                    transition: "all 0.6s ease-in-out",
                  }}
                >
                  {currentStageData.description}
                </p>
                <div
                  style={{
                    display: "grid",
                    gap: "1rem",
                  }}
                >
                  {currentStageData.features.map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1rem",
                        background: "rgba(255, 255, 255, 0.03)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${currentStageData.color}15`;
                        e.currentTarget.style.borderColor =
                          currentStageData.color;
                        e.currentTarget.style.transform = "translateX(8px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: currentStageData.color,
                          flexShrink: 0,
                          boxShadow: `0 0 12px ${currentStageData.color}`,
                          transition: "all 0.6s ease-in-out",
                        }}
                      />
                      <span style={{ color: "#fff", fontSize: "16px" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video - Bigger and Center Aligned */}
              <div
                style={{
                  position: "relative",
                  transition: "all 0.6s ease-in-out",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: `0 25px 50px ${currentStageData.color}40`,
                    border: `2px solid ${currentStageData.color}50`,
                    transition: "all 0.6s ease-in-out",
                  }}
                >
                  <video
                    ref={videoRef}
                    src={screenRecordingUrl}
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Outcome Section */}
          <section
            style={{
              minHeight: "50vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4rem 0",
              marginBottom: "12rem", // Increased from 8rem to 12rem
            }}
          >
            <div
              style={{
                maxWidth: "1000px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 300,
                  color: "#fff",
                  marginBottom: "2rem",
                  lineHeight: 1.3,
                }}
              >
                These are not separate cities.
              </h2>
              <p
                style={{
                  fontSize: "clamp(24px, 3vw, 32px)",
                  background: "linear-gradient(135deg, #89cff0, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 600,
                  marginBottom: "3rem",
                }}
              >
                They are the same city, seen through time.
              </p>
              <p
                style={{
                  fontSize: "clamp(18px, 2vw, 22px)",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                By framing the city as a single entity that evolves over time,
                intelligence becomes something you can see, understand, and move
                through. As systems connect and mature, relationships between
                infrastructure, data, and outcomes surface naturally.
              </p>
              <p
                style={{
                  fontSize: "clamp(18px, 2vw, 22px)",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.8,
                }}
              >
                Complexity becomes legible. Progress feels inevitable rather
                than abstract.
              </p>
            </div>
          </section>

          {/* Final Impact */}
          <section
            style={{
              minHeight: "50vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4rem 2rem", // Added horizontal padding
              marginBottom: "4rem",
              position: "relative",
            }}
          >
            <div
              style={{
                maxWidth: "1000px",
                width: "100%",
                position: "relative",
                margin: "0 auto", // Added this for centering
              }}
            >
              {/* Animated background elements */}
              <div
                style={{
                  position: "absolute",
                  top: "-30%",
                  left: "-10%",
                  width: "400px",
                  height: "400px",
                  background:
                    "radial-gradient(circle, rgba(137, 207, 240, 0.3), transparent 70%)",
                  filter: "blur(80px)",
                  animation: "pulse 8s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-20%",
                  right: "-10%",
                  width: "500px",
                  height: "500px",
                  background:
                    "radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)",
                  filter: "blur(90px)",
                  animation: "pulse 10s ease-in-out infinite",
                  animationDelay: "2s",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "relative",
                  padding: "2.5rem",
                  background:
                    "linear-gradient(135deg, rgba(137, 207, 240, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)",
                  border: "2px solid transparent",
                  backgroundImage:
                    "linear-gradient(#000, #000), linear-gradient(135deg, rgba(137, 207, 240, 0.5), rgba(139, 92, 246, 0.5))",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  borderRadius: "32px",
                  overflow: "hidden",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 25px 50px rgba(137, 207, 240, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  margin: "0 auto", // Added this for centering
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: "2px",
                    background:
                      "linear-gradient(90deg, transparent, #89cff0, #8b5cf6, transparent)",
                    boxShadow: "0 0 20px rgba(137, 207, 240, 0.5)",
                  }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Header with icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, rgba(137, 207, 240, 0.2), rgba(139, 92, 246, 0.2))",
                        border: "2px solid rgba(137, 207, 240, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 30px rgba(137, 207, 240, 0.3)",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          stroke="#89cff0"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h2
                      style={{
                        fontSize: "clamp(28px, 3.5vw, 42px)",
                        fontWeight: 300,
                        background:
                          "linear-gradient(135deg, #ffffff, #89cff0, #8b5cf6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        margin: 0,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      The Outcome
                    </h2>
                  </div>

                  {/* Content grid */}
                  <div
                    style={{
                      display: "grid",
                      gap: "1.5rem",
                      maxWidth: "800px",
                      margin: "0 auto",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        padding: "1.25rem",
                        background: "rgba(0, 0, 0, 0.3)",
                        borderRadius: "20px",
                        border: "1px solid rgba(137, 207, 240, 0.2)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "clamp(16px, 1.8vw, 20px)",
                          color: "rgba(255, 255, 255, 0.9)",
                          lineHeight: 1.6,
                          margin: 0,
                          fontWeight: 300,
                        }}
                      >
                        In the end, our work did not just describe a smart city.
                      </p>
                    </div>

                    <div
                      style={{
                        position: "relative",
                        padding: "2rem",
                        background:
                          "linear-gradient(135deg, rgba(137, 207, 240, 0.1), rgba(139, 92, 246, 0.1))",
                        borderRadius: "24px",
                        border: "2px solid transparent",
                        backgroundImage:
                          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(135deg, #89cff0, #8b5cf6)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        boxShadow:
                          "0 20px 40px rgba(137, 207, 240, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {/* Decorative corner elements */}
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          left: "1rem",
                          width: "30px",
                          height: "30px",
                          borderTop: "3px solid #89cff0",
                          borderLeft: "3px solid #89cff0",
                          borderRadius: "4px 0 0 0",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "1rem",
                          right: "1rem",
                          width: "30px",
                          height: "30px",
                          borderBottom: "3px solid #8b5cf6",
                          borderRight: "3px solid #8b5cf6",
                          borderRadius: "0 0 4px 0",
                        }}
                      />

                      <p
                        style={{
                          fontSize: "clamp(18px, 2.5vw, 26px)",
                          background:
                            "linear-gradient(135deg, #89cff0, #ffffff, #8b5cf6)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          fontWeight: 600,
                          lineHeight: 1.5,
                          margin: 0,
                          textAlign: "center",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        We made the visualization clear and concrete by turning
                        a complex future into something audiences could
                        immediately understand, trust and align around.
                      </p>
                    </div>

                    {/* Impact metrics */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "1rem",
                        marginTop: "1rem",
                      }}
                    >
                      {[
                        { label: "Complexity", value: "Simplified" },
                        { label: "Alignment", value: "Achieved" },
                        { label: "Vision", value: "Communicated" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          style={{
                            padding: "1.25rem",
                            background: "rgba(137, 207, 240, 0.05)",
                            borderRadius: "16px",
                            border: "1px solid rgba(137, 207, 240, 0.2)",
                            textAlign: "center",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(137, 207, 240, 0.1)";
                            e.currentTarget.style.borderColor = "#89cff0";
                            e.currentTarget.style.transform =
                              "translateY(-4px)";
                            e.currentTarget.style.boxShadow =
                              "0 10px 30px rgba(137, 207, 240, 0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "rgba(137, 207, 240, 0.05)";
                            e.currentTarget.style.borderColor =
                              "rgba(137, 207, 240, 0.2)";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <div
                            style={{
                              fontSize: "22px",
                              fontWeight: 700,
                              background:
                                "linear-gradient(135deg, #89cff0, #8b5cf6)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {item.value}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "rgba(255, 255, 255, 0.6)",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Progress Indicator */}
        <div
          style={{
            position: "fixed",
            right: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {stages.map((stage, i) => (
            <div
              key={i}
              title={stage.title}
              onClick={() => {
                const targetScroll = window.innerHeight * (i + 2);
                containerRef.current?.scrollTo({
                  top: targetScroll,
                  behavior: "smooth",
                });
              }}
              style={{
                width: currentStage === i ? "16px" : "12px",
                height: currentStage === i ? "16px" : "12px",
                borderRadius: "50%",
                background:
                  currentStage >= i ? stage.color : "rgba(255, 255, 255, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow:
                  currentStage === i ? `0 0 20px ${stage.color}` : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
