import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";
import VelocityEngine from "./VelocityEngine";

export default function Workpage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedOfferings, setSelectedOfferings] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("button") && !target.closest(".dropdown-enter")) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const { isAdmin, login, logout } = useAdmin();
  const [logoClicks, setLogoClicks] = useState(0);

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("work_projects_v4");
    return saved ? JSON.parse(saved) : [
      {
        name: "DOH -\nHealth landscape visualisation",
        subtitle: "",
        route: "/doh-visualisation",
        video: "/DOH TILE.mp4",
        scale: 1.35,
      },
      {
        name: "Abu Dhabi Performance\nManagement System UI Revamp",
        subtitle: "Abu Dhabi Executive Office",
        route: "/adpm-revamp",
        video: "/Adpm tile.mp4",
      },
      {
        name: "Eden Monaro interactive Visualisation",
        subtitle: "",
        route: "/eden-monaro",
        video: "/eden monaro tile.mp4",
        blur: true,
      },
      {
        name: "Executive Council Affairs System platform transformation",
        subtitle: "",
        route: null,
        video: "/ecas tile.mp4",
      },
      {
        name: "Immersion centre at VFS Global",
        subtitle: "VFS Insight",
        route: null,
        video: "/VFS TILE.mp4",
      },
      {
        name: "Excellence awards",
        subtitle: "",
        route: null,
        video: "/EXCELLENCE TILE.mp4",
      },
    ];
  });

  const [editingProject, setEditingProject] = useState<number | null>(null);

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

  const updateProject = (index: number, field: string, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
    localStorage.setItem("work_projects_v4", JSON.stringify(newProjects));
  };

  const clearAllFilters = () => {
    setSelectedOfferings([]);
    setSelectedSkills([]);
    setSelectedIndustries([]);
  };

  const hasActiveFilters =
    selectedOfferings.length > 0 ||
    selectedSkills.length > 0 ||
    selectedIndustries.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        body, html, #root {
          margin: 0;
          padding: 0;
          overflow: hidden !important;
          height: 100vh !important;
          font-family: 'Inter', sans-serif;
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
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(137, 207, 240, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(137, 207, 240, 0.8);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .dropdown-enter {
          animation: fadeInDown 0.3s ease-out;
        }
        
        .filter-tag {
          animation: scaleIn 0.3s ease-out;
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
            style={{ height: "16px", cursor: "pointer", opacity: 0.8 }}
            onClick={handleLogoClick}
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
                      animation: "glow 2s ease-in-out infinite",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        <div
          style={{
            position: "relative",
            height: "100vh",
            padding: "6rem 4rem 2rem",
            display: "flex",
            flexDirection: "column",
            zIndex: 100,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              marginBottom: "3.5rem",
              marginTop: "2rem",
              animation: "fadeInUp 0.8s ease-out 0.2s backwards",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <h2
                style={{
                  fontSize: "56px",
                  fontWeight: 300,
                  color: "#ffffff",
                  margin: 0,
                  textShadow: "0 0 30px rgba(137, 207, 240, 0.3)",
                }}
              >
                Our work
              </h2>
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


          {/* Filter Section */}
          <div
            style={{
              marginBottom: "2.5rem",
              animation: "fadeInUp 0.8s ease-out 0.4s backwards",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              {[
                {
                  key: "offering",
                  label: "By offering",
                  items: [
                    "Breakthrough products",
                    "Design as a strategic enabler",
                    "Data driven visual communication",
                    "Adoption by design",
                  ],
                },
                {
                  key: "skill",
                  label: "By skill",
                  items: [
                    "Rapid prototyping",
                    "Immersive experiences",
                    "Dashboard design",
                    "Data visualisation",
                    "Storytelling",
                    "UI/UX design",
                    "Visual design",
                    "Service design",
                  ],
                },
                {
                  key: "industry",
                  label: "By industry",
                  items: [
                    "Real estate",
                    "Health",
                    "Tech",
                    "Education",
                    "Investment Management",
                    "Infrastructure",
                    "Government",
                    "Law enforcement",
                    "Transportation",
                    "Utilities",
                  ],
                },
              ].map(({ key, label, items }) => {
                const selected =
                  key === "offering"
                    ? selectedOfferings
                    : key === "skill"
                      ? selectedSkills
                      : selectedIndustries;
                const setSelected =
                  key === "offering"
                    ? setSelectedOfferings
                    : key === "skill"
                      ? setSelectedSkills
                      : setSelectedIndustries;
                return (
                  <div key={key} style={{ position: "relative" }}>
                    <button
                      onClick={() =>
                        setActiveFilter(activeFilter === key ? null : key)
                      }
                      style={{
                        background:
                          activeFilter === key || selected.length > 0
                            ? "rgba(137, 207, 240, 0.15)"
                            : "transparent",
                        border:
                          activeFilter === key || selected.length > 0
                            ? "2px solid #89cff0"
                            : "2px solid rgba(255, 255, 255, 0.3)",
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: "0.65rem 1.2rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        borderRadius: "10px",
                        transition: "all 0.3s ease",
                        boxShadow:
                          activeFilter === key || selected.length > 0
                            ? "0 4px 15px rgba(137, 207, 240, 0.3)"
                            : "none",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#89cff0";
                        e.currentTarget.style.background =
                          "rgba(137, 207, 240, 0.15)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 6px 20px rgba(137, 207, 240, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        if (activeFilter !== key && selected.length === 0) {
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.3)";
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.boxShadow = "none";
                        }
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {label}
                      {selected.length > 0 && (
                        <span
                          style={{
                            background: "#89cff0",
                            color: "#000000",
                            borderRadius: "50%",
                            width: "22px",
                            height: "22px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          {selected.length}
                        </span>
                      )}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{
                          transform:
                            activeFilter === key
                              ? "rotate(180deg)"
                              : "rotate(0)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {activeFilter === key && (
                      <div
                        className="dropdown-enter"
                        style={{
                          position: "absolute",
                          top: "calc(100% + 0.5rem)",
                          left: 0,
                          background: "rgba(10, 5, 20, 0.98)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(137, 207, 240, 0.4)",
                          borderRadius: "12px",
                          padding: "0.5rem",
                          minWidth: "280px",
                          zIndex: 1000,
                          maxHeight: "300px",
                          overflowY: "auto",
                          boxShadow: "0 10px 40px rgba(137, 207, 240, 0.3)",
                        }}
                      >
                        {items.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              if (selected.includes(item)) {
                                setSelected(selected.filter((s) => s !== item));
                              } else {
                                setSelected([...selected, item]);
                              }
                            }}
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                              background: selected.includes(item)
                                ? "rgba(137, 207, 240, 0.2)"
                                : "transparent",
                              border: "none",
                              color: selected.includes(item)
                                ? "#89cff0"
                                : "#ffffff",
                              padding: "0.75rem 1rem",
                              fontSize: "14px",
                              cursor: "pointer",
                              borderRadius: "8px",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(137, 207, 240, 0.2)";
                              e.currentTarget.style.transform =
                                "translateX(4px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                selected.includes(item)
                                  ? "rgba(137, 207, 240, 0.2)"
                                  : "transparent";
                              e.currentTarget.style.transform = "translateX(0)";
                            }}
                          >
                            • {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    background: "transparent",
                    border: "2px solid rgba(255, 99, 132, 0.6)",
                    color: "#ff6384",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "25px",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    whiteSpace: "nowrap",
                    marginLeft: "auto",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 99, 132, 0.15)";
                    e.currentTarget.style.borderColor = "#ff6384";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 99, 132, 0.6)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4L12 12M12 4L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Clear All
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                {[
                  ...selectedOfferings,
                  ...selectedSkills,
                  ...selectedIndustries,
                ].map((value, i) => (
                  <div
                    key={i}
                    className="filter-tag"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "rgba(137, 207, 240, 0.15)",
                      border: "1px solid #89cff0",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontSize: "13px",
                      color: "#ffffff",
                    }}
                  >
                    {value}
                    <button
                      onClick={() => {
                        if (selectedOfferings.includes(value)) {
                          setSelectedOfferings(
                            selectedOfferings.filter((s) => s !== value)
                          );
                        } else if (selectedSkills.includes(value)) {
                          setSelectedSkills(
                            selectedSkills.filter((s) => s !== value)
                          );
                        } else if (selectedIndustries.includes(value)) {
                          setSelectedIndustries(
                            selectedIndustries.filter((s) => s !== value)
                          );
                        }
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#89cff0",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.2)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M4 4L12 12M12 4L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Project Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              animation: "fadeInUp 0.8s ease-out 0.6s backwards",
              paddingBottom: "4rem",
              marginTop: "2rem",
            }}
          >
            {projects.map((project: any, idx: number) => {
              const isDataVis = selectedSkills.includes("Data visualisation");
              const isVisualDesign = selectedSkills.includes("Visual design");

              if (isDataVis || isVisualDesign) {
                if (
                  !project.name.toLowerCase().includes("eden monaro") &&
                  !project.name.toLowerCase().includes("doh")
                ) {
                  return null;
                }
              }

              const isHealth = selectedIndustries.includes("Health");
              const isGov = selectedIndustries.includes("Government");

              if (isHealth || isGov) {
                const isValidHealth = isHealth && project.name.toLowerCase().includes("doh");
                const isValidGov = isGov && project.name.toLowerCase().includes("eden monaro");
                if (!isValidHealth && !isValidGov) {
                  return null;
                }
              }
              return (
              <div
                key={idx}
                style={{
                  width: "100%",
                  height: 0,
                  paddingBottom: "66.67%",
                  position: "relative",
                }}
              >
                <div
                  onClick={() => {
                    if (project.route) {
                      navigate(project.route);
                    }
                  }}
                  onMouseEnter={() => setHoveredProject(idx)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    border:
                      hoveredProject === idx
                        ? "2px solid #89cff0"
                        : "2px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(10, 5, 20, 0.6)",
                    backdropFilter: "blur(10px)",
                    cursor: project.route ? "pointer" : "default",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    boxShadow:
                      hoveredProject === idx
                        ? "0 25px 50px rgba(137, 207, 240, 0.4), 0 0 60px rgba(139, 92, 246, 0.3)"
                        : "0 10px 30px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {isAdmin && (
                    <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10 }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProject(editingProject === idx ? null : idx);
                        }}
                        style={{
                          background: "rgba(137, 207, 240, 0.2)",
                          border: "1px solid #89cff0",
                          color: "#89cff0",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        {editingProject === idx ? "X" : "EDIT"}
                      </button>
                    </div>
                  )}
                  {/* Video Background */}
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                      transform: hoveredProject === idx 
                        ? (project.scale ? `scale(${project.scale + 0.05})` : "scale(1.05)") 
                        : (project.scale ? `scale(${project.scale})` : "scale(1)"),
                      filter: project.blur ? "blur(2px)" : "none",
                    }}
                  />

                  {/* Overlay gradient */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(10, 5, 20, 0.7), rgba(25, 10, 50, 0.8))",
                      transition: "opacity 0.4s ease",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(137, 207, 240, 0.1), rgba(139, 92, 246, 0.1))",
                      opacity: hoveredProject === idx ? 1 : 0,
                      transition: "opacity 0.4s ease",
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      textAlign: "center",
                      padding: "2rem",
                      display: editingProject === idx ? "none" : "block"
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#89cff0",
                        letterSpacing: "0.2em",
                        marginBottom: "1rem",
                        textTransform: "uppercase",
                      }}
                    >
                      PROJECT {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3
                      style={{
                        fontSize: "28px",
                        fontWeight: 600,
                        color: "#ffffff",
                        marginBottom: "0.5rem",
                        lineHeight: "1.2",
                        textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {project.name}
                    </h3>


                    {!project.route && hoveredProject === idx && (
                      <div
                        style={{
                          marginTop: "1.5rem",
                          fontSize: "14px",
                          color: "rgba(255, 255, 255, 0.6)",
                          fontStyle: "italic",
                        }}
                      >
                        Coming Soon
                      </div>
                    )}
                  </div>

                  {isAdmin && editingProject === idx && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: "relative",
                        zIndex: 1,
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        width: "80%"
                      }}
                    >
                      <label style={{ color: "#89cff0", fontSize: "10px", fontWeight: 600, textTransform: "uppercase" }}>Name</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => updateProject(idx, "name", e.target.value)}
                        style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid #89cff0", padding: "8px", borderRadius: "8px", outline: "none" }}
                      />

                      <label style={{ color: "#89cff0", fontSize: "10px", fontWeight: 600, textTransform: "uppercase" }}>Video URL</label>
                      <input
                        type="text"
                        value={project.video}
                        onChange={(e) => updateProject(idx, "video", e.target.value)}
                        style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid #89cff0", padding: "8px", borderRadius: "8px", outline: "none" }}
                      />
                    </div>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
