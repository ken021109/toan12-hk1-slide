import {
  Create,
  Dot,
  FadeIn,
  Group,
  Line,
  MathTex,
  RoundedRectangle,
  Text,
} from "manim-web";
import { C, FONT, FRAME } from "../theme.js";

export function text(value, options = {}) {
  return new Text({
    text: value,
    fontSize: options.size ?? 24,
    color: options.color ?? C.ink,
    fontFamily: options.font ?? FONT.sans,
    fontWeight: options.weight ?? "normal",
    fontStyle: options.italic ? "italic" : "normal",
    lineHeight: options.lineHeight ?? 1.22,
    letterSpacing: options.letterSpacing ?? 0,
    textAlign: options.align ?? "left",
  });
}

export async function tex(latex, options = {}) {
  const mobject = new MathTex({
    latex,
    fontSize: options.size ?? 40,
    color: options.color ?? C.ink,
  });
  await mobject.waitForRender();
  return mobject;
}

export function placeLeft(mobject, x, y) {
  mobject.moveTo([x + mobject.getWidth() / 2, y, 0]);
  return mobject;
}

export function placeRight(mobject, x, y) {
  mobject.moveTo([x - mobject.getWidth() / 2, y, 0]);
  return mobject;
}

export function panel(width, height, options = {}) {
  const color = options.color ?? C.dim;
  const shape = new RoundedRectangle({
    width,
    height,
    cornerRadius: options.radius ?? 0.18,
    color,
    strokeWidth: options.strokeWidth ?? 1.2,
    fillOpacity: 0,
  });
  shape.setFill(options.fillColor ?? color, options.fillOpacity ?? 0.06);
  return shape;
}

export function makeHeader(options) {
  const accent = options.accent ?? C.teal;
  const kicker = text(options.kicker.toUpperCase(), {
    size: 13,
    color: accent,
    weight: 600,
    letterSpacing: 2.4,
  });
  placeLeft(kicker, FRAME.left, 3.42);

  const title = text(options.title, {
    size: options.titleSize ?? 40,
    color: C.ink,
    font: FONT.serif,
    weight: 600,
  });
  placeLeft(title, FRAME.left, 2.82);

  const rule = new Line({
    start: [FRAME.left, 2.34, 0],
    end: [FRAME.left + Math.min(1.3, title.getWidth() * 0.22), 2.34, 0],
    color: accent,
    strokeWidth: 3,
  });

  const index = text(String(options.index + 1).padStart(2, "0"), {
    size: 15,
    color: accent,
    weight: 600,
    letterSpacing: 0.8,
  });
  placeRight(index, FRAME.right - 0.48, 3.42);

  const total = text(`/ ${String(options.total).padStart(2, "0")}`, {
    size: 12,
    color: C.dim,
    letterSpacing: 0.6,
  });
  placeRight(total, FRAME.right, 3.42);

  return { kicker, title, rule, index, total, accent };
}

export async function revealHeader(scene, header) {
  await scene.play(
    new FadeIn(header.kicker, { duration: 0.35, shift: [0, -0.08, 0] }),
    new FadeIn(header.title, { duration: 0.48, shift: [0, -0.14, 0] }),
    new Create(header.rule, { duration: 0.5 }),
    new FadeIn(header.index, { duration: 0.35 }),
    new FadeIn(header.total, { duration: 0.35 }),
  );
}

export function bullet(label, options = {}) {
  const color = options.color ?? C.teal;
  const x = options.x ?? FRAME.left;
  const y = options.y ?? 0;
  const dot = new Dot({
    point: [x + 0.06, y + 0.01, 0],
    radius: options.dotRadius ?? 0.045,
    color,
  });
  const copy = text(label, {
    size: options.size ?? 19,
    color: options.textColor ?? C.ink,
    weight: options.weight ?? "normal",
    lineHeight: 1.35,
  });
  placeLeft(copy, x + 0.24, y);
  return new Group(dot, copy);
}

