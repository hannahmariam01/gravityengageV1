import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ExperimentsPage() {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [activeTab, setActiveTab] = useState<"experiments" | "blogs">("experiments");

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

    const experiments = [
        {
            title: "Rapid co-creation as a design process",
            description: "Design by building—validate ideas through real prototypes.",
            image: "/rapid co creation.png",
        },
        {
            title: "AI Presentation Designer",
            description: "AI turns content into on-brand presentations.",
            image: "/AAI PRESENTATION DESIGNER.png",
        },
        {
            title: "Gravity Game Space",
            description: "3D spaces make business systems intuitive.",
            image: "/GRAVITY GAME SPACE.png",
        }
    ];

    const blogs = [
        {
            title: "The Future of AI in Design",
            date: "March 2026",
            excerpt: "How generative models are reshaping the creative process and what it means for designers.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Building Resilient Cities",
            date: "February 2026",
            excerpt: "Insights from our latest Smart City project in AD and the role of cognitive architecture.",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        body, html, #root { margin: 0; padding: 0; overflow-x: hidden; font-family: 'Inter', sans-serif; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(137, 207, 240, 0.4); } 50% { box-shadow: 0 0 40px rgba(137, 207, 240, 0.8); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .scroll-container { overflow-y: auto; height: 100vh; scroll-behavior: smooth; }
        .scroll-container::-webkit-scrollbar { width: 8px; }
        .scroll-container::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); }
        .scroll-container::-webkit-scrollbar-thumb { background: rgba(137, 207, 240, 0.5); border-radius: 4px; }
        .scroll-container::-webkit-scrollbar-thumb:hover { background: rgba(137, 207, 240, 0.7); }
        .tab-button {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            font-size: 18px;
            font-weight: 500;
            padding: 1rem 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        .tab-button.active {
            color: #89cff0;
        }
        .tab-indicator {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 3px;
            background: #89cff0;
            border-radius: 3px;
            box-shadow: 0 0 10px #89cff0;
            transition: all 0.3s ease;
        }

        /* NEW BEAM AND PARTICLE STYLES */
        .beam-container {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            z-index: 1;
            display: flex;
            justify-content: center;
            pointer-events: none;
        }
        .beam-container.top { 
            top: -120px; 
            height: 120px;
            align-items: flex-end;
        }
        .beam-container.bottom { 
            bottom: -120px; 
            height: 120px;
            align-items: flex-start;
        }
        .beam-glow {
            width: 3px;
            height: 100%;
            background: linear-gradient(to bottom, rgba(137, 207, 240, 0), rgba(137, 207, 240, 1) 50%, rgba(255, 255, 255, 1) 80%, rgba(137, 207, 240, 0));
            box-shadow: 0 0 15px rgba(137, 207, 240, 0.8), 0 0 30px rgba(139, 92, 246, 0.5);
            filter: blur(1.5px);
            position: relative;
        }
        .beam-glow::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(137, 207, 240, 0) 70%);
            filter: blur(5px);
        }
        .mini-particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 10px #89cff0, 0 0 20px #89cff0;
            animation: miniFloat infinite ease-in-out;
            opacity: 0;
        }
        @keyframes miniFloat {
            0% { transform: translate(0, 0) scale(0); opacity: 0; }
            30% { opacity: 1; transform: translate(var(--dx), var(--dy)) scale(1); }
            100% { transform: translate(var(--dx2), var(--dy2)) scale(0); opacity: 0; }
        }
        .particle-wrap {
            position: absolute;
            inset: 0;
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
                        opacity: 0.6,
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
                                    if (item === "HOME") navigate("/");
                                    else if (item === "WORK") navigate("/work");
                                    else if (item === "EXPERIMENTS") navigate("/experiments");
                                    else if (item === "ABOUT") navigate("/about");
                                }}
                                style={{
                                    position: "relative",
                                    cursor: "pointer",
                                    background: "transparent",
                                    border: "none",
                                    color: idx === 2 ? "#89cff0" : "#ffffff",
                                    fontSize: "11px",
                                    fontWeight: "400",
                                    letterSpacing: "0.2em",
                                    fontFamily: "'Outfit', sans-serif",
                                    transition: "all 0.3s ease",
                                    padding: "8px 0",
                                }}
                            >
                                {item}
                                {idx === 2 && (
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
                        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
                            <div
                                style={{
                                    marginBottom: "4rem",
                                    animation: "fadeInUp 0.8s ease-out 0.2s backwards",
                                    textAlign: "center"
                                }}
                            >
                                <h1
                                    style={{
                                        fontSize: "64px",
                                        fontWeight: 300,
                                        color: "#ffffff",
                                        margin: "0 0 1rem 0",
                                        textShadow: "0 0 30px rgba(137, 207, 240, 0.4)",
                                    }}
                                >
                                    Experiments
                                </h1>
                                <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                                    A space for exploration, innovation, and thought leadership.
                                </p>
                            </div>

                            <div style={{
                                display: "none",
                                justifyContent: "center",
                                gap: "2rem",
                                marginBottom: "4rem",
                                animation: "fadeInUp 0.8s ease-out 0.4s backwards"
                            }}>
                                <button
                                    className={`tab-button ${activeTab === "experiments" ? "active" : ""}`}
                                    onClick={() => setActiveTab("experiments")}
                                >
                                    Experiments
                                    {activeTab === "experiments" && <div className="tab-indicator" />}
                                </button>
                                <button
                                    className={`tab-button ${activeTab === "blogs" ? "active" : ""}`}
                                    onClick={() => setActiveTab("blogs")}
                                    style={{ display: "none" }}
                                >
                                    Blogs
                                    {activeTab === "blogs" && <div className="tab-indicator" />}
                                </button>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "6rem",
                                    flexWrap: "wrap",
                                    paddingTop: "6rem",
                                    animation: "fadeInUp 0.8s ease-out 0.6s backwards",
                                }}
                            >
                                {activeTab === "experiments" && experiments.map((exp, idx) => (
                                    <div key={idx} style={{ position: "relative", width: "450px", marginBottom: "8rem" }}>
                                        {/* Top Beam */}
                                        <div className="beam-container top">
                                            <div className="particle-wrap">
                                                {[...Array(15)].map((_, i) => (
                                                    <div key={i} className="mini-particle" style={{
                                                        '--dx': `${(Math.random() - 0.5) * 40}px`,
                                                        '--dy': `${(Math.random() - 0.5) * 40}px`,
                                                        '--dx2': `${(Math.random() - 0.5) * 80}px`,
                                                        '--dy2': `${-60 - Math.random() * 40}px`,
                                                        left: '50%',
                                                        bottom: '0',
                                                        animationDelay: `${Math.random() * 3}s`,
                                                        animationDuration: `${2 + Math.random() * 2}s`
                                                    } as any}></div>
                                                ))}
                                            </div>
                                            <div className="beam-glow"></div>
                                        </div>

                                        {/* Main Glass Card */}
                                        <div
                                            style={{
                                                position: "relative",
                                                zIndex: 10,
                                                background: "rgba(10, 5, 25, 0.4)",
                                                backdropFilter: "blur(40px)",
                                                WebkitBackdropFilter: "blur(40px)",
                                                border: "1px solid rgba(137, 207, 240, 0.4)",
                                                borderRadius: "40px",
                                                padding: "3rem",
                                                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                                                cursor: "pointer",
                                                overflow: "hidden",
                                                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-15px) scale(1.03)";
                                                e.currentTarget.style.borderColor = "rgba(137, 207, 240, 0.9)";
                                                e.currentTarget.style.boxShadow = "0 40px 100px rgba(137, 207, 240, 0.25)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0) scale(1)";
                                                e.currentTarget.style.borderColor = "rgba(137, 207, 240, 0.4)";
                                                e.currentTarget.style.boxShadow = "0 30px 60px rgba(0, 0, 0, 0.6)";
                                            }}
                                        >
                                            {/* Subtitle/Index */}
                                            <div style={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "rgba(137, 207, 240, 0.7)",
                                                letterSpacing: "4px",
                                                marginBottom: "1.5rem",
                                                fontFamily: "'Outfit', sans-serif"
                                            }}>
                                                0{idx + 1}
                                            </div>

                                            {/* Image Showcase */}
                                            <div style={{
                                                width: "100%",
                                                borderRadius: "24px",
                                                overflow: "hidden",
                                                marginBottom: "2.5rem",
                                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                                position: "relative",
                                                background: "rgba(0, 0, 0, 0.2)"
                                            }}>
                                                <img src={exp.image} alt={exp.title} style={{ width: "100%", height: "auto", display: "block", objectFit: "contain", transition: "transform 1s ease" }} className="card-image-hover" />
                                                <div style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    background: "linear-gradient(to bottom, transparent 60%, rgba(10, 5, 25, 0.4))",
                                                    pointerEvents: "none"
                                                }}></div>
                                            </div>

                                            <h3 style={{
                                                color: "#fff",
                                                fontSize: "32px",
                                                fontWeight: 400,
                                                marginBottom: "1rem",
                                                letterSpacing: "-0.5px",
                                                fontFamily: "'Outfit', sans-serif"
                                            }}>
                                                {exp.title}
                                            </h3>
                                            
                                            <p style={{
                                                color: "rgba(255, 255, 255, 0.6)",
                                                lineHeight: "1.8",
                                                fontSize: "16px",
                                                fontWeight: 300,
                                                marginBottom: "1rem"
                                            }}>
                                                {exp.description}
                                            </p>

                                            {/* Top Right Flame Icon */}
                                            <div style={{
                                                position: "absolute",
                                                top: "3rem",
                                                right: "3rem",
                                                opacity: 0.5,
                                                filter: "drop-shadow(0 0 10px rgba(137, 207, 240, 0.4))"
                                            }}>
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                                                    <path d="M12 2c0 0-4 4-4 8a4 4 0 0 0 8 0c0-4-4-8-4-8z" />
                                                    <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" opacity="0.3" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Bottom Beam */}
                                        <div className="beam-container bottom">
                                            <div className="particle-wrap">
                                                {[...Array(15)].map((_, i) => (
                                                    <div key={i} className="mini-particle" style={{
                                                        '--dx': `${(Math.random() - 0.5) * 40}px`,
                                                        '--dy': `${(Math.random() - 0.5) * 40}px`,
                                                        '--dx2': `${(Math.random() - 0.5) * 80}px`,
                                                        '--dy2': `${60 + Math.random() * 40}px`,
                                                        left: '50%',
                                                        top: '0',
                                                        animationDelay: `${Math.random() * 3}s`,
                                                        animationDuration: `${2 + Math.random() * 2}s`
                                                    } as any}></div>
                                                ))}
                                            </div>
                                            <div className="beam-glow"></div>
                                        </div>
                                    </div>
                                ))}

                                {activeTab === "blogs" && blogs.map((blog, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            width: "400px",
                                            background: "rgba(255, 255, 255, 0.03)",
                                            border: "1px solid rgba(139, 92, 246, 0.2)",
                                            borderRadius: "24px",
                                            padding: "2rem",
                                            transition: "all 0.4s ease",
                                            cursor: "pointer",
                                            backdropFilter: "blur(10px)",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-10px)";
                                            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.6)";
                                            e.currentTarget.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.2)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.2)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <div style={{
                                            width: "100%",
                                            height: "200px",
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            marginBottom: "1.5rem"
                                        }}>
                                            <img src={blog.image} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                        <span style={{ color: "#8b5cf6", fontSize: "14px", fontWeight: 600 }}>{blog.date}</span>
                                        <h3 style={{ color: "#fff", fontSize: "22px", margin: "0.5rem 0" }}>{blog.title}</h3>
                                        <p style={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: "1.6" }}>{blog.excerpt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
