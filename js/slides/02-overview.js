import {
  Arrow,
  DrawBorderThenFill,
  FadeIn,
  Group,
} from "manim-web";
import { C, FONT, FRAME } from "../theme.js";
import { makeHeader, panel, placeLeft, revealHeader, tex, text } from "../components/ui.js";

export default {
  id: "overview",
  title: "Hai bài toán, một ý tưởng",
  accent: C.teal,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Lộ trình",
      title: "Hai bài toán, một ý tưởng",
      accent: C.teal,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const card1 = panel(5.65, 3.25, {
      color: C.teal,
      fillOpacity: 0.045,
      radius: 0.22,
    });
    card1.moveTo([-3.12, 0.4, 0]);
    const card2 = panel(5.65, 3.25, {
      color: C.violet,
      fillOpacity: 0.045,
      radius: 0.22,
    });
    card2.moveTo([3.12, 0.4, 0]);

    const cardNumber1 = text("01", {
      size: 62,
      color: "#17314a",
      font: FONT.serif,
      weight: 600,
    });
    cardNumber1.moveTo([-1.05, 1.48, 0]);
    const cardNumber2 = text("02", {
      size: 62,
      color: "#2a2147",
      font: FONT.serif,
      weight: 600,
    });
    cardNumber2.moveTo([5.2, 1.48, 0]);

    const kicker1 = text("BÀI 1", { size: 12, color: C.teal, weight: 600, letterSpacing: 2 });
    placeLeft(kicker1, -5.55, 1.72);
    const heading1 = text("Chọn điểm hạ bờ", { size: 25, color: C.ink, font: FONT.serif, weight: 600 });
    placeLeft(heading1, -5.55, 1.22);
    const sub1 = text("Tối thiểu thời gian di chuyển", { size: 14, color: C.muted });
    placeLeft(sub1, -5.55, 0.82);
    const formula1 = await tex("T(x)=\\frac{\\sqrt{x^2+9}}{6}+\\frac{8-x}{8}", {
      size: 28,
      color: C.tealSoft,
    });
    formula1.moveTo([-3.12, -0.02, 0]);
    const tag1 = text("ĐẠO HÀM  ·  BẢNG BIẾN THIÊN", {
      size: 10,
      color: C.teal,
      weight: 600,
      letterSpacing: 1.2,
    });
    placeLeft(tag1, -5.55, -0.82);

    const kicker2 = text("BÀI 2", { size: 12, color: C.violet, weight: 600, letterSpacing: 2 });
    placeLeft(kicker2, 0.62, 1.72);
    const heading2 = text("Chia sợi dây 60 cm", { size: 25, color: C.ink, font: FONT.serif, weight: 600 });
    placeLeft(heading2, 0.62, 1.22);
    const sub2 = text("Tối thiểu tổng diện tích", { size: 14, color: C.muted });
    placeLeft(sub2, 0.62, 0.82);
    const formula2 = await tex("S(x)=\\frac{x^2}{16}+\\frac{(60-x)^2}{4\\pi}", {
      size: 28,
      color: C.violetSoft,
    });
    formula2.moveTo([3.12, -0.02, 0]);
    const tag2 = text("HÌNH HỌC  ·  TỐI ƯU HÓA", {
      size: 10,
      color: C.violet,
      weight: 600,
      letterSpacing: 1.2,
    });
    placeLeft(tag2, 0.62, -0.82);

    const processY = -2.35;
    const steps = [
      ["01", "Mô hình hóa", -4.45],
      ["02", "Khảo sát hàm", 0],
      ["03", "Kết luận", 4.45],
    ];
    const process = [];
    for (const [number, label, x] of steps) {
      const n = text(number, { size: 13, color: C.teal, weight: 600, letterSpacing: 0.8 });
      n.moveTo([x - 0.86, processY, 0]);
      const l = text(label, { size: 13, color: C.muted });
      placeLeft(l, x - 0.6, processY);
      process.push(new Group(n, l));
    }
    const arrows = [
      new Arrow({
        start: [-2.6, processY, 0],
        end: [-1.55, processY, 0],
        color: C.dim,
        strokeWidth: 1.2,
        tipLength: 0.1,
        tipWidth: 0.07,
      }),
      new Arrow({
        start: [1.85, processY, 0],
        end: [2.9, processY, 0],
        color: C.dim,
        strokeWidth: 1.2,
        tipLength: 0.1,
        tipWidth: 0.07,
      }),
    ];
    arrows.forEach((arrow) => arrow.setStrokeOpacity(0.55));

    await scene.play(
      new DrawBorderThenFill(card1, { duration: 0.75 }),
      new DrawBorderThenFill(card2, { duration: 0.75 }),
    );
    await scene.play(
      new FadeIn(kicker1, { duration: 0.25 }),
      new FadeIn(heading1, { duration: 0.35, shift: [0, -0.08, 0] }),
      new FadeIn(sub1, { duration: 0.25 }),
      new FadeIn(kicker2, { duration: 0.25 }),
      new FadeIn(heading2, { duration: 0.35, shift: [0, -0.08, 0] }),
      new FadeIn(sub2, { duration: 0.25 }),
      new FadeIn(cardNumber1, { duration: 0.3 }),
      new FadeIn(cardNumber2, { duration: 0.3 }),
    );
    await scene.play(
      new FadeIn(formula1, { duration: 0.4 }),
      new FadeIn(formula2, { duration: 0.4 }),
      new FadeIn(tag1, { duration: 0.25 }),
      new FadeIn(tag2, { duration: 0.25 }),
    );
    await scene.play(
      ...process.map((item) => new FadeIn(item, { duration: 0.3 })),
      ...arrows.map((arrow) => new FadeIn(arrow, { duration: 0.3 })),
    );
  },
};
