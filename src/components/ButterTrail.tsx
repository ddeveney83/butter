import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "./Motion";

type Point = { x: number; y: number; time: number };
type RibbonPoint = Point & { nx: number; ny: number; taper: number };
const lifetime = 2000;
const followTime = 38;

// Quadratic midpoints round the turns without overshooting the pointer's path.
function smooth(points: Point[]): Point[] {
  const samples = [points[0]];
  let start = points[0];
  for (let i = 1; i < points.length; i++) {
    const control = points[i];
    const next = points[i + 1];
    const end = next
      ? {
          x: (control.x + next.x) / 2,
          y: (control.y + next.y) / 2,
          time: (control.time + next.time) / 2,
        }
      : control;
    const length =
      Math.hypot(control.x - start.x, control.y - start.y) +
      Math.hypot(end.x - control.x, end.y - control.y);
    const steps = Math.max(1, Math.ceil(length / 5));
    for (let step = 1; step <= steps; step++) {
      const t = step / steps;
      const a = (1 - t) ** 2;
      const b = 2 * (1 - t) * t;
      const c = t * t;
      samples.push({
        x: a * start.x + b * control.x + c * end.x,
        y: a * start.y + b * control.y + c * end.y,
        time: a * start.time + b * control.time + c * end.time,
      });
    }
    start = end;
  }
  return samples;
}

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
    let target: Point | null = null;
    let follower: Point | null = null;
    let lastFrame = 0;
    let frame = 0;

    function clear() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
      strokes = [];
      current = null;
      target = null;
      follower = null;
      context!.clearRect(0, 0, innerWidth, innerHeight);
    }

    function resize() {
      clear();
      const scale = Math.min(devicePixelRatio || 1, 2);
      node!.width = Math.round(node!.clientWidth * scale);
      node!.height = Math.round(node!.clientHeight * scale);
      context!.setTransform(scale, 0, 0, scale, 0, 0);
    }

    function ribbon(points: RibbonPoint[], width: number, highlight = false) {
      const ctx = context!;
      const edge = (point: RibbonPoint, side: number) => ({
        x:
          point.x +
          point.nx * width * point.taper * side -
          (highlight ? point.taper : 0),
        y:
          point.y +
          point.ny * width * point.taper * side -
          (highlight ? 2 * point.taper : 0),
      });
      const first = edge(points[0], 1);
      ctx.beginPath();
      ctx.moveTo(first.x, first.y);
      for (const point of points.slice(1)) {
        const left = edge(point, 1);
        ctx.lineTo(left.x, left.y);
      }
      const head = points[points.length - 1];
      const angle = Math.atan2(head.ny, head.nx);
      ctx.arc(
        head.x - (highlight ? head.taper : 0),
        head.y - (highlight ? 2 * head.taper : 0),
        width * head.taper,
        angle,
        angle - Math.PI,
        true,
      );
      for (let i = points.length - 2; i >= 0; i--) {
        const right = edge(points[i], -1);
        ctx.lineTo(right.x, right.y);
      }
      ctx.closePath();
      ctx.fill();
    }

    function paint(now: number) {
      frame = 0;
      const ctx = context!;
      // Frame-rate-independent easing keeps the native cursor responsive while
      // the smear gently catches up, including after a fast pointer movement.
      if (current && target && follower) {
        const dt = lastFrame ? Math.min(now - lastFrame, 64) : 1000 / 60;
        const amount = 1 - Math.exp(-dt / followTime);
        const distance = Math.hypot(
          target.x - follower.x,
          target.y - follower.y,
        );
        if (distance > 0) {
          follower = {
            x:
              distance < 0.5
                ? target.x
                : follower.x + (target.x - follower.x) * amount,
            y:
              distance < 0.5
                ? target.y
                : follower.y + (target.y - follower.y) * amount,
            time: now,
          };
          const previous = current[current.length - 1];
          if (
            Math.hypot(follower.x - previous.x, follower.y - previous.y) >=
              1.5 ||
            (follower.x === target.x && follower.y === target.y)
          ) {
            current.push(follower);
            if (current.length > 240) current.shift();
          }
        }
      }
      lastFrame = now;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const stroke of strokes) {
        while (stroke.length && now - stroke[0].time >= lifetime)
          stroke.shift();
      }
      strokes = strokes.filter((stroke) => stroke.length);
      if (current && !strokes.includes(current)) {
        current = null;
        target = null;
        follower = null;
      }
      for (const stroke of strokes) {
        if (stroke.length < 2) continue;
        const points = smooth(stroke);
        const distances = [0];
        for (let i = 1; i < points.length; i++) {
          distances.push(
            distances[i - 1] +
              Math.hypot(
                points[i].x - points[i - 1].x,
                points[i].y - points[i - 1].y,
              ),
          );
        }
        const length = distances[distances.length - 1];
        if (length < 1) continue;
        const shape = points.map((point, i): RibbonPoint => {
          const before = points[Math.max(0, i - 1)];
          const after = points[Math.min(points.length - 1, i + 1)];
          const dx = after.x - before.x;
          const dy = after.y - before.y;
          const size = Math.hypot(dx, dy) || 1;
          const age = Math.max(0, 1 - (now - point.time) / lifetime);
          return {
            ...point,
            nx: -dy / size,
            ny: dx / size,
            // Taper follows distance around bends, rather than a straight
            // gradient between the ends. Old butter also gently thins away.
            taper: Math.pow(distances[i] / length, 0.75) * Math.pow(age, 0.6),
          };
        });
        const head = points[points.length - 1];
        const fade = Math.pow(
          Math.max(0, 1 - (now - head.time) / lifetime),
          1.4,
        );
        ctx.fillStyle = `rgba(248, 228, 119, ${0.045 * fade})`;
        ribbon(shape, 11);
        ctx.fillStyle = `rgba(248, 228, 119, ${0.075 * fade})`;
        ribbon(shape, 8);
        ctx.fillStyle = `rgba(248, 228, 119, ${0.3 * fade})`;
        ribbon(shape, 5.5);
        ctx.fillStyle = `rgba(255, 247, 202, ${0.16 * fade})`;
        ribbon(shape, 0.8, true);
      }
      if (strokes.length) frame = requestAnimationFrame(paint);
      else lastFrame = 0;
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.buttons) {
        current = null;
        target = null;
        follower = null;
        return;
      }
      const point = {
        x: event.clientX + 8,
        y: event.clientY + 10,
        time: performance.now(),
      };
      const distance = target
        ? Math.hypot(point.x - target.x, point.y - target.y)
        : 0;
      if (target && distance < 2) return;
      // Only an idle pause starts a new stroke: a large pointer jump still
      // leaves a continuous, tapered trail instead of dropping the smear.
      if (!current || !target || point.time - target.time > 250) {
        current = [point];
        follower = point;
        strokes.push(current);
        strokes = strokes.slice(-8);
      }
      target = point;
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
