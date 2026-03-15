import { useEffect, useRef } from "react";

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; r: number; dx: number; dy: number; opacity: number; color: string }[] = [];
    const colors = ["#3b82f6", "#818cf8", "#a855f7", "#06b6d4", "#6366f1"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className="banner-root"
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #020617 0%, #0d1b4b 25%, #1e1b5e 50%, #3b1a6e 75%, #0a0f2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Gradient blobs */}
      <div style={{
        position: "absolute", top: "-20%", left: "-10%",
        width: "55%", height: "70%",
        background: "radial-gradient(ellipse at center, rgba(99,102,241,0.35) 0%, transparent 70%)",
        filter: "blur(40px)", animation: "blobMove1 8s ease-in-out infinite alternate",
      }} />
      <div style={{
        position: "absolute", bottom: "-15%", right: "-5%",
        width: "50%", height: "65%",
        background: "radial-gradient(ellipse at center, rgba(168,85,247,0.3) 0%, transparent 70%)",
        filter: "blur(40px)", animation: "blobMove2 10s ease-in-out infinite alternate",
      }} />
      <div style={{
        position: "absolute", top: "30%", left: "40%",
        width: "40%", height: "50%",
        background: "radial-gradient(ellipse at center, rgba(6,182,212,0.2) 0%, transparent 70%)",
        filter: "blur(50px)", animation: "blobMove3 12s ease-in-out infinite alternate",
      }} />

      {/* Sound waves */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${20 + i * 22}%`,
            height: `${20 + i * 22}%`,
            borderRadius: "50%",
            border: `1px solid rgba(129,140,248,${0.15 - i * 0.025})`,
            animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }} />
        ))}
      </div>

      {/* Diagonal accent lines */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none",
        background: `
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            rgba(99,102,241,0.04) 80px,
            rgba(99,102,241,0.04) 81px
          )
        `,
      }} />

      {/* Main content */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", gap: "0",
        padding: "0 5%",
      }}>

        {/* ВШЛПП badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "2.5vh",
          animation: "fadeSlideDown 1s ease-out both",
        }}>
          <div style={{
            width: "48px", height: "48px",
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 24px rgba(99,102,241,0.5)",
            fontSize: "20px", fontWeight: 900, color: "#fff",
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.05em",
          }}>
            В
          </div>
          <span style={{
            fontSize: "clamp(12px, 1.5vw, 18px)",
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.4em",
            color: "rgba(199,210,254,0.8)",
            textTransform: "uppercase",
          }}>
            ВШЛПП
          </span>
        </div>

        {/* SOUND CHECK */}
        <div style={{
          position: "relative",
          animation: "fadeScaleIn 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both",
        }}>
          {/* Glow behind title */}
          <div style={{
            position: "absolute", inset: "-20px -40px",
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.3) 0%, transparent 70%)",
            filter: "blur(20px)", zIndex: -1,
          }} />

          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(80px, 16vw, 200px)",
            lineHeight: 0.9,
            letterSpacing: "0.08em",
            margin: 0,
            background: "linear-gradient(180deg, #ffffff 0%, #c7d2fe 40%, #818cf8 70%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 40px rgba(129,140,248,0.4))",
          }}>
            SOUND CHECK
          </h1>
        </div>

        {/* 2.0 version badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: "16px",
          margin: "1.5vh 0 3vh",
          animation: "fadeSlideUp 1s ease-out 0.5s both",
        }}>
          <div style={{ height: "1px", width: "80px", background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.6))" }} />
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            letterSpacing: "0.25em",
            background: "linear-gradient(135deg, #06b6d4, #818cf8, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 16px rgba(6,182,212,0.5))",
          }}>
            2.0
          </span>
          <div style={{ height: "1px", width: "80px", background: "linear-gradient(90deg, rgba(129,140,248,0.6), transparent)" }} />
        </div>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(11px, 1.4vw, 18px)",
          fontWeight: 300,
          letterSpacing: "0.5em",
          color: "rgba(199,210,254,0.6)",
          textTransform: "uppercase",
          margin: "0 0 4vh",
          animation: "fadeSlideUp 1s ease-out 0.7s both",
        }}>
          Конкурс музыкальных коллективов
        </p>

        {/* Year pill */}
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))",
          border: "1px solid rgba(129,140,248,0.4)",
          borderRadius: "100px",
          padding: "8px 32px",
          backdropFilter: "blur(10px)",
          animation: "fadeSlideUp 1s ease-out 0.9s both",
          boxShadow: "0 0 30px rgba(99,102,241,0.2), inset 0 0 20px rgba(168,85,247,0.1)",
        }}>
          <span style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(16px, 2.5vw, 32px)",
            fontWeight: 600,
            letterSpacing: "0.3em",
            color: "#c7d2fe",
          }}>
            2026
          </span>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #3b82f6, #6366f1, #a855f7, #06b6d4, #3b82f6)",
        backgroundSize: "200% 100%",
        animation: "gradientShift 4s linear infinite",
      }} />

      {/* Corner decorations */}
      <div style={{
        position: "absolute", top: "24px", left: "32px",
        width: "60px", height: "60px",
        borderTop: "2px solid rgba(99,102,241,0.5)",
        borderLeft: "2px solid rgba(99,102,241,0.5)",
      }} />
      <div style={{
        position: "absolute", top: "24px", right: "32px",
        width: "60px", height: "60px",
        borderTop: "2px solid rgba(168,85,247,0.5)",
        borderRight: "2px solid rgba(168,85,247,0.5)",
      }} />
      <div style={{
        position: "absolute", bottom: "24px", left: "32px",
        width: "60px", height: "60px",
        borderBottom: "2px solid rgba(6,182,212,0.5)",
        borderLeft: "2px solid rgba(6,182,212,0.5)",
      }} />
      <div style={{
        position: "absolute", bottom: "24px", right: "32px",
        width: "60px", height: "60px",
        borderBottom: "2px solid rgba(129,140,248,0.5)",
        borderRight: "2px solid rgba(129,140,248,0.5)",
      }} />

      <style>{`
        @keyframes blobMove1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(5%, 8%) scale(1.15); }
        }
        @keyframes blobMove2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-6%, -5%) scale(1.1); }
        }
        @keyframes blobMove3 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-4%, 6%) scale(1.2); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Index;
