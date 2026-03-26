import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState(null);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        body, html, #root { margin: 0; padding: 0; overflow-x: hidden; font-family: 'Inter', sans-serif; }
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
            src="/New logo.svg"
            alt="Gravity Engage"
            style={{ height: "28px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <div style={{ display: "flex", gap: "3rem" }}>
            {["HOME", "WORK", "EXPERIMENTS", "ABOUT"].map((item, idx) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "HOME") {
                    navigate("/");
                  } else if (item === "WORK") {
                    navigate("/work");
                  } else if (item === "EXPERIMENTS") {
                    navigate("/experiments");
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

              {/* Our Approach Section */}
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
                    marginBottom: "4rem",
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
                    Our Approach
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
                    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                    gap: "4rem 8rem",
                  }}
                >
                  {[
                    {
                      title: "Who we are",
                      content:
                        "We turn complex ideas into high-fidelity, testable products, systems, and experiences.",
                    },
                    {
                      title: "What we do",
                      content:
                        "From early insight to execution, we design across products, systems, and immersive environments so ideas don’t stay abstract, they become real.",
                    },
                    {
                      title: "How we work",
                      content:
                        "We move fast from concept to tangible outputs. Prototypes, system maps, and narratives you can test, refine, and align around. Often in days, not months.",
                    },
                    {
                      title: "What sets us apart",
                      content:
                        "We bridge the friction between complex human needs and high-fidelity technology, helping teams validate, communicate, and build with clarity.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${
                          0.2 + idx * 0.1
                        }s backwards`,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "#89cff0",
                          marginBottom: "1.5rem",
                          fontFamily: "'Outfit', sans-serif",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "20px",
                          lineHeight: "1.8",
                          color: "rgba(255, 255, 255, 0.8)",
                          margin: 0,
                          fontWeight: 300,
                        }}
                      >
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Footer Section */}
          <div
            style={{
              position: "relative",
              zIndex: 400,
              background: "rgba(8, 4, 18, 1)",
            }}
          >
            <div
              ref={contactRef}
              id="contact"
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "4rem 6rem",
                borderTop: "1px solid rgba(137, 207, 240, 0.2)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "6rem",
                  marginBottom: "4rem",
                }}
              >
                {/* Left Column - Get In Touch */}
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#89cff0",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}
                  >
                    Keep Close
                  </div>
                  <h3
                    style={{
                      fontSize: "48px",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "2rem",
                      lineHeight: "1.2",
                    }}
                  >
                    Get In Touch
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 300,
                      color: "rgba(255, 255, 255, 0.6)",
                      lineHeight: "1.8",
                      marginBottom: "4rem",
                    }}
                  >
                    Let's create something extraordinary together. Have a project in
                    mind? We'd love to discuss how we can bring your vision to life
                    through innovative design and technology.
                  </p>

                  {/* Contact Info Grid */}
                  <div
                    style={{ display: "grid", gap: "2rem", marginBottom: "4rem" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ color: "#89cff0", marginTop: "0.25rem" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="10"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "rgba(255, 255, 255, 0.8)",
                            margin: "0 0 0.25rem 0",
                          }}
                        >
                          Cloud Spaces، Dubai Fountain Views - 121 Sheikh Mohammed
                          bin Rashid Bldg
                        </p>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "rgba(255, 255, 255, 0.8)",
                            margin: 0,
                          }}
                        >
                          above Social District Burj Khalifa Downtown Dubai - Dubai
                          - United Arab Emirates
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ color: "#89cff0", marginTop: "0.25rem" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "rgba(255, 255, 255, 0.8)",
                            margin: 0,
                          }}
                        >
                          +61 2 6179 3739
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ color: "#89cff0", marginTop: "0.25rem" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <polyline
                            points="22,6 12,13 2,6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "rgba(255, 255, 255, 0.8)",
                            margin: 0,
                          }}
                        >
                          contact@gravityone.ai
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ color: "#89cff0", marginTop: "0.25rem" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <polyline
                            points="12 6 12 12 16 14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "rgba(255, 255, 255, 0.8)",
                            margin: "0 0 0.25rem 0",
                          }}
                        >
                          Mon - Fri: 9 am – 6 pm
                        </p>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "rgba(255, 255, 255, 0.8)",
                            margin: 0,
                          }}
                        >
                          Sat - Sun: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h4
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "rgba(255, 255, 255, 0.8)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: "1.5rem",
                      }}
                    >
                      Follow Us
                    </h4>
                    <button
                      onClick={() =>
                        window.open(
                          "https://www.linkedin.com/company/gravityoneai/",
                          "_blank"
                        )
                      }
                      onMouseEnter={(e) => {
                        setIsHoveringNav(true);
                        e.currentTarget.style.color = "#89cff0";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        setIsHoveringNav(false);
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "rgba(255, 255, 255, 0.6)",
                        fontSize: "20px",
                        transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                        padding: 0,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Column - Form */}
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    padding: "3rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(137, 207, 240, 0.1)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "32px",
                      fontWeight: 600,
                      color: "#ffffff",
                      marginBottom: "1rem",
                    }}
                  >
                    Your Details
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "rgba(255, 255, 255, 0.6)",
                      marginBottom: "2rem",
                    }}
                  >
                    Let us know how to get back to you.
                  </p>

                  {formSubmitted ? (
                    <div
                      style={{
                        padding: "3rem",
                        background: "rgba(137, 207, 240, 0.1)",
                        border: "2px solid #89cff0",
                        borderRadius: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          margin: "0 auto 1.5rem",
                          borderRadius: "50%",
                          background: "rgba(137, 207, 240, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#89cff0"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h4
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "#ffffff",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Message Sent!
                      </h4>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 300,
                          color: "rgba(255, 255, 255, 0.7)",
                        }}
                      >
                        We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "1.5rem",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <div>
                          <label
                            style={{
                              display: "block",
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "rgba(255, 255, 255, 0.7)",
                              letterSpacing: "0.1em",
                              marginBottom: "0.5rem",
                              textTransform: "uppercase",
                            }}
                          >
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            onMouseEnter={() => setIsHoveringNav(true)}
                            onMouseLeave={() => setIsHoveringNav(false)}
                            style={{
                              width: "100%",
                              padding: "0.875rem",
                              background: "rgba(255, 255, 255, 0.03)",
                              border: "1px solid rgba(137, 207, 240, 0.2)",
                              borderRadius: "6px",
                              color: "#ffffff",
                              fontSize: "14px",
                              fontFamily: "Poppins, sans-serif",
                              outline: "none",
                              transition: "all 0.3s ease",
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#89cff0";
                              e.target.style.background =
                                "rgba(255, 255, 255, 0.05)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor =
                                "rgba(137, 207, 240, 0.2)";
                              e.target.style.background =
                                "rgba(255, 255, 255, 0.03)";
                            }}
                          />
                        </div>

                        <div>
                          <label
                            style={{
                              display: "block",
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "rgba(255, 255, 255, 0.7)",
                              letterSpacing: "0.1em",
                              marginBottom: "0.5rem",
                              textTransform: "uppercase",
                            }}
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            onMouseEnter={() => setIsHoveringNav(true)}
                            onMouseLeave={() => setIsHoveringNav(false)}
                            style={{
                              width: "100%",
                              padding: "0.875rem",
                              background: "rgba(255, 255, 255, 0.03)",
                              border: "1px solid rgba(137, 207, 240, 0.2)",
                              borderRadius: "6px",
                              color: "#ffffff",
                              fontSize: "14px",
                              fontFamily: "Poppins, sans-serif",
                              outline: "none",
                              transition: "all 0.3s ease",
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#89cff0";
                              e.target.style.background =
                                "rgba(255, 255, 255, 0.05)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor =
                                "rgba(137, 207, 240, 0.2)";
                              e.target.style.background =
                                "rgba(255, 255, 255, 0.03)";
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: "1.5rem" }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "rgba(255, 255, 255, 0.7)",
                            letterSpacing: "0.1em",
                            marginBottom: "0.5rem",
                            textTransform: "uppercase",
                          }}
                        >
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          onMouseEnter={() => setIsHoveringNav(true)}
                          onMouseLeave={() => setIsHoveringNav(false)}
                          style={{
                            width: "100%",
                            padding: "0.875rem",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(137, 207, 240, 0.2)",
                            borderRadius: "6px",
                            color: "#ffffff",
                            fontSize: "14px",
                            fontFamily: "Poppins, sans-serif",
                            outline: "none",
                            transition: "all 0.3s ease",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#89cff0";
                            e.target.style.background = "rgba(255, 255, 255, 0.05)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(137, 207, 240, 0.2)";
                            e.target.style.background = "rgba(255, 255, 255, 0.03)";
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: "2rem" }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "rgba(255, 255, 255, 0.7)",
                            letterSpacing: "0.1em",
                            marginBottom: "0.5rem",
                            textTransform: "uppercase",
                          }}
                        >
                          Comments / Questions *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          onMouseEnter={() => setIsHoveringNav(true)}
                          onMouseLeave={() => setIsHoveringNav(false)}
                          style={{
                            width: "100%",
                            padding: "0.875rem",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(137, 207, 240, 0.2)",
                            borderRadius: "6px",
                            color: "#ffffff",
                            fontSize: "14px",
                            fontFamily: "Poppins, sans-serif",
                            outline: "none",
                            transition: "all 0.3s ease",
                            resize: "vertical",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#89cff0";
                            e.target.style.background = "rgba(255, 255, 255, 0.05)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(137, 207, 240, 0.2)";
                            e.target.style.background = "rgba(255, 255, 255, 0.03)";
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formSubmitting}
                        onMouseEnter={(e) => {
                          if (!formSubmitting) {
                            setIsHoveringNav(true);
                            e.currentTarget.style.background = "#a0d5f0";
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                              "0 10px 30px rgba(137, 207, 240, 0.4)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!formSubmitting) {
                            setIsHoveringNav(false);
                            e.currentTarget.style.background = "#89cff0";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }
                        }}
                        style={{
                          width: "auto",
                          padding: "1rem 3rem",
                          background: formSubmitting
                            ? "rgba(137, 207, 240, 0.5)"
                            : "#89cff0",
                          border: "none",
                          color: "#000000",
                          fontSize: "12px",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                          opacity: formSubmitting ? 0.7 : 1,
                        }}
                      >
                        {formSubmitting ? "Sending..." : "Contact Us"}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "4rem",
                  borderTop: "1px solid rgba(137, 207, 240, 0.1)",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgba(255, 255, 255, 0.5)",
                    margin: 0,
                  }}
                >
                  © 2025 Gravity Engage. All rights reserved.
                </p>
                <div style={{ display: "flex", gap: "2rem" }}>
                  {["Privacy", "Terms", "Cookies"].map((item) => (
                    <button
                      key={item}
                      onMouseEnter={(e) => {
                        setIsHoveringNav(true);
                        e.currentTarget.style.color = "#89cff0";
                      }}
                      onMouseLeave={(e) => {
                        setIsHoveringNav(false);
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "14px",
                        fontWeight: 300,
                        transition: "color 0.3s ease",
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
