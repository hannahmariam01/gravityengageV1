import React, { useEffect, useRef, useState } from "react";

const VelocityEngine = ({ progress = 1, variant = "work" }: { progress?: number, variant?: "home" | "work" }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 1.0,
            speedY: (Math.random() - 0.5) * 1.0,
            opacity: Math.random() * 0.3 + 0.2,
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
                ctx.fillStyle = variant === "home" ? `rgba(137, 207, 240, ${particle.opacity})` : `rgba(0, 240, 255, ${particle.opacity})`;
                ctx.fill();
            });

            // Add connecting lines
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        const opacity = 0.1 * (1 - distance / 120);
                        ctx.strokeStyle = variant === "home" ? `rgba(137, 207, 240, ${opacity})` : `rgba(0, 240, 255, ${opacity})`;
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
    }, [variant]);

    const steps = [
        {
            number: "01",
            title: "System Audit",
            subtitle: "Fix the logic before the look.",
            description: "We start with a Logic Map — not layouts. We identify inefficiencies, misalignment, and where value is leaking. Before designing anything, we redefine the real problem.",
            icon: "/images/audit-icon.png",
            color: "#00f0ff"
        },
        {
            number: "02",
            title: "AI-Accelerated Prototyping",
            subtitle: "From idea to direction — fast.",
            description: "We bypass traditional moodboards using generative AI. Instead of debating concepts, we prototype strategic directions. Faster validation. Sharper decisions.",
            icon: "/images/ai-icon.png",
            color: "#8b5cf6"
        },
        {
            number: "03",
            title: "Cross-Medium Deployment",
            subtitle: "Built for execution, not presentation.",
            description: "We deliver documentation that works across teams. Technical clarity for your CTO. Narrative clarity for your CMO. Assets ready to scale.",
            icon: "/images/rocket-icon.png",
            color: "#ec4899"
        }
    ];

    return (
        <section style={{
            padding: "2rem 0",
            position: "relative",
            zIndex: 10,
            overflow: "hidden",
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: progress * 0.5,
                    zIndex: 0,
                }}
            />

            <div style={{ textAlign: "center", marginBottom: "4rem", position: "relative", zIndex: 1, padding: "0 2rem" }}>
                <h2 style={{
                    fontSize: "44px",
                    fontWeight: 300,
                    color: "#fff",
                    margin: "0 0 0.5rem",
                    letterSpacing: "-0.01em",
                    fontFamily: "inherit",
                    opacity: progress,
                }}>
                    How We Work
                </h2>
                <h3 style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#00f0ff",
                    margin: "0 0 1.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    opacity: progress,
                }}>
                    The Velocity Engine
                </h3>
                <p style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: variant === "home" ? "18px" : "15px",
                    fontWeight: 300,
                    lineHeight: "1.6",
                    opacity: progress,
                }}>
                    A structured three-step process designed to uncover root problems, accelerate decisions, and deploy with precision.
                </p>
            </div>

            <div style={{ position: "relative", maxWidth: "1500px", margin: "0 auto", width: "100%", padding: "0 4rem" }}>
                {/* Progression Line with Icons - Synchronized Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: variant === "home" ? "2.5rem" : "4rem",
                    position: "relative",
                    marginBottom: "3rem",
                    opacity: progress,
                }}>
                    {/* The main gradient line - spans across all 3 grid columns */}
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "calc(16.66% - 20px)",
                        right: "calc(16.66% - 20px)",
                        height: "1px",
                        background: "linear-gradient(90deg, rgba(0, 240, 255, 0.3) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)",
                        zIndex: 0,
                        transform: "translateY(-50%)"
                    }} />

                    {steps.map((step, idx) => (
                        <div key={idx} style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "60px"
                        }}>
                            {/* HOME Variant: Clean number circle that sits ON TOP of the line */}
                            {variant === "home" ? (
                                <div style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "50%",
                                    background: "#080412", // Matched backround to "hide" the line behind
                                    border: `2px solid ${step.color}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: `0 0 20px ${step.color}44`,
                                    zIndex: 10,
                                    position: "relative"
                                }}>
                                    <span style={{
                                        fontSize: "22px",
                                        fontWeight: 700,
                                        color: "#fff",
                                        lineHeight: 1
                                    }}>
                                        {step.number}
                                    </span>
                                </div>
                            ) : (
                                <>
                                    {/* WORK Variant: Smaller Dot and Icon */}
                                    <div style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        background: step.color,
                                        boxShadow: `0 0 12px ${step.color}`,
                                        zIndex: 1
                                    }} />

                                    <div style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "65px",
                                        height: "65px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 50
                                    }}>
                                        <img src={step.icon} alt="" style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain",
                                            position: "relative",
                                            zIndex: 51
                                        }} />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* CARDS - Synchronized with line grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: variant === "home" ? "2.5rem" : "4.5rem",
                    position: "relative",
                    zIndex: 1
                }}>
                    {steps.map((step, idx) => (
                        <div key={idx} style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            opacity: progress,
                        }}>
                            <div
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                    background: hoveredIndex === idx ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)",
                                    backdropFilter: "blur(10px)",
                                    border: `1px solid ${hoveredIndex === idx ? step.color : "rgba(255, 255, 255, 0.05)"}`,
                                    borderRadius: "8px",
                                    padding: "2.5rem 1.5rem",
                                    textAlign: "center",
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minHeight: "160px",
                                    transform: hoveredIndex === idx ? "translateY(-8px)" : "translateY(0)",
                                    boxShadow: hoveredIndex === idx ? `0 20px 40px ${step.color}22` : "none",
                                    transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                                    cursor: "pointer"
                                }}
                            >
                                {/* HOME Variant: Icon inside the card */}
                                {variant === "home" && (
                                    <div style={{ width: "80px", height: "80px", marginBottom: "1.5rem" }}>
                                        <img src={step.icon} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                    </div>
                                )}

                                {/* WORK Variant: Number inside the card */}
                                {variant === "work" && (
                                    <h3 style={{
                                        fontSize: "28px",
                                        fontWeight: 400,
                                        color: "#ffffff",
                                        marginBottom: "0.25rem",
                                        lineHeight: 1.2
                                    }}>
                                        {step.number}
                                    </h3>
                                )}

                                {/* Title */}
                                <h4 style={{
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#ffffff",
                                    margin: "0 0 0.5rem",
                                    letterSpacing: "-0.01em"
                                }}>
                                    {step.title}
                                </h4>

                                {/* Subtitle/Description in Step Color */}
                                <p style={{
                                    color: step.color, // Fixed: Always use unique colors
                                    fontSize: variant === "home" ? "14px" : "13.5px",
                                    fontWeight: 600,
                                    margin: variant === "home" ? "0 0 1rem 0" : 0,
                                    lineHeight: "1.4"
                                }}>
                                    {step.subtitle}
                                </p>

                                {/* Full Description - Only for Home Page variant */}
                                {variant === "home" && (
                                    <p style={{
                                        color: "rgba(255, 255, 255, 0.6)",
                                        fontSize: "14px",
                                        lineHeight: "1.6",
                                        margin: 0,
                                        fontWeight: 300
                                    }}>
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VelocityEngine;
