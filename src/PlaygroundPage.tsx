import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PlaygroundPage() {
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
            title: "Generative Workflows",
            description: "Exploring the boundary between human intent and machine generation.",
            image: "https://raw.githubusercontent.com/hannahmariam01/images/main/02.png",
        },
        {
            title: "Interactive Systems",
            description: "Prototyping next-generation interfaces for complex data visualization.",
            image: "https://raw.githubusercontent.com/hannahmariam01/images/main/03.png",
        },
        {
            title: "Cognitive Architectures",
            description: "Designing the mental models for the cities of tomorrow.",
            image: "https://raw.githubusercontent.com/hannahmariam01/images/main/01.png",
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
                                    if (item === "HOME") navigate("/");
                                    else if (item === "WORK") navigate("/work");
                                    else if (item === "PLAYGROUND") navigate("/playground");
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
                                    Playground
                                </h1>
                                <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                                    A space for exploration, innovation, and thought leadership.
                                </p>
                            </div>

                            <div style={{
                                display: "flex",
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
                                >
                                    Blogs
                                    {activeTab === "blogs" && <div className="tab-indicator" />}
                                </button>
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                                    gap: "3rem",
                                    animation: "fadeInUp 0.8s ease-out 0.6s backwards",
                                }}
                            >
                                {activeTab === "experiments" ? experiments.map((exp, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            background: "rgba(255, 255, 255, 0.03)",
                                            border: "1px solid rgba(137, 207, 240, 0.2)",
                                            borderRadius: "24px",
                                            padding: "2rem",
                                            transition: "all 0.4s ease",
                                            cursor: "pointer",
                                            backdropFilter: "blur(10px)",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-10px)";
                                            e.currentTarget.style.borderColor = "rgba(137, 207, 240, 0.6)";
                                            e.currentTarget.style.boxShadow = "0 20px 40px rgba(137, 207, 240, 0.2)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.borderColor = "rgba(137, 207, 240, 0.2)";
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
                                            <img src={exp.image} alt={exp.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                        <h3 style={{ color: "#fff", fontSize: "22px", marginBottom: "0.5rem" }}>{exp.title}</h3>
                                        <p style={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: "1.6" }}>{exp.description}</p>
                                    </div>
                                )) : blogs.map((blog, idx) => (
                                    <div
                                        key={idx}
                                        style={{
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
