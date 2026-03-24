import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeYear, setActiveYear] = useState(null);

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

    const particles = Array.from({ length: 60 }, () => ({
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

  const teamMembers = [
    {
      name: "Kailash Krishnamurthi",
      title: "Founder & CEO",
      image:
        "https://raw.githubusercontent.com/hannahmariam01/images/main/kailash.jpeg",
    },
    {
      name: "Stephen Hayes MBE",
      title: "Chairman of the Board",
      image:
        "https://raw.githubusercontent.com/hannahmariam01/images/main/1531383082941.jpeg",
    },
    {
      name: "Taruun Vaiddya",
      title: "Chief of Staff",
      image:
        "https://raw.githubusercontent.com/hannahmariam01/images/main/taruun.jpeg",
    },
    {
      name: "Rijool Dhingra",
      title: "General Manager - Growth",
      image:
        "https://raw.githubusercontent.com/hannahmariam01/images/main/image.png",
    },
    {
      name: "Krithika Balaraman",
      title: "Senior Design Strategist",
      image: "",
    },
    {
      name: "Manish Bhagele",
      title: "Operations Lead",
      image:
        "https://raw.githubusercontent.com/hannahmariam01/images/main/manish.jpeg",
    },
    {
      name: "Ojal Khandpur",
      title: "Senior Design Strategist",
      image: "",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body, html, #root { margin: 0; padding: 0; overflow-x: hidden; font-family: 'Poppins', sans-serif; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(137, 207, 240, 0.4); } 50% { box-shadow: 0 0 40px rgba(137, 207, 240, 0.8); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes growLine { from { width: 0; } to { width: 100%; } }
        @keyframes scaleIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .scroll-container { overflow-y: auto; height: 100vh; scroll-behavior: smooth; }
        .scroll-container::-webkit-scrollbar { width: 8px; }
        .scroll-container::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); }
        .scroll-container::-webkit-scrollbar-thumb { background: rgba(137, 207, 240, 0.5); border-radius: 4px; }
        .scroll-container::-webkit-scrollbar-thumb:hover { background: rgba(137, 207, 240, 0.7); }
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
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(137, 207, 240, 0.3), transparent 60%)",
            filter: "blur(90px)",
            animation: "pulse 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 60%)",
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
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.25), transparent 70%)",
            filter: "blur(80px)",
            animation: "pulse 8s ease-in-out infinite",
            animationDelay: "1.5s",
          }}
        />

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
            style={{ height: "40px", cursor: "pointer" }}
            onClick={() => navigate("/")}
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
                  color: idx === 3 ? "#89cff0" : "#ffffff",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.1em",
                  transition: "all 0.3s ease",
                  padding: "8px 0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#89cff0";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  if (idx !== 3) e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {item}
                {idx === 3 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(90deg, #89cff0, #8b5cf6)",
                      animation: "glow 2s ease-in-out infinite",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="scroll-container">
          <div
            style={{
              position: "relative",
              minHeight: "100vh",
              padding: "8rem 4rem 20vh 4rem",
              zIndex: 100,
            }}
          >
            <div
              style={{
                maxWidth: "1600px",
                margin: "0 auto",
              }}
            >
              {/* About Us Section */}
              <div
                style={{
                  marginBottom: "4rem",
                  animation: "fadeInUp 0.8s ease-out 0.2s backwards",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2rem" }}
                >
                  <h1
                    style={{
                      fontSize: "64px",
                      fontWeight: 300,
                      color: "#ffffff",
                      margin: 0,
                      textShadow: "0 0 30px rgba(137, 207, 240, 0.4)",
                    }}
                  >
                    About us
                  </h1>
                  <div
                    style={{
                      flex: 1,
                      height: "2px",
                      background:
                        "linear-gradient(90deg, rgba(137, 207, 240, 0.8), transparent)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
                        animation: "shimmer 2s infinite",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginBottom: "6rem",
                  animation: "fadeInUp 0.8s ease-out 0.4s backwards",
                  maxWidth: "900px",
                }}
              >
                <p
                  style={{
                    fontSize: "22px",
                    lineHeight: "1.8",
                    color: "rgba(255, 255, 255, 0.9)",
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  Gravity Engage is the design and innovation studio of Gravity
                  One.
                  <br />
                  We help organisations solve complex problems through a
                  multidisciplinary
                  <br />
                  team that blends design, technology, and research. Across
                  sectors—from
                  <br />
                  real estate and health to government and technology—we shape
                  <br />
                  experiences, products, and systems that move businesses
                  forward.
                </p>
              </div>

              {/* Our Team Section */}
              <div
                style={{
                  marginBottom: "8rem",
                  animation: "fadeInUp 0.8s ease-out 0.6s backwards",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                    marginBottom: "3rem",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "48px",
                      fontWeight: 400,
                      color: "#ffffff",
                      margin: 0,
                      textShadow: "0 0 25px rgba(137, 207, 240, 0.3)",
                    }}
                  >
                    Our Team
                  </h2>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, rgba(137, 207, 240, 0.6), transparent)",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2rem",
                  }}
                >
                  {teamMembers.map((member, idx) => (
                    <div
                      key={idx}
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${0.1 * idx
                          }s backwards`,
                        background: "rgba(10, 5, 20, 0.4)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(137, 207, 240, 0.2)",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.borderColor =
                          "rgba(137, 207, 240, 0.5)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 30px rgba(137, 207, 240, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor =
                          "rgba(137, 207, 240, 0.2)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          margin: "0 auto 1rem",
                          overflow: "hidden",
                          border: "3px solid rgba(137, 207, 240, 0.3)",
                          boxShadow: "0 8px 20px rgba(137, 207, 240, 0.2)",
                        }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            if (e.currentTarget.parentElement) {
                              e.currentTarget.parentElement.innerHTML = `
                                <div style="
                                  width: 100%;
                                  height: 100%;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                                  font-size: 32px;
                                  font-weight: 600;
                                  color: #ffffff;
                                ">
                                  ${member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#ffffff",
                          marginBottom: "0.5rem",
                          lineHeight: "1.3",
                          textAlign: "center",
                        }}
                      >
                        {member.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "rgba(255, 255, 255, 0.7)",
                          margin: 0,
                          lineHeight: "1.5",
                          textAlign: "center",
                        }}
                      >
                        {member.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* R&D Section */}
              <div
                style={{
                  marginBottom: "8rem",
                  animation: "fadeInUp 0.8s ease-out 0.8s backwards",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                    marginBottom: "3rem",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "48px",
                      fontWeight: 400,
                      color: "#ffffff",
                      margin: 0,
                      textShadow: "0 0 25px rgba(137, 207, 240, 0.3)",
                    }}
                  >
                    R&D
                  </h2>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, rgba(137, 207, 240, 0.6), transparent)",
                    }}
                  />
                </div>

                <div style={{ maxWidth: "900px", marginBottom: "4rem" }}>
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "#89cff0",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Our internship program
                  </h3>
                  <p
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.8",
                      color: "rgba(255, 255, 255, 0.8)",
                      fontWeight: 300,
                    }}
                  >
                    We believe innovation is a discipline, not a happy accident.
                    Our internship program is an intensive R&D lab where diverse
                    talent—from front-end engineers to UX architects—converge to
                    untie the knots of complex, emerging tech briefs. Operating
                    in high-velocity sprints, our interns don't just "assist";
                    they build the prototypes that define our studio’s edge.
                  </p>
                </div>

                <div style={{ marginBottom: "4rem" }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.9)",
                      marginBottom: "3rem",
                    }}
                  >
                    Outcomes of the Internship program
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6rem",
                    }}
                  >
                    {/* Outcome 1 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4rem",
                      }}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: "480px",
                          height: "320px",
                          objectFit: "cover",
                          borderRadius: "16px",
                          border: "1px solid rgba(137, 207, 240, 0.3)",
                          flexShrink: 0,
                        }}
                      >
                        <source src="/videos/generative-brand-engine.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <p
                        style={{
                          fontSize: "20px",
                          lineHeight: "1.6",
                          color: "rgba(255, 255, 255, 0.9)",
                          maxWidth: "600px",
                          fontWeight: 300,
                        }}
                      >
                        <strong style={{ color: "#ffffff", fontWeight: 600 }}>
                          Generative Brand Engine:
                        </strong>{" "}
                        An AI-driven tool that dynamically re-formats complex
                        presentations into custom, brand-compliant themes.
                      </p>
                    </div>


                    {/* Outcome 3 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4rem",
                      }}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        style={{
                          width: "480px",
                          height: "320px",
                          objectFit: "cover",
                          borderRadius: "16px",
                          border: "1px solid rgba(137, 207, 240, 0.3)",
                          flexShrink: 0,
                          backgroundColor: "rgba(0,0,0,0.5)" // Placeholder while it loads
                        }}
                      >
                        <source src="https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <p
                        style={{
                          fontSize: "20px",
                          lineHeight: "1.6",
                          color: "rgba(255, 255, 255, 0.9)",
                          maxWidth: "600px",
                          fontWeight: 300,
                        }}
                      >
                        <strong style={{ color: "#ffffff", fontWeight: 600 }}>
                          Interactive Strategy Orchestration:
                        </strong>{" "}
                        An immersive digital experience that translates
                        high-level business strategy into a navigable,
                        interactive ecosystem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
