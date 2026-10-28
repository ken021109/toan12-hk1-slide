import {
  Create,
  Dot,
  FadeIn,
  Line,
  ParametricFunction,
} from "manim-web";
import { C, FONT, FRAME } from "../theme.js";
import { placeLeft, tex, text } from "../components/ui.js";

export default {
  id: "title",
  title: "Tối ưu hóa bằng đạo hàm",
  accent: C.teal,
  async build(scene) {
    const curveFn = (t) => {
      const x = 1.05 + 4.95 * t;
      return [x, -2.42 + 0.3 * (x - 3.45) ** 2];
    };

    const glow = new ParametricFunction({
      func: curveFn,
      tRange: [0, 1],
      numSamples: 180,
      color: C.teal,
      strokeWidth: 12,
    });
    glow.setStrokeOpacity(0.08);

    const curve = new ParametricFunction({
      func: curveFn,
      tRange: [0, 1],
      numSamples: 180,
      color: C.teal,
      strokeWidth: 4,
    });

    const axisX = new Line({
      start: [0.82, -2.62, 0],
      end: [6.2, -2.62, 0],
      color: C.dim,
      strokeWidth: 1,
    });
    axisX.setStrokeOpacity(0.35);
    const axisY = new Line({
      start: [0.82, -2.62, 0],
      end: [0.82, 1.55, 0],
      color: C.dim,
      strokeWidth: 1,
    });
    axisY.setStrokeOpacity(0.35);

    const minPoint = [3.45, -2.42, 0];
    const dot = new Dot({ point: minPoint, radius: 0.13, color: C.amber });
    const minLabel = await tex("T_{\\min}", { size: 24, color: C.amber });
    minLabel.moveTo([3.9, -2.02, 0]);

    const curveLabel = await tex("T(x)", { size: 26, color: C.teal });
    curveLabel.moveTo([5.55, 1.02, 0]);

    const kicker = text("TOÁN 12 · ỨNG DỤNG ĐẠO HÀM", {
      size: 13,
      color: C.teal,
      weight: 600,
      letterSpacing: 2.6,
    });
    placeLeft(kicker, FRAME.left, 3.18);

    const title = text("Tối ưu hóa", {
      size: 72,
      color: C.ink,
      font: FONT.serif,
      weight: 600,
    });
    title.scaleToFitWidth(5.65);
    placeLeft(title, FRAME.left, 1.78);

    const subtitle = text("bằng đạo hàm", {
      size: 38,
      color: C.teal,
      font: FONT.serif,
      italic: true,
    });
    placeLeft(subtitle, FRAME.left + 0.03, 0.82);

    const description = text("Hai bài toán thực tế · một công cụ duy nhất", {
      size: 18,
      color: C.muted,
    });
    placeLeft(description, FRAME.left, 0.12);

    const chip1 = text("Bài 1  ·  Chọn điểm hạ bờ", {
      size: 16,
      color: C.teal,
      weight: 600,
    });
    placeLeft(chip1, FRAME.left, -0.92);
    const chip2 = text("Bài 2  ·  Chia sợi dây", {
      size: 16,
      color: C.violet,
      weight: 600,
    });
    placeLeft(chip2, FRAME.left, -1.46);

    const dot1 = new Dot({ point: [FRAME.left - 0.18, -0.92, 0], radius: 0.045, color: C.teal });
    const dot2 = new Dot({ point: [FRAME.left - 0.18, -1.46, 0], radius: 0.045, color: C.violet });

    const footer = text("MÔ HÌNH HÓA   →   ĐẠO HÀM   →   BẢNG BIẾN THIÊN", {
      size: 11,
      color: C.faint,
      weight: 600,
      letterSpacing: 1.6,
    });
    placeLeft(footer, FRAME.left, -2.62);

    await scene.play(
      new FadeIn(kicker, { duration: 0.35, shift: [0, -0.08, 0] }),
      new Create(axisX, { duration: 0.5 }),
      new Create(axisY, { duration: 0.5 }),
    );
    await scene.play(
      new Create(glow, { duration: 0.9 }),
      new Create(curve, { duration: 0.9 }),
      new FadeIn(title, { duration: 0.6, shift: [0, -0.18, 0] }),
    );
    await scene.play(
      new FadeIn(subtitle, { duration: 0.45, shift: [0, -0.12, 0] }),
      new FadeIn(description, { duration: 0.4 }),
    );
    await scene.play(
      new FadeIn(dot, { duration: 0.25 }),
      new FadeIn(minLabel, { duration: 0.3 }),
      new FadeIn(curveLabel, { duration: 0.3 }),
    );
    await scene.play(
      new FadeIn(dot1, { duration: 0.2 }),
      new FadeIn(dot2, { duration: 0.2 }),
      new FadeIn(chip1, { duration: 0.3, shift: [0, -0.08, 0] }),
      new FadeIn(chip2, { duration: 0.3, shift: [0, -0.08, 0] }),
      new FadeIn(footer, { duration: 0.35 }),
    );
  },
};
