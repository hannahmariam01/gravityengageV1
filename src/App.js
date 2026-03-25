import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";
import VelocityEngine from "./VelocityEngine";
import LensWorld from "./components/LensWorld";
import Navbar from "./components/Navbar";

const ProjectVideo = ({ src, isActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let playPromise;
    const video = videoRef.current;
    if (video) {
       if (isActive) {
        playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }
    }
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [src, isActive]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: 1,
        transition: "opacity 0.6s ease",
      }}
    />
  );
};


export default function Index() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLanding, setShowLanding] = useState(() => {
    // Check if user has visited before in this session
    return !sessionStorage.getItem("hasVisited");
  });
  const [isFirstLoad, setIsFirstLoad] = useState(() => {
    return !sessionStorage.getItem("hasVisited");
  });
  const [landingFadeOut, setLandingFadeOut] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef(null);
  const meshCanvasRef = useRef(null);
  const pipeCanvasRef = useRef(null);
  const [screen1Progress, setScreen1Progress] = useState(1);
  const [screen2Progress, setScreen2Progress] = useState(0);
  const [velocityProgress, setVelocityProgress] = useState(0);
  const [screen3Progress, setScreen3Progress] = useState(0);
  const screen1Ref = useRef(null);
  const screen2Ref = useRef(null);
  const velocityRef = useRef(null);
  const screen3Ref = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const projectCarouselRef = useRef(null);
  const projectWheelLockRef = useRef(false);
  const [orbPosition, setOrbPosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth * 0.9 : 800,
    y: typeof window !== "undefined" ? window.innerHeight * 0.25 : 200,
  });
  const [orbScale, setOrbScale] = useState(1);
  const [orbTrail, setOrbTrail] = useState([]);
  const orbAnimationRef = useRef(null);
  const trailTimerRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);
  const [activeLens, setActiveLens] = useState(null);
  const [hoveredLens, setHoveredLens] = useState(null);
  const waveCanvasRef = useRef(null);

  const waveCanvas2Ref = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const screen2BgCanvasRef = useRef(null);
  const projects = [
    {
      name: "AD cognitive",
      subtitle: "smart city",
      description:
        "Transforming urban landscapes through intelligent design and data-driven solutions",
      video:
        "https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4",
    },
    {
      name: "Australian Health",
      subtitle: "landscape",
      description:
        "Visualizing complex healthcare data to drive better outcomes",
      video:
        "https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4",
    },
    {
      name: "APSC future of work",
      subtitle: "platform",
      description: "Reimagining the workplace experience for the modern era",
      video:
        "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
    },
    {
      name: "Australian",
      subtitle: "Campaign",
      description: "Creating impactful narratives that resonate with audiences",
      video:
        "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
    },
    {
      name: "VFS",
      subtitle: "",
      description: "Building next-generation digital experiences",
      video:
        "https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_30fps.mp4",
    },
  ];

  useEffect(() => {
    if (!isFirstLoad) {
      setShowLanding(false);
      return;
    }

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLandingFadeOut(true);
            setTimeout(() => {
              setShowLanding(false);
              setIsFirstLoad(false);
              sessionStorage.setItem("hasVisited", "true");
            }, 2000);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isFirstLoad]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLandingFadeOut(true);
            setTimeout(() => setShowLanding(false), 2000);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  /* Automate the lens interaction to play as an animation (from original project) */
  useEffect(() => {
    const lensKeys = [null, 'build', 'understand', 'industry'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % lensKeys.length;
      setHoveredLens(lensKeys[index]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / scrollHeight, 1);
      setScrollProgress(progress);

      if (screen1Ref.current) {
        const rect = screen1Ref.current.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        if (rect.top > 0) {
          setScreen1Progress(1);
        } else if (rect.top <= 0 && rect.bottom > screenHeight * 0.3) {
          const fadeProgress = Math.abs(rect.top) / (screenHeight * 0.7);
          setScreen1Progress(Math.max(0, 1 - fadeProgress));
        } else {
          setScreen1Progress(0);
        }
      }

      // Screen 2 visibility
      if (screen2Ref.current) {
        const rect = screen2Ref.current.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        if (rect.top < screenHeight && rect.bottom > 0) {
          const progress = Math.max(0, Math.min(1, (screenHeight - rect.top) / screenHeight));
          setScreen2Progress(progress);
        } else {
          setScreen2Progress(0);
        }
      }

      // Velocity Engine visibility
      if (velocityRef.current) {
        const rect = velocityRef.current.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        if (rect.top < screenHeight && rect.bottom > 0) {
          const progress = Math.max(0, Math.min(1, (screenHeight - rect.top) / screenHeight));
          setVelocityProgress(progress);
        } else {
          setVelocityProgress(0);
        }
      }

      // Screen 3 visibility
      if (screen3Ref.current) {
        const rect = screen3Ref.current.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        // Start progress earlier (when it enters the bottom half of the screen) to overlap with Velocity Engine
        if (rect.top < screenHeight * 0.8 && rect.bottom > 0) {
          const progress = Math.max(0, Math.min(1, (screenHeight * 0.8 - rect.top) / (screenHeight * 0.6)));
          setScreen3Progress(progress);
        } else {
          setScreen3Progress(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/hannah.mariam@gravityone.ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            _subject: `New Contact Form Submission from ${formData.name}`,
          }),
        }
      );

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setFormSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (showLanding || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      baseOpacity: Math.random() * 0.3 + 0.2,
      speed: (Math.random() * 2 + 3) * 1000,
      phase: Math.random() * Math.PI * 2,
    }));

    let animationFrame;
    const startTime = Date.now();

    const drawStar = (x, y, size, opacity) => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
      ctx.lineWidth = size * 0.3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x, y - size * 4);
      ctx.lineTo(x, y + size * 4);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - size * 4, y);
      ctx.lineTo(x + size * 4, y);
      ctx.stroke();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
      ctx.lineWidth = size * 0.2;
      ctx.beginPath();
      ctx.moveTo(x - size * 2.5, y - size * 2.5);
      ctx.lineTo(x + size * 2.5, y + size * 2.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + size * 2.5, y - size * 2.5);
      ctx.lineTo(x - size * 2.5, y + size * 2.5);
      ctx.stroke();
      ctx.shadowBlur = size * 8;
      ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      if (scrollProgress > 0.3) {
        // Skip animation when not visible
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentTime = Date.now() - startTime;
      stars.forEach((star) => {
        const cycle =
          ((currentTime + star.phase * 1000) % star.speed) / star.speed;
        const twinkle = Math.sin(cycle * Math.PI * 2);
        const currentOpacity = star.baseOpacity + twinkle * 0.25;
        drawStar(star.x, star.y, star.size, Math.max(0.15, currentOpacity));
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [showLanding]);

  useEffect(() => {
    if (showLanding || !meshCanvasRef.current) return;
    const canvas = meshCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src =
      "https://raw.githubusercontent.com/hannahmariam01/images/main/MESH%404x.png";

    let animationFrame;
    let time = 0;
    let imageLoaded = false;

    const animate = () => {
      if (!imageLoaded || scrollProgress > 0.3) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      const waveX =
        Math.sin(time * 0.5) * 30 +
        Math.sin(time * 0.3) * 15 +
        Math.cos(time * 0.2) * 10;
      const waveY =
        Math.cos(time * 0.4) * 25 +
        Math.sin(time * 0.25) * 18 +
        Math.cos(time * 0.35) * 12;
      const scale =
        1 + Math.sin(time * 0.3) * 0.04 + Math.cos(time * 0.2) * 0.03;
      const rotation =
        Math.sin(time * 0.15) * 0.05 + Math.cos(time * 0.1) * 0.04;
      const imgWidth = canvas.width * 1.3;
      const imgHeight = canvas.height * 1.3;
      const x = (canvas.width - imgWidth) / 2 + waveX;
      const y = (canvas.height - imgHeight) / 2 + waveY;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.globalAlpha = 0.9;
      ctx.drawImage(img, x, y, imgWidth, imgHeight);
      ctx.restore();
      animationFrame = requestAnimationFrame(animate);
    };

    img.onload = () => {
      imageLoaded = true;
      animate();
    };
    if (img.complete) {
      imageLoaded = true;
      animate();
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [showLanding]);

  useEffect(() => {
    if (showLanding) return;
    let time = 0;
    let currentX = orbPosition.x;
    let currentY = orbPosition.y;
    let currentScale = orbScale;

    const animateOrb = () => {
      time += 0.004;

      let targetX, targetY, targetScale;
      let isStatic = false;
      let isScreen3 = false;

      const smoothEase = (t) => {
        return t < 0.5
          ? 16 * t * t * t * t * t
          : 1 - Math.pow(-2 * t + 2, 5) / 2;
      };

      if (scrollProgress < 0.15) {
        targetX = window.innerWidth * 0.92;
        targetY = window.innerHeight * 0.18;
        targetScale = 1;
        isStatic = true;
      } else if (scrollProgress >= 0.15 && scrollProgress < 0.45) {
        const t = (scrollProgress - 0.15) / 0.3;
        const easeT = smoothEase(t);
        const startX = window.innerWidth * 0.92;
        const startY = window.innerHeight * 0.18;
        const endX = window.innerWidth * 0.5;
        const endY = window.innerHeight * 0.5;

        targetX = startX + (endX - startX) * easeT;
        targetY = startY + (endY - startY) * easeT;
        targetScale = 1 + easeT * 0.9;
      } else if (scrollProgress >= 0.45 && scrollProgress < 0.85) {
        const t = (scrollProgress - 0.45) / 0.4;
        const easeT = smoothEase(t);
        const startX = window.innerWidth * 0.5;
        const startY = window.innerHeight * 0.5;
        const endX = window.innerWidth * 0.05;
        const endY = window.innerHeight * 0.92;

        targetX = startX + (endX - startX) * easeT;
        targetY = startY + (endY - startY) * easeT;
        targetScale = 1.9 - easeT * 1.4;
      } else {
        targetX = window.innerWidth * 0.05;
        targetY = window.innerHeight * 0.92;
        targetScale = 0.5;
        isStatic = true;
        isScreen3 = true;
      }

      const distanceX = Math.abs(targetX - currentX);
      const distanceY = Math.abs(targetY - currentY);
      const distanceScale = Math.abs(targetScale - currentScale);

      if (
        isScreen3 &&
        distanceX < 30 &&
        distanceY < 30 &&
        distanceScale < 0.1
      ) {
        currentX = targetX;
        currentY = targetY;
        currentScale = targetScale;
      } else if (isScreen3) {
        const dampingFactor = 0.75;
        currentX += (targetX - currentX) * dampingFactor;
        currentY += (targetY - currentY) * dampingFactor;
        currentScale += (targetScale - currentScale) * dampingFactor;
      } else if (
        isStatic &&
        distanceX < 10 &&
        distanceY < 10 &&
        distanceScale < 0.03
      ) {
        currentX = targetX;
        currentY = targetY;
        currentScale = targetScale;
      } else if (isStatic) {
        const dampingFactor = 0.6;
        currentX += (targetX - currentX) * dampingFactor;
        currentY += (targetY - currentY) * dampingFactor;
        currentScale += (targetScale - currentScale) * dampingFactor;
      } else {
        const dampingFactor = 0.28;
        currentX += (targetX - currentX) * dampingFactor;
        currentY += (targetY - currentY) * dampingFactor;
        currentScale += (targetScale - currentScale) * dampingFactor;
      }

      setOrbPosition({ x: currentX, y: currentY });
      setOrbScale(currentScale);

      orbAnimationRef.current = requestAnimationFrame(animateOrb);
    };

    animateOrb();
    return () => {
      if (orbAnimationRef.current)
        cancelAnimationFrame(orbAnimationRef.current);
    };
  }, [showLanding, scrollProgress, mousePosition]);

  useEffect(() => {
    if (showLanding) return;
    const addTrailPoint = () => {
      setOrbTrail((prev) => {
        const newTrail = [
          ...prev,
          { x: orbPosition.x, y: orbPosition.y, id: Date.now(), opacity: 1 },
        ];
        return newTrail.slice(-20);
      });
    };
    trailTimerRef.current = setInterval(addTrailPoint, 40);
    return () => {
      if (trailTimerRef.current) clearInterval(trailTimerRef.current);
    };
  }, [showLanding, orbPosition]);

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setOrbTrail((prev) =>
        prev
          .map((point) => ({ ...point, opacity: point.opacity - 0.04 }))
          .filter((point) => point.opacity > 0)
      );
    }, 40);
    return () => clearInterval(fadeInterval);
  }, []);


  useEffect(() => {
    if (showLanding || !pipeCanvasRef.current) return;
    const canvas = pipeCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const pipes = [];
    const numRings = 30;
    const ringSegments = 24;
    const ringRadius = 200;
    const ringSpacing = 100;

    for (let i = 0; i < numRings; i++) {
      const ring = [];
      for (let j = 0; j < ringSegments; j++) {
        const angle = (j / ringSegments) * Math.PI * 2;
        ring.push({
          x: Math.cos(angle) * ringRadius,
          y: Math.sin(angle) * ringRadius,
          z: i * ringSpacing,
        });
      }
      pipes.push(ring);
    }

    let cameraZ = 0;
    let cameraX = 0;
    let cameraY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const projectPoint = (x, y, z, camX, camY, camZ) => {
      const fov = 600;
      const scale = fov / (fov + z - camZ);
      return {
        x: (x - camX) * scale + canvas.width / 2,
        y: (y - camY) * scale + canvas.height / 2,
        scale,
      };
    };

    let animationFrame;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const screen2Start = screen2Ref.current?.offsetTop || 0;
      const screen3Start = screen3Ref.current?.offsetTop || 0;
      const scrollY = window.scrollY;

      if (scrollY < screen2Start - window.innerHeight) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const mouseInfluence = 0.05;
      targetCameraX = (mousePosition.x - canvas.width / 2) * 0.1;
      targetCameraY = (mousePosition.y - canvas.height / 2) * 0.1;
      cameraX += (targetCameraX - cameraX) * mouseInfluence;
      cameraY += (targetCameraY - cameraY) * mouseInfluence;

      if (scrollY >= screen2Start && scrollY < screen3Start) {
        const progress = (scrollY - screen2Start) / window.innerHeight;
        cameraZ = progress * ringSpacing * 10;
      } else if (scrollY >= screen3Start) {
        const progress = (scrollY - screen3Start) / window.innerHeight;
        cameraZ = 10 * ringSpacing + progress * ringSpacing * 5;
      }

      pipes.forEach((ring) => {
        ctx.beginPath();
        for (let i = 0; i <= ringSegments; i++) {
          const point = ring[i % ringSegments];
          const projected = projectPoint(
            point.x,
            point.y,
            point.z,
            cameraX,
            cameraY,
            cameraZ
          );
          if (i === 0) ctx.moveTo(projected.x, projected.y);
          else ctx.lineTo(projected.x, projected.y);
        }
        const depthFade = Math.max(0, 1 - Math.abs(ring[0].z - cameraZ) / 1500);
        ctx.strokeStyle = `rgba(167, 139, 250, ${depthFade * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      for (let j = 0; j < ringSegments; j += 3) {
        ctx.beginPath();
        for (let i = 0; i < numRings; i++) {
          const point = pipes[i][j];
          const projected = projectPoint(
            point.x,
            point.y,
            point.z,
            cameraX,
            cameraY,
            cameraZ
          );
          if (i === 0) ctx.moveTo(projected.x, projected.y);
          else ctx.lineTo(projected.x, projected.y);
        }
        const avgZ = pipes[Math.floor(numRings / 2)][j].z;
        const depthFade = Math.max(0, 1 - Math.abs(avgZ - cameraZ) / 1500);
        ctx.strokeStyle = `rgba(124, 58, 237, ${depthFade * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [showLanding, mousePosition, scrollProgress]);

  useEffect(() => {
    const totalProjects = projects.length;
    const position = (activeProjectIndex / (totalProjects - 1)) * 100;
    setSliderPosition(position);
  }, [activeProjectIndex, projects.length]);

  const handleProjectWheel = (e) => {
    if (!projectCarouselRef.current) return;
    const rect = projectCarouselRef.current.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    const delta = e.deltaY;
    if (Math.abs(delta) < 8) return;

    if (projectWheelLockRef.current) {
      e.preventDefault();
      return;
    }

    const direction = delta > 0 ? 1 : -1;
    const nextIndex = Math.min(
      Math.max(activeProjectIndex + direction, 0),
      projects.length - 1
    );

    if (nextIndex !== activeProjectIndex) {
      e.preventDefault();
      projectWheelLockRef.current = true;
      setActiveProjectIndex(nextIndex);
      setTimeout(() => {
        projectWheelLockRef.current = false;
      }, 650);
    }
  };

  useEffect(() => {
    if (showLanding) return;
    const wheelListener = (e) => handleProjectWheel(e);
    window.addEventListener("wheel", wheelListener, { passive: false });
    return () => window.removeEventListener("wheel", wheelListener);
  }, [showLanding, activeProjectIndex]);

  const { isAdmin, login, logout } = useAdmin();
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    if (newClicks >= 5) {
      setLogoClicks(0);
      const pass = prompt("Enter Admin Password:");
      if (pass) {
        if (!login(pass)) {
          alert("Incorrect password");
        }
      }
    } else {
      setLogoClicks(newClicks);
      // Reset clicks after 2 seconds of inactivity
      setTimeout(() => setLogoClicks(0), 2000);
      navigate("/");
    }
  };

  if (showLanding) {
    return (
      <div style={{ position: "relative" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          body, html, #root { margin: 0; padding: 0; overflow: hidden !important; height: 100vh !important; font-family: 'Poppins', sans-serif; }
          @keyframes rotate3d { 0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); } 100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
          @keyframes glow { 0%, 100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3); } 50% { box-shadow: 0 0 50px rgba(255, 255, 255, 0.9), 0 0 100px rgba(255, 255, 255, 0.7), inset 0 0 30px rgba(255, 255, 255, 0.5); } }
          @keyframes fadeOut { to { opacity: 0; transform: scale(1.2); } }
          @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
          @keyframes glowPulse { 
            0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); } 
            50% { opacity: 1; transform: translateX(-50%) scale(1.2); } 
            @keyframes floatParticle {
              0%, 100% { 
                transform: translate(0, 0) scale(1); 
                opacity: 0.4;
              }
              25% { 
                transform: translate(20px, -30px) scale(1.2); 
                opacity: 0.8;
              }
              50% { 
                transform: translate(-15px, -60px) scale(0.8); 
                opacity: 0.6;
              }
              75% { 
                transform: translate(-30px, -30px) scale(1.1); 
                opacity: 0.7;
              }
            }
            
            @keyframes expandContract {
              0%, 100% { width: 80px; }
              50% { width: 120px; }
            }
            
            @keyframes scrollIndicator {
              0% { 
                transform: translateY(0); 
                opacity: 0;
              }
              50% { 
                opacity: 1;
              }
              100% { 
                transform: translateY(30px); 
                opacity: 0;
              }
            }
            @keyframes slowRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            @keyframes gentlePulse {
              0%, 100% { 
                opacity: 0.6;
                transform: scale(1);
              }
              50% { 
                opacity: 1;
                transform: scale(1.1);
              }
            }
            
            @keyframes subtleExpand {
              0% {
                transform: scale(0.8);
                opacity: 0.3;
              }
              100% {
                transform: scale(1.5);
                opacity: 0;
              }
            }
          }
        `}</style>
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "linear-gradient(180deg, #000000 0%, #0f0f23 50%, #000000 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            animation: landingFadeOut ? "fadeOut 2s ease-out forwards" : "none",
          }}
        >
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            {[...Array(50)].map((_, i) => {
              const colors = [
                "#4f46e5",
                "#7c3aed",
                "#6366f1",
                "#8b5cf6",
                "#a855f7",
              ];
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: Math.random() * 4 + 2 + "px",
                    height: Math.random() * 4 + 2 + "px",
                    background: `radial-gradient(circle, ${colors[i % 5]
                      }, transparent)`,
                    borderRadius: "50%",
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                    animation: `pulse ${2 + Math.random() * 3
                      }s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: 0.6,
                  }}
                />
              );
            })}
          </div>
          <div
            style={{
              perspective: "1000px",
              width: "150px",
              height: "150px",
              marginBottom: "60px",
              animation: "slideUp 0.8s ease-out",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                animation: "rotate3d 4s linear infinite",
              }}
            >
              {[...Array(6)].map((_, i) => {
                const transforms = [
                  "rotateX(90deg) translateZ(75px)",
                  "rotateX(-90deg) translateZ(75px)",
                  "translateZ(75px)",
                  "rotateY(90deg) translateZ(75px)",
                  "rotateY(-90deg) translateZ(75px)",
                  "rotateY(180deg) translateZ(75px)",
                ];
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, #4f46e5, #7c3aed, #8b5cf6)",
                      opacity: 0.85,
                      border: "2px solid rgba(255, 255, 255, 0.5)",
                      borderRadius: "20px",
                      transform: transforms[i],
                      animation: "glow 2s ease-in-out infinite",
                      animationDelay: `${i * 0.2}s`,
                      backdropFilter: "blur(10px)",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              animation: "slideUp 0.8s ease-out 0.2s backwards",
            }}
          >
            <p
              style={{
                fontSize: "1.2rem",
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "2rem",
                letterSpacing: "0.05em",
              }}
            >
              Initializing Experience
            </p>
            <div
              style={{
                width: "400px",
                height: "4px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #4f46e5, #7c3aed, #8b5cf6)",
                  borderRadius: "10px",
                  width: `${loadingProgress}%`,
                  transition: "width 0.3s ease",
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.8)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    animation: "shimmer 1s infinite",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: "1rem",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#6366f1",
                textShadow: "0 0 20px rgba(99, 102, 241, 0.8)",
              }}
            >
              {loadingProgress}%
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body, html, #root { margin: 0; padding: 0; overflow-x: hidden !important; overflow-y: auto !important; height: auto !important; font-family: 'Poppins', sans-serif; scroll-behavior: smooth; cursor: none; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-100px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(100px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        
        * { cursor: none !important; }
        
        .magnetic-btn {
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .project-card {
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .project-card:hover {
          transform: translateY(-10px) scale(1.02);
        }
      `}</style>

      {/* Custom Cursor */}
      <div
        style={{
          position: "fixed",
          left: cursorPos.x,
          top: cursorPos.y,
          width: isHoveringNav ? "60px" : "20px",
          height: isHoveringNav ? "60px" : "20px",
          border: `2px solid ${isHoveringNav ? "#89cff0" : "rgba(255, 255, 255, 0.6)"
            }`,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          transition:
            "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
          mixBlendMode: "difference",
        }}
      />

      <div
        style={{
          position: "fixed",
          left: cursorPos.x,
          top: cursorPos.y,
          width: "6px",
          height: "6px",
          backgroundColor: isHoveringNav ? "#89cff0" : "white",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "background-color 0.3s ease",
        }}
      />

      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#080412", // Solid theme dark base to prevent white flashes
        }}
      >
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
            backgroundColor: "#000000",
            backgroundImage:
              "url('https://raw.githubusercontent.com/hannahmariam01/images/main/SCREEN%201%20BG%20PLAIN%404x.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            opacity: scrollProgress < 0.25 ? 1 - (scrollProgress * 4) : 0,
            transition: "opacity 0.5s ease",
          }}
        />
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2,
            background:
              scrollProgress < 0.2
                ? `rgba(8, 4, 18, ${Math.min(1, 0.3 + scrollProgress * 6)})`
                : "#080412", // Theme dark instead of pure black/white
            transition: "background 0.3s ease",
          }}
        />
        <Navbar activeLens={activeLens} setActiveLens={setActiveLens} />

        <div
          ref={screen1Ref}
          style={{
            position: "relative",
            minHeight: "100vh",
            zIndex: 100,
            opacity: screen1Progress,
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <LensWorld
            activeLens={activeLens}
            setActiveLens={setActiveLens}
            hoveredLens={hoveredLens}
            setHoveredLens={setHoveredLens}
            scrollRef={{ current: scrollProgress }}
          />
        </div>

      </div>

      <div ref={screen2Ref} style={{ position: "relative", zIndex: 200 }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "6rem 6rem 6rem 12rem", // Increased left padding from 9rem to 12rem
            position: "relative",
            background: "#080412",
            overflow: "hidden",
            opacity: 1 - velocityProgress, // Simple fade like Screen 1
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Animated gradient orbs - More subtle opacity */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "5%",
              width: "700px",
              height: "700px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(137, 207, 240, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)",
              filter: "blur(80px)",
              opacity: screen2Progress > 0.1 ? 1 : 0,
              transform: `scale(${screen2Progress > 0.1 ? 1 : 0.5})`,
              transition: "all 1.5s ease",
              animation:
                screen2Progress > 0.1
                  ? "float 15s ease-in-out infinite"
                  : "none",
              zIndex: 3,
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
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(236, 72, 153, 0.08) 50%, transparent 70%)",
              filter: "blur(80px)",
              opacity: screen2Progress > 0.3 ? 1 : 0,
              transform: `scale(${screen2Progress > 0.3 ? 1 : 0.5})`,
              transition: "all 1.5s ease 0.3s",
              animation:
                screen2Progress > 0.3
                  ? "float 18s ease-in-out infinite reverse"
                  : "none",
              zIndex: 3,
            }}
          />

          {/* Additional smaller orb - Reduced opacity */}
          <div
            style={{
              position: "absolute",
              top: "40%",
              right: "20%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
              opacity: screen2Progress > 0.5 ? 0.8 : 0,
              transition: "all 1.5s ease 0.5s",
              animation:
                screen2Progress > 0.5
                  ? "float 20s ease-in-out infinite"
                  : "none",
              zIndex: 3,
            }}
          />
          {/* Grid pattern overlay - More visible */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
          linear-gradient(rgba(137, 207, 240, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(137, 207, 240, 0.05) 1px, transparent 1px)
        `,
              backgroundSize: "80px 80px",
              opacity: screen2Progress > 0.2 ? 0.6 : 0,
              transition: "opacity 1.5s ease",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />

          {/* Animated particles - Dreamy and subtle */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: Math.random() * 3 + 1.5 + "px",
                height: Math.random() * 3 + 1.5 + "px",
                background:
                  i % 3 === 0 ? "#89cff0" : i % 3 === 1 ? "#8b5cf6" : "#ec4899",
                borderRadius: "50%",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: screen2Progress > 0.2 ? 0.2 : 0,
                animation:
                  screen2Progress > 0.2
                    ? `gentlePulse ${12 + Math.random() * 10
                    }s ease-in-out infinite`
                    : "none",
                animationDelay: `${Math.random() * 8}s`,
                boxShadow: `0 0 ${6 + Math.random() * 4}px ${i % 3 === 0
                  ? "rgba(137, 207, 240, 0.2)"
                  : i % 3 === 1
                    ? "rgba(139, 92, 246, 0.2)"
                    : "rgba(236, 72, 153, 0.2)"
                  }`,
                transition: "opacity 2s ease",
                zIndex: 3,
              }}
            />
          ))}

          {/* Diagonal lines accent - First one now takes up more space */}
          <div
            style={{
              position: "absolute",
              top: "15%", // Changed from 20%
              right: "-15%", // Changed from -10% to extend further
              width: "700px", // Increased from 500px
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)",
              transform: "rotate(45deg)",
              opacity: screen2Progress > 0.4 ? 0.8 : 0,
              transition: "opacity 1.5s ease 0.5s",
              zIndex: 3,
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              left: "-10%",
              width: "500px",
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)",
              transform: "rotate(45deg)",
              opacity: screen2Progress > 0.6 ? 0.8 : 0,
              transition: "opacity 1.5s ease 0.7s",
              zIndex: 3,
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
            }}
          />

          {/* Floating geometric shapes */}
          <div
            style={{
              position: "absolute",
              top: "25%",
              left: "15%",
              width: "80px",
              height: "80px",
              border: "2px solid rgba(137, 207, 240, 0.3)",
              borderRadius: "12px",
              opacity: screen2Progress > 0.3 ? 0.6 : 0,
              transform: `rotate(${screen2Progress * 45}deg)`,
              transition: "all 1.5s ease",
              zIndex: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              right: "25%",
              width: "60px",
              height: "60px",
              border: "2px solid rgba(236, 72, 153, 0.3)",
              borderRadius: "50%",
              opacity: screen2Progress > 0.4 ? 0.6 : 0,
              transform: `scale(${screen2Progress > 0.4 ? 1 : 0.5})`,
              transition: "all 1.5s ease 0.4s",
              zIndex: 3,
            }}
          />

          {/* Top gradient line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: screen2Progress > 0.1 ? "90%" : "0%",
              height: "3px",
              background:
                "linear-gradient(90deg, rgba(137, 207, 240, 0.8), rgba(139, 92, 246, 0.8))",
              transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow:
                screen2Progress > 0.1
                  ? "0 0 30px rgba(137, 207, 240, 0.8)"
                  : "none",
              zIndex: 11,
            }}
          />

          {/* Main heading */}
          <div
            id="offerings"
            style={{

              width: "100%",
              marginBottom: "8rem",
              paddingLeft: 0,
              position: "relative",
              zIndex: 5,
            }}
          >
            <h2
              style={{
                fontSize: "35px",
                fontWeight: 300,
                lineHeight: "1.4",
                color: "#ffffff",
                margin: 0,
                position: "relative",
                textAlign: "left",
                maxWidth: "1100px",
                width: "100%",
              }}
            >
              {(() => {
                const fullText =
                  "Our goal is to build breakthrough products, communicate complex information and drive changes through design";
                const words = fullText.split(" ");
                const totalWords = words.length;
                const wordsToShow = Math.floor(screen2Progress * totalWords);

                return words.map((word, index) => {
                  if (index < wordsToShow) {
                    const isBold =
                      word === "Our" || word === "goal" || word === "design";
                    return (
                      <span
                        key={index}
                        style={{ fontWeight: isBold ? 700 : 300 }}
                      >
                        {word}{" "}
                      </span>
                    );
                  } else if (index === wordsToShow) {
                    const progress = screen2Progress * totalWords - wordsToShow;
                    const charsToShow = Math.floor(word.length * progress);
                    const isBold =
                      word === "Our" || word === "goal" || word === "design";
                    return (
                      <span
                        key={index}
                        style={{ fontWeight: isBold ? 700 : 300 }}
                      >
                        {word.substring(0, charsToShow)}
                        <span style={{ opacity: 0.2 }}>
                          {word.substring(charsToShow)}
                        </span>{" "}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={index}
                        style={{ opacity: 0.2, fontWeight: 300 }}
                      >
                        {word}{" "}
                      </span>
                    );
                  }
                });
              })()}
            </h2>
          </div>

          {/* Grid with cards */}
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem 6rem",
              position: "relative",
              zIndex: 5,
            }}
          >
            {[
              {
                title: "Accelerated Innovation &",
                subtitle: "Prototyping",
                description: "Using AI-driven workflows to move from concept to high-fidelity prototypes in days.\n\nOutcomes\n• Interactive prototypes • simulations • technical roadmaps",
                icon: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle
                      cx="24"
                      cy="24"
                      r="18"
                      stroke="#89cff0"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M24 14 L24 34 M14 24 L34 24"
                      stroke="#89cff0"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="24"
                      cy="14"
                      r="2"
                      stroke="#89cff0"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="24"
                      cy="34"
                      r="2"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="14"
                      cy="24"
                      r="2"
                      stroke="#89cff0"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="34"
                      cy="24"
                      r="2"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                ),
              },
              {
                title: "Digital Product &",
                subtitle: "System Design",
                description: "End-to-end service including user research, experience and interface design and thorough development handoff and support to bring prototypes to reality.\n\nOutcomes\n• User flow maps • Interactive prototypes • Scalable design systems • UI kits",
                icon: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M12 24 L24 12 L36 24 L24 36 Z"
                      stroke="#89cff0"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="6"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M24 18 L24 30 M18 24 L30 24"
                      stroke="#89cff0"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
              },
              {
                title: "Immersive Narratives &",
                subtitle: "Experiences",
                description: "We design spatial and interactive experiences with clear intent — using storytelling, motion, and environment design to guide users and support product understanding.\n\nOutcomes\n• 3D environments • immersive products • spatial visual assets",
                icon: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    {/* Axis lines */}
                    <line
                      x1="10"
                      y1="10"
                      x2="10"
                      y2="38"
                      stroke="#89cff0"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="10"
                      y1="38"
                      x2="40"
                      y2="38"
                      stroke="#89cff0"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* Three vertical lines (bars) */}
                    <line
                      x1="18"
                      y1="28"
                      x2="18"
                      y2="38"
                      stroke="#8b5cf6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="26"
                      y1="24"
                      x2="26"
                      y2="38"
                      stroke="#89cff0"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="34"
                      y1="18"
                      x2="34"
                      y2="38"
                      stroke="#8b5cf6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Curved arrow showing growth - positioned well above the lines */}
                    <path
                      d="M 12 28 L 18 20 L 26 14 L 36 8"
                      stroke="#89cff0"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Larger, clearer arrow head */}
                    <path
                      d="M36 8 L30 10 L33 15 Z"
                      fill="#89cff0"
                      stroke="#89cff0"
                      strokeWidth="1"
                    />
                  </svg>
                ),
              },
              {
                title: "Ecosystem Visualization &",
                subtitle: "Digital Systems",
                description: "We map data, workflows, and system relationships into clear visual structures, making dependencies, gaps, and opportunities easier to identify.\n\nOutcomes\n• Interactive infographics • visual dashboards",
                icon: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle
                      cx="24"
                      cy="18"
                      r="6"
                      stroke="#89cff0"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M14 32 C14 28 18 26 24 26 C30 26 34 28 34 32 L34 36 L14 36 Z"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="18"
                      cy="24"
                      r="3"
                      stroke="#89cff0"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="30"
                      cy="24"
                      r="3"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                ),
              },
            ].map((item, idx) => {
              let threshold;
              if (idx === 0) {
                threshold = 0.2;
              } else if (idx === 1) {
                threshold = 0.45;
              } else {
                threshold = 0.7;
              }

              const shouldAnimate = screen2Progress > threshold;
              const isLeftColumn = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                    opacity: shouldAnimate ? 1 : 0,
                    transform: shouldAnimate
                      ? "translateX(0)"
                      : isLeftColumn
                        ? "translateX(-100px)"
                        : "translateX(100px)",
                    filter: `blur(${shouldAnimate ? 0 : 12}px)`,
                    transition: `all 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1
                      }s, background-color 0.3s ease, padding 0.3s ease, border-radius 0.3s ease`,
                    backgroundColor: "transparent",
                    padding: "0",
                    borderRadius: "16px",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      marginTop: "0.5rem",
                      filter: "drop-shadow(0 0 10px rgba(137, 207, 240, 0.4))",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div
                    style={{
                      borderLeft: "2px solid rgba(137, 207, 240, 0.5)",
                      paddingLeft: "2rem",
                      width: "100%",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "28px",
                        fontWeight: 600,
                        color: "#ffffff",
                        marginBottom: item.subtitle ? "0.25rem" : "0.5rem",
                        lineHeight: "1.2",
                      }}
                    >
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <h3
                        style={{
                          fontSize: "28px",
                          fontWeight: 600,
                          color: "#ffffff",
                          marginBottom: "0.5rem",
                          lineHeight: "1.2",
                        }}
                      >
                        {item.subtitle}
                      </h3>
                    )}
                    {(() => {
                      const descParts = item.description.split("\n\nOutcomes\n");
                      const mainDesc = descParts[0];
                      const outcomesString = descParts[1];
                      let outcomesList = [];
                      if (outcomesString) {
                         outcomesList = outcomesString.split("•").map(s => s.trim()).filter(Boolean);
                      }
                      
                      return (
                        <>
                          <p
                            style={{
                              fontSize: "16px",
                              fontWeight: 300,
                              color: "rgba(255, 255, 255, 0.7)",
                              margin: 0,
                              whiteSpace: "pre-line",
                              marginBottom: outcomesList.length > 0 ? "1.5rem" : 0,
                            }}
                          >
                            {mainDesc}
                          </p>
                          {outcomesList.length > 0 && (
                            <div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {outcomesList.map((outcome, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      backgroundColor: "rgba(137, 207, 240, 0.15)",
                                      border: "1px solid rgba(137, 207, 240, 0.3)",
                                      color: "#89cff0",
                                      padding: "0.35rem 0.85rem",
                                      borderRadius: "9999px",
                                      fontSize: "13px",
                                      fontWeight: 400,
                                    }}
                                  >
                                    {outcome.replace(/,$/, '')}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      <div
        ref={screen3Ref}
        id="projects"
        style={{
          position: "relative",
          zIndex: 300,
          height: "150vh", // Fixed height instead of calculated
          background: "rgba(8, 4, 18, 1)", // Keep the background color
        }}
      >
        <canvas
          ref={waveCanvas2Ref}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            opacity: screen3Progress > 0.2 ? 0.4 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
        {/* Sticky container */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "visible", // Change from "hidden" to "visible"
            background: "transparent", // Make this transparent
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "4rem 6rem 1rem",
              opacity: screen3Progress > 0.2 ? 1 : 0,
              transform: `translateY(${screen3Progress > 0.2 ? 0 : 50}px)`,
              transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              pointerEvents: "none",
              background: "transparent",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                marginBottom: "1rem",
                maxWidth: "1400px",
                margin: "0 auto",
                pointerEvents: "auto",
              }}
            >
              <h2
                style={{
                  fontSize: "48px",
                  fontWeight: 300,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Featured Projects
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
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.6)",
                margin: "1rem auto 0",
                maxWidth: "1400px",
                pointerEvents: "auto",
              }}
            >
              Explore our latest work across digital experiences and visual
              communication
            </p>
          </div>

          {/* Projects Carousel */}
          <div
            ref={projectCarouselRef}
            onWheel={handleProjectWheel}
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              opacity: screen3Progress > 0.3 ? 1 : 0,
              transition: "opacity 0.6s ease",
              overflow: "visible",
              paddingTop: "30rem",
            }}
          >
            {/* Side Slider */}
            <div
              style={{
                position: "fixed",
                right: "4rem",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                zIndex: 1000,
                opacity: screen3Progress > 0.3 ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            >
              {/* Slider Track - Now Clickable */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickY = e.clientY - rect.top;
                  const percentage = (clickY / rect.height) * 100;
                  const newIndex = Math.round(
                    (percentage / 100) * (projects.length - 1)
                  );
                  setActiveProjectIndex(
                    Math.max(0, Math.min(newIndex, projects.length - 1))
                  );
                }}
                onMouseEnter={() => setIsHoveringNav(true)}
                onMouseLeave={() => setIsHoveringNav(false)}
                style={{
                  position: "relative",
                  width: "3px",
                  height: "200px",
                  background: "rgba(137, 207, 240, 0.2)",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                {/* Active Progress */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${sliderPosition}%`,
                    background: "linear-gradient(180deg, #89cff0, #8b5cf6)",
                    borderRadius: "10px",
                    transition:
                      "height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    boxShadow: "0 0 15px rgba(137, 207, 240, 0.6)",
                    pointerEvents: "none",
                  }}
                />

                {/* Slider Thumb - Now Draggable */}
                <div
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const startY = e.clientY;
                    const trackRect =
                      e.currentTarget.parentElement.getBoundingClientRect();

                    const handleMouseMove = (moveEvent) => {
                      const deltaY = moveEvent.clientY - startY;
                      const currentTop =
                        (sliderPosition / 100) * trackRect.height;
                      const newTop = Math.max(
                        0,
                        Math.min(trackRect.height, currentTop + deltaY)
                      );
                      const newPercentage = (newTop / trackRect.height) * 100;
                      const newIndex = Math.round(
                        (newPercentage / 100) * (projects.length - 1)
                      );
                      setActiveProjectIndex(
                        Math.max(0, Math.min(newIndex, projects.length - 1))
                      );
                    };

                    const handleMouseUp = () => {
                      document.removeEventListener(
                        "mousemove",
                        handleMouseMove
                      );
                      document.removeEventListener("mouseup", handleMouseUp);
                      setIsHoveringNav(false);
                    };

                    document.addEventListener("mousemove", handleMouseMove);
                    document.addEventListener("mouseup", handleMouseUp);
                    setIsHoveringNav(true);
                  }}
                  style={{
                    position: "absolute",
                    top: `${sliderPosition}%`,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "12px",
                    height: "12px",
                    background: "#89cff0",
                    borderRadius: "50%",
                    border: "2px solid rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 0 20px rgba(137, 207, 240, 0.8)",
                    transition: "top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    cursor: "grab",
                  }}
                />
              </div>

              {/* Project Indicators */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveProjectIndex(idx)}
                    onMouseEnter={() => setIsHoveringNav(true)}
                    onMouseLeave={() => setIsHoveringNav(false)}
                    style={{
                      width: idx === activeProjectIndex ? "10px" : "6px",
                      height: idx === activeProjectIndex ? "10px" : "6px",
                      borderRadius: "50%",
                      background:
                        idx === activeProjectIndex
                          ? "#89cff0"
                          : "rgba(137, 207, 240, 0.3)",
                      border:
                        idx === activeProjectIndex
                          ? "2px solid #ffffff"
                          : "none",
                      transition: "all 0.3s ease",
                      boxShadow:
                        idx === activeProjectIndex
                          ? "0 0 15px rgba(137, 207, 240, 0.8)"
                          : "none",
                    }}
                  />
                ))}
              </div>

              {/* Project Counter */}
              <div
                style={{
                  fontSize: "12px",
                  color: "#89cff0",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  marginTop: "0.5rem",
                }}
              >
                {String(activeProjectIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </div>
            </div>

            <div
              style={{
                perspective: "1200px",
                perspectiveOrigin: "50% 50%",
                width: "100%",
                height: "70%",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  transformStyle: "preserve-3d",
                }}
              >
                {projects.map((project, idx) => {
                  const offset = idx - activeProjectIndex;

                  if (Math.abs(offset) > 3) return null;

                  const angle = offset * (Math.PI / 2.5);

                  const x = Math.sin(angle) * 350;
                  const y = offset * 220 + 50;
                  const z = Math.cos(angle) * 400;

                  const normalizedZ = (z + 350) / 700;
                  const scale = 0.65 + normalizedZ * 0.45;

                  const opacity = Math.max(0, 1 - Math.abs(offset) * 0.3);
                  const zIndex = Math.round(100 + z);

                  return (
                    <div
                      key={idx}
                      style={{
                        position: "absolute",
                        width: "380px",
                        height: "260px",
                        left: "50%",
                        top: "50%",
                        transform: `
                  translate3d(${x}px, ${y}px, ${z}px)
                  translate(-50%, -50%)
                  scale(${scale})
                `,
                        transformStyle: "preserve-3d",
                        transition:
                          "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        opacity,
                        zIndex,
                        pointerEvents: offset === 0 ? "auto" : "none",
                      }}
                    >
                      <div
                        className="project-card"
                        onMouseEnter={() => setHoveredProject(idx)}
                        onMouseLeave={() => setHoveredProject(null)}
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          borderRadius: "16px",
                          overflow: "hidden",
                          border: `2px solid ${hoveredProject === idx
                            ? "rgba(137, 207, 240, 0.8)"
                            : "rgba(137, 207, 240, 0.5)"
                            }`,
                          background: "rgba(15, 5, 30, 0.8)",
                          backdropFilter: "blur(15px)",
                          boxShadow:
                            hoveredProject === idx
                              ? "0 30px 80px rgba(137, 207, 240, 0.6), 0 0 100px rgba(139, 92, 246, 0.5)"
                              : "0 20px 60px rgba(137, 207, 240, 0.4), 0 0 80px rgba(139, 92, 246, 0.3)",
                        }}
                      >
                        <ProjectVideo src={project.video} isActive={offset === 0} />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              hoveredProject === idx
                                ? "linear-gradient(135deg, rgba(15, 5, 30, 0.5), rgba(25, 10, 50, 0.6))"
                                : "linear-gradient(135deg, rgba(15, 5, 30, 0.6), rgba(25, 10, 50, 0.7))",
                            transition: "background 0.6s ease",
                          }}
                        />

                        <div
                          style={{
                            position: "relative",
                            zIndex: 10,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "2rem",
                            transform:
                              hoveredProject === idx
                                ? "translateY(-5px)"
                                : "translateY(0)",
                            transition: "transform 0.6s ease",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: "10px",
                                fontWeight: 500,
                                color: "#89cff0",
                                letterSpacing: "0.2em",
                                marginBottom: "1rem",
                                textTransform: "uppercase",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "1px",
                                  background: "#89cff0",
                                }}
                              />
                              Project {String(idx + 1).padStart(2, "0")}
                            </div>
                            <h3
                              style={{
                                fontSize: "28px",
                                fontWeight: 600,
                                color: "#ffffff",
                                marginBottom: project.subtitle
                                  ? "0.5rem"
                                  : "1rem",
                                lineHeight: "1.2",
                              }}
                            >
                              {project.name}
                            </h3>
                            {project.subtitle && (
                              <h4
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#ffffff",
                                  marginBottom: "0.75rem",
                                  lineHeight: "1.3",
                                }}
                              >
                                {project.subtitle}
                              </h4>
                            )}
                            <p
                              style={{
                                fontSize: "13px",
                                fontWeight: 300,
                                color: "rgba(255, 255, 255, 0.85)",
                                lineHeight: "1.5",
                                marginBottom: "1rem",
                              }}
                            >
                              {project.description}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                            }}
                          >
                            <button
                              onClick={() => {
                                if (idx === 0) {
                                  navigate("/ad-cognitive");
                                }
                              }}
                              onMouseEnter={(e) => {
                                setIsHoveringNav(true);
                                e.currentTarget.style.background =
                                  "transparent";
                                e.currentTarget.style.color = "#89cff0";
                                e.currentTarget.style.transform = "scale(1.05)";
                              }}
                              onMouseLeave={(e) => {
                                setIsHoveringNav(false);
                                e.currentTarget.style.background = "#89cff0";
                                e.currentTarget.style.color = "#000000";
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                              style={{
                                padding: "0.4rem 0.8rem",
                                background: "#89cff0",
                                border: "2px solid #89cff0",
                                color: "#000000",
                                fontSize: "9px",
                                fontWeight: 600,
                                letterSpacing: "0.05em",
                                transition:
                                  "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                                borderRadius: "5px",
                                textTransform: "uppercase",
                              }}
                            >
                              View Project
                            </button>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: "#89cff0",
                                fontSize: "13px",
                                fontWeight: 500,
                              }}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 20 20"
                                fill="none"
                                style={{ marginLeft: "0.5rem" }}
                              >
                                <path
                                  d="M7 3L14 10L7 17"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
                      rows="5"
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
    </div >
  );
}
