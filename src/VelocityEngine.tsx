import React, { useEffect, useRef } from "react";

const VelocityEngine = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
            size: Math.random() * 2.5 + 1.0,
            speedX: (Math.random() - 0.5) * 2.5,
            speedY: (Math.random() - 0.5) * 2.5,
            opacity: Math.random() * 0.5 + 0.4,
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

            // Add connecting lines
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        const opacity = 0.2 * (1 - distance / 150);
                        ctx.strokeStyle = `rgba(137, 207, 240, ${opacity})`;
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

    const steps = [
        {
            number: "01",
            title: "System Audit",
            subtitle: "Fix the logic before the look.",
            description: "We start with a Logic Map — not layouts. We identify inefficiencies, misalignment, and where value is leaking. Before designing anything, we redefine the real problem.",
            icon: "/images/audit-icon.png",
            color: "#89cff0"
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
            padding: "8rem 0",
            position: "relative",
            zIndex: 10,
            overflow: "hidden",
            background: "rgba(10, 5, 20, 1)",
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            {/* Themed Background Elements */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: 0.8,
                    zIndex: 0
                }}
            />

            <div
                style={{
                    position: "absolute",
                    top: "15%",
                    left: "10%",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(137, 207, 240, 0.1), transparent 70%)",
                    filter: "blur(100px)",
                    zIndex: -2,
                    animation: "pulse 12s ease-in-out infinite",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "10%",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%)",
                    filter: "blur(120px)",
                    zIndex: -2,
                    animation: "pulse 15s ease-in-out infinite",
                    animationDelay: "2s",
                }}
            />

            <div style={{ textAlign: "center", marginBottom: "8rem", position: "relative", zIndex: 1 }}>
                <h2 style={{ fontSize: "56px", fontWeight: 300, color: "#fff", margin: "0 0 1rem", letterSpacing: "-0.01em", textShadow: "0 0 30px rgba(137, 207, 240, 0.3)" }}>How We Work</h2>
                <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#89cff0", margin: "0 0 2rem", textTransform: "uppercase", letterSpacing: "0.4em" }}>
                    The Velocity Engine
                </h3>
                <p style={{ maxWidth: "800px", margin: "0 auto", color: "rgba(255, 255, 255, 0.8)", fontSize: "21px", fontWeight: 300, lineHeight: "1.8" }}>
                    A structured three-step process designed to uncover root problems, accelerate decisions, and deploy with precision.
                </p>
            </div>

            <div style={{ position: "relative", maxWidth: "1600px", margin: "0 auto", width: "100%", padding: "0 4rem" }}>

                {/* Modern Numbers Interface - Matching Provided Design */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "3rem", // Reduced spacing
                    width: "100%",
                    padding: "0 2rem"
                }}>
                    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(137, 207, 240, 0.3))" }}></div>

                    {steps.map((step, idx) => (
                        <React.Fragment key={idx}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0 1.5rem" }}>
                                <div style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: step.color,
                                    boxShadow: `0 0 10px ${step.color}, 0 0 20px ${step.color}`
                                }}></div>
                                <span style={{
                                    fontSize: "28px", // Smaller numbers
                                    fontWeight: 300,
                                    color: "#fff",
                                    fontFamily: "inherit",
                                    textShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
                                }}>
                                    {step.number}
                                </span>
                                <div style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: step.color,
                                    boxShadow: `0 0 10px ${step.color}, 0 0 20px ${step.color}`
                                }}></div>
                            </div>

                            {/* Connecting Line Section */}
                            <div style={{
                                flex: 1,
                                height: "1px",
                                background: idx === 0
                                    ? "linear-gradient(90deg, rgba(137, 207, 240, 0.3), rgba(139, 92, 246, 0.3))"
                                    : idx === 1
                                        ? "linear-gradient(90deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))"
                                        : "linear-gradient(90deg, rgba(236, 72, 153, 0.3), transparent)"
                            }}></div>
                        </React.Fragment>
                    ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2.5rem", position: "relative", zIndex: 1 }}>
                    {steps.map((step, idx) => (
                        <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {/* Card with Glassmorphism */}
                            <div style={{
                                background: "rgba(255, 255, 255, 0.012)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255, 255, 255, 0.04)",
                                borderRadius: "24px",
                                padding: "2.5rem 2rem", // Significantly reduced padding
                                textAlign: "center",
                                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)"
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-10px) scale(1.01)";
                                    e.currentTarget.style.border = `1px solid ${step.color}33`;
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                                    e.currentTarget.style.boxShadow = `0 25px 60px rgba(0, 0, 0, 0.4), 0 0 30px ${step.color}08`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                                    e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.04)";
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.012)";
                                    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
                                }}>
                                <div style={{ marginBottom: "2rem", width: "85px", height: "85px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <img src={step.icon} alt={step.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                                </div>
                                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", margin: "0 0 0.8rem", letterSpacing: "-0.01em" }}>{step.title}</h4>
                                <p style={{ color: step.color, fontSize: "14px", fontWeight: 600, marginBottom: "1.5rem", letterSpacing: "0.05em" }}>
                                    {step.subtitle}
                                </p>
                                <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "13.5px", lineHeight: "1.7", margin: 0, fontWeight: 300 }}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VelocityEngine;
