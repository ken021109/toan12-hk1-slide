import { Circle, FadeIn, Square } from "manim-web";
import { C, FONT } from "../theme.js";
import { makeHeader, panel, placeLeft, revealHeader, tex, text } from "../components/ui.js";

async function shapeCard({ kicker, caption, formula, center, accent, shape }) {
  const card = panel(5.7, 2.55, {
    color: accent,
    fillOpacity: 0.045,
    radius: 0.2,
  });
  card.moveTo(center);

  const kickerLabel = text(kicker, {
    size: 11,
    color: accent,
    weight: 600,
    letterSpacing: 2,
  });
  placeLeft(kickerLabel, center[0] - 2.55, center[1] + 0.92);

  const captionLabel = text(caption, {
    size: 20,
    color: C.ink,
    font: FONT.serif,
    weight: 600,
  });
  placeLeft(captionLabel, center[0] - 2.55, center[1] + 0.55);

  const math = await tex(formula, { size: 25, color: C.ink });
  math.moveTo([center[0], center[1] - 0.25, 0]);

  shape.moveTo([center[0] + 2.1, center[1] + 0.7, 0]);
  shape.setStrokeOpacity(0.55);

  return { card, kickerLabel, captionLabel, math, shape };
}

export default {
  id: "bai2-mo-hinh",
  title: "Bài 2 · Mô hình hóa",
  accent: C.violet,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Bài 2 · Bước 1",
      title: "Diện tích từng hình",
      accent: C.violet,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const squareIcon = new Square({
      sideLength: 0.62,
      color: C.teal,
      strokeWidth: 1.6,
    });
    squareIcon.setFill(C.teal, 0.07);

    const circleIcon = new Circle({
      radius: 0.34,
      color: C.violet,
      strokeWidth: 1.6,
    });
    circleIcon.setFill(C.violet, 0.07);

    const squareCard = await shapeCard({
      kicker: "HÌNH VUÔNG",
      caption: "Cạnh a = x/4",
      formula: "S_1=\\left(\\frac{x}{4}\\right)^2=\\frac{x^2}{16}",
      center: [-3.05, 0.78, 0],
      accent: C.teal,
      shape: squareIcon,
    });
    const circleCard = await shapeCard({
      kicker: "HÌNH TRÒN",
      caption: "Bán kính r = (60 − x)/2π",
      formula: "S_2=\\pi\\left(\\frac{60-x}{2\\pi}\\right)^2=\\frac{(60-x)^2}{4\\pi}",
      center: [3.05, 0.78, 0],
      accent: C.violet,
      shape: circleIcon,
    });

    const goalPanel = panel(11.85, 1.38, {
      color: C.violet,
      fillOpacity: 0.055,
      radius: 0.2,
    });
    goalPanel.moveTo([0, -2.06, 0]);

    const goalKicker = text("TỔNG DIỆN TÍCH", {
      size: 11,
      color: C.violet,
      weight: 600,
      letterSpacing: 2,
    });
    placeLeft(goalKicker, -5.73, -1.66);

    const goalFormula = await tex(
      "S(x)=\\frac{x^2}{16}+\\frac{(60-x)^2}{4\\pi}",
      { size: 33, color: C.ink },
    );
    goalFormula.moveTo([-1.75, -2.2, 0]);

    const goalDomain = await tex("0<x<60", { size: 24, color: C.violetSoft });
    goalDomain.moveTo([4.85, -2.2, 0]);

    await scene.play(
      new FadeIn(squareCard.card, { duration: 0.45 }),
      new FadeIn(squareCard.kickerLabel, { duration: 0.25 }),
      new FadeIn(squareCard.captionLabel, { duration: 0.3 }),
      new FadeIn(squareIcon, { duration: 0.35 }),
    );
    await scene.play(
      new FadeIn(squareCard.math, { duration: 0.4, shift: [0, -0.08, 0] }),
      new FadeIn(circleCard.card, { duration: 0.45 }),
      new FadeIn(circleCard.kickerLabel, { duration: 0.25 }),
      new FadeIn(circleCard.captionLabel, { duration: 0.3 }),
      new FadeIn(circleIcon, { duration: 0.35 }),
    );
    await scene.play(
      new FadeIn(circleCard.math, { duration: 0.4, shift: [0, -0.08, 0] }),
      new FadeIn(goalPanel, { duration: 0.45 }),
      new FadeIn(goalKicker, { duration: 0.25 }),
    );
    await scene.play(
      new FadeIn(goalFormula, { duration: 0.45, shift: [0, -0.1, 0] }),
      new FadeIn(goalDomain, { duration: 0.3 }),
    );
  },
};
