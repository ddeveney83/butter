import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "./Motion";

type Point = { x: number; y: number; time: number };
const lifetime = 2000;

export default function ButterTrail() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    const node = canvas.current;
    if (reduced || !node) return;
    const context = node.getContext("2d");
    if (!context) return;
    let strokes: Point[][] = [];
    let current: Point[] | null = null;
    let frame = 0;

    function clear() {
      cancelAnimationFrame(frame);
      frame = 0;
      strokes = [];
      current = null;
      context!.clearRect(0, 0, innerWidth, innerHeight);
    }

    function resize() {
      clear();
      const scale = Math.min(devicePixelRatio || 1, 2);
      node!.width = Math.round(node!.clientWidth * scale);
      node!.height = Math.round(node!.clientHeight * scale);
      context!.setTransform(scale, 0, 0, scale, 0, 0);
    }

    function path(points: Point[]) {
      const ctx = context!;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const next = points[i + 1];
        ctx.quadraticCurveTo(
          points[i].x,
          points[i].y,
          (points[i].x + next.x) / 2,
          (points[i].y + next.y) / 2,
        );
      }
      const last = points[points.length - 1];
      ctx.lineTo(last.x, last.y);
    }

    function paint(now: number) {
      frame = 0;
      const ctx = context!;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const stroke of strokes) {
        while (stroke.length && now - stroke[0].time >= lifetime)
          stroke.shift();
      }
      strokes = strokes.filter((stroke) => stroke.length);
      if (current && !strokes.includes(current)) current = null;
      for (const points of strokes) {
        if (points.length < 2) continue;
        const first = points[0];
        const last = points[points.length - 1];
        const fade = (point: Point) =>
          Math.pow(Math.max(0, 1 - (now - point.time) / lifetime), 1.4);
        const gradient = (opacity: number, colour: string) => {
          const fill = ctx.createLinearGradient(
            first.x,
            first.y,
            last.x + 0.01,
            last.y + 0.01,
          );
          fill.addColorStop(0, `rgba(${colour}, ${opacity * fade(first)})`);
          fill.addColorStop(1, `rgba(${colour}, ${opacity * fade(last)})`);
          return fill;
        };
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        path(points);
        ctx.lineWidth = 20;
        ctx.strokeStyle = gradient(0.07, "248, 228, 119");
        ctx.stroke();
        ctx.lineWidth = 12;
        ctx.strokeStyle = gradient(0.3, "248, 228, 119");
        ctx.stroke();
        // A fine highlight gives the smear a little spread-butter texture.
        ctx.save();
        ctx.translate(-2, -3);
        path(points);
        ctx.lineWidth = 2;
        ctx.strokeStyle = gradient(0.15, "255, 247, 202");
        ctx.stroke();
        ctx.restore();
      }
      if (strokes.length) frame = requestAnimationFrame(paint);
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.buttons) {
        current = null;
        return;
      }
      const point = {
        x: event.clientX + 8,
        y: event.clientY + 10,
        time: performance.now(),
      };
      const previous = current?.[current.length - 1];
      const distance = previous
        ? Math.hypot(point.x - previous.x, point.y - previous.y)
        : 0;
      if (previous && distance < 2) return;
      if (
        !current ||
        !previous ||
        point.time - previous.time > 120 ||
        distance > 160
      ) {
        current = [];
        strokes.push(current);
        strokes = strokes.slice(-8);
      }
      current.push(point);
      if (current.length > 240) current.shift();
      if (!frame) frame = requestAnimationFrame(paint);
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget) clear();
    }

    function keyboard(event: KeyboardEvent) {
      if (event.key === "Tab" || event.key === "Escape") clear();
    }

    resize();
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("pointercancel", clear, { passive: true });
    document.addEventListener("visibilitychange", clear);
    document.addEventListener("keydown", keyboard);
    window.addEventListener("blur", clear);
    window.addEventListener("scroll", clear, { passive: true, capture: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      clear();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("pointercancel", clear);
      document.removeEventListener("visibilitychange", clear);
      document.removeEventListener("keydown", keyboard);
      window.removeEventListener("blur", clear);
      window.removeEventListener("scroll", clear, true);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, pathname]);

  if (reduced) return null;
  return (
    <canvas ref={canvas} className="butter-cursor-trail" aria-hidden="true" />
  );
}
