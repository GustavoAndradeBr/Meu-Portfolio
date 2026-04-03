import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";

function runGlitch(canvas, toDark, onMidpoint, onDone) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const W = canvas.width;
  const H = canvas.height;

  const green = "#00ff41";
  const cyan = "#50e5ff";
  const red = "#e30e52";
  const white = "#ffffff";

  /* ── matriz de chars "hacker" ── */
  const CHARS = "01アイウエオカキクケコサシスセソABCDEF#@!%&<>/\\|{}[]";
  const colW = 14;
  const cols = Math.ceil(W / colW);
  const rowH = 16;
  const rows = Math.ceil(H / rowH);

  let frame = 0;
  let raf;
  const TOTAL = 55; // frames (~900ms a 60fps)
  const MID = 28;
  let midFired = false;

  /* estado das colunas da matrix */
  const matrixCols = Array.from({ length: cols }, () => ({
    y: Math.random() * rows,
    speed: 0.3 + Math.random() * 0.7,
    active: Math.random() < 0.6,
  }));

  /* slices de glitch */
  const makeSlices = () =>
    Array.from({ length: 18 }, () => ({
      y: Math.random() * H,
      h: 2 + Math.random() * 28,
      offX: (Math.random() - 0.5) * 180,
      alpha: 0.4 + Math.random() * 0.6,
      color: [green, cyan, red, white][Math.floor(Math.random() * 4)],
      life: 2 + Math.floor(Math.random() * 4),
      age: 0,
    }));

  let slices = makeSlices();

  const tick = () => {
    frame++;
    ctx.clearRect(0, 0, W, H);

    const p = frame / TOTAL; // 0→1

    /* ── fase 1: glitch cresce (0→MID) ── */
    /* ── fase 2: glitch some + tema aplica (MID→TOTAL) ── */
    const intensity =
      p < 0.5
        ? p / 0.5 // sobe 0→1
        : 1 - (p - 0.5) / 0.5; // desce 1→0

    /* fundo semi-transparente escuro para legibilidade */
    ctx.fillStyle = `rgba(0,0,0,${intensity * 0.82})`;
    ctx.fillRect(0, 0, W, H);

    /* ── matrix rain ── */
    ctx.font = `bold ${rowH - 2}px "Fira Code", monospace`;
    matrixCols.forEach((col, ci) => {
      if (!col.active) return;
      const x = ci * colW;

      for (let ri = 0; ri < rows; ri++) {
        const distFromHead = col.y - ri;
        if (distFromHead < 0 || distFromHead > 20) continue;

        const fadeAlpha = (1 - distFromHead / 20) * intensity;
        const isHead = distFromHead < 1;

        ctx.globalAlpha = isHead ? intensity : fadeAlpha * 0.7;
        ctx.fillStyle = isHead ? white : green;
        ctx.shadowColor = green;
        ctx.shadowBlur = isHead ? 12 : 4;

        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(ch, x, ri * rowH);
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      col.y += col.speed;
      if (col.y > rows + 5) col.y = -5;
    });

    /* ── glitch slices ── */
    slices = slices.map((s) => {
      s.age++;
      if (s.age >= s.life) {
        return {
          y: Math.random() * H,
          h: 2 + Math.random() * 32,
          offX: (Math.random() - 0.5) * 200 * intensity,
          alpha: (0.3 + Math.random() * 0.7) * intensity,
          color: [green, cyan, red, white][Math.floor(Math.random() * 4)],
          life: 2 + Math.floor(Math.random() * 5),
          age: 0,
        };
      }
      return s;
    });

    slices.forEach((s) => {
      if (intensity < 0.05) return;
      ctx.save();
      ctx.globalAlpha = s.alpha * intensity;
      /* recorta a fatia e desloca */
      ctx.drawImage(canvas, 0, s.y, W, s.h, s.offX, s.y, W, s.h);
      /* tinge a fatia com a cor */
      ctx.fillStyle = s.color;
      ctx.globalAlpha = 0.15 * intensity;
      ctx.fillRect(s.offX, s.y, W, s.h);
      ctx.restore();
    });

    /* ── scan lines horizontais ── */
    for (let y = 0; y < H; y += 3) {
      if (Math.random() < 0.08 * intensity) {
        ctx.save();
        ctx.globalAlpha = 0.07 * intensity;
        ctx.fillStyle = green;
        ctx.fillRect(0, y, W, 1);
        ctx.restore();
      }
    }

    /* ── ruído RGB nos cantos ── */
    if (intensity > 0.4 && Math.random() < 0.5) {
      [
        [red, 0],
        [cyan, 3],
        [green, -3],
      ].forEach(([color, offX]) => {
        const x = Math.random() * W * 0.3;
        const y = Math.random() * H;
        const w = 40 + Math.random() * 120;
        const h = 1 + Math.random() * 3;
        ctx.save();
        ctx.globalAlpha = 0.5 * intensity;
        ctx.fillStyle = color;
        ctx.fillRect(x + offX, y, w, h);
        ctx.restore();
      });
    }

    /* ── texto "HACKING..." no centro ── */
    if (intensity > 0.35) {
      const texts = toDark
        ? ["ENTERING DARK MODE", "SYSTEM OVERRIDE", "ACCESS GRANTED"]
        : ["RESTORING LIGHT MODE", "REBOOTING SYSTEM", "CLEARANCE: ██████"];
      const txt = texts[Math.floor(frame / 8) % texts.length];

      ctx.save();
      ctx.font = `bold 22px "Fira Code", monospace`;
      ctx.textAlign = "center";
      ctx.globalAlpha = intensity * (0.6 + Math.random() * 0.4);
      ctx.fillStyle = green;
      ctx.shadowColor = green;
      ctx.shadowBlur = 20;
      ctx.fillText(txt, W / 2 + (Math.random() - 0.5) * 6 * intensity, H / 2);
      /* sombra RGB shift */
      ctx.globalAlpha = intensity * 0.4;
      ctx.fillStyle = red;
      ctx.fillText(txt, W / 2 + 3, H / 2);
      ctx.fillStyle = cyan;
      ctx.fillText(txt, W / 2 - 3, H / 2);
      ctx.restore();
    }

    /* midpoint: troca o tema real */
    if (frame >= MID && !midFired) {
      midFired = true;
      onMidpoint();
    }

    if (frame < TOTAL) {
      raf = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, W, H);
      onDone();
    }
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [animating, setAnimating] = useState(false);
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);

  const toggleTheme = useCallback(() => {
    if (animating) return;
    setAnimating(true);

    const toDark = !isDark;

    cleanupRef.current = runGlitch(
      canvasRef.current,
      toDark,
      /* onMidpoint */ () => {
        setIsDark(toDark);
        document.body.classList.toggle("dark", toDark);
      },
      /* onDone */ () => setAnimating(false),
    );
  }, [animating, isDark]);

  useEffect(() => () => cleanupRef.current?.(), []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`glitch-canvas ${animating ? "active" : ""}`}
      />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="Menu" aria-label="Navegação principal">
          {["Home", "Sobre Mim", "Conhecimentos", "Projetos", "Contatos"].map(
            (item, i) => {
              const hrefs = [
                "#Home",
                "#About",
                "#Knowledge",
                "#Projects",
                "#Contact",
              ];
              return (
                <motion.a
                  key={item}
                  href={hrefs[i]}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                >
                  {item}
                </motion.a>
              );
            },
          )}
        </nav>

        <motion.button
          onClick={toggleTheme}
          className={`botaotema ${animating ? "animating" : ""}`}
          aria-label="Alternar tema"
          whileTap={{ scale: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isDark ? "sun" : "moon"}
              initial={{ rotate: -120, opacity: 0, scale: 0.3 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 120, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.35, ease: "backOut" }}
              className="icon-wrap"
            >
              {isDark ? "☼" : "☾"}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.header>
    </>
  );
}
