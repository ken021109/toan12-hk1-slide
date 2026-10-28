import { FadeIn, Group } from "manim-web";
import { C } from "../theme.js";
import { buildRiverTriangleModel } from "../components/diagrams.js";
import { makeHeader, panel, placeLeft, revealHeader, tex, text } from "../components/ui.js";

async function stepCard({ number, label, formula, center, accent }) {
  const card = panel(5.65, 1.05, {
    color: accent,
    fillOpacity: 0.045,
    radius: 0.16,
  });
  card.moveTo(center);

  const numberLabel = text(number, {
    size: 12,
    color: accent,
    weight: 600,
    letterSpacing: 1.2,
  });
  placeLeft(numberLabel, center[0] - 2.66, center[1] + 0.33);

  const title = text(label, {
    size: 15,
    color: C.muted,
    weight: 600,
  });
  placeLeft(title, center[0] - 2.22, center[1] + 0.33);

  const math = await tex(formula, { size: 25, color: C.ink });
  math.moveTo([center[0] + 0.1, center[1] - 0.2, 0]);

  return new Group(card, numberLabel, title, math);
}

export default {
  id: "bai1-mo-hinh",
  title: "Bài 1 · Mô hình hóa",
  accent: C.teal,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Bài 1 · Bước 1",
      title: "Dựng hàm tổng thời gian",
      accent: C.teal,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const card1 = await stepCard({
      number: "01",
      label: "Quãng đường",
      formula: "AD=\\sqrt{x^2+9},\\qquad DB=8-x",
      center: [-3.2, 1.32, 0],
      accent: C.teal,
    });
    const card2 = await stepCard({
      number: "02",
      label: "Thời gian",
      formula: "t_1=\\frac{\\sqrt{x^2+9}}{6},\\qquad t_2=\\frac{8-x}{8}",
      center: [-3.2, 0.02, 0],
      accent: C.teal,
    });

    const modelPanel = panel(5.45, 3.3, {
      color: C.dim,
      fillOpacity: 0.03,
      radius: 0.2,
    });
    modelPanel.moveTo([3.15, 0.43, 0]);

    const modelCaption = text("Tam giác ACD trên sơ đồ sông", {
      size: 13,
      color: C.dim,
    });
    placeLeft(modelCaption, 0.72, 1.92);

    const river = await buildRiverTriangleModel([3.15, 0.23, 0], 0.78);

    const goalPanel = panel(11.85, 1.42, {
      color: C.teal,
      fillOpacity: 0.055,
      radius: 0.2,
    });
    goalPanel.moveTo([0, -2.1, 0]);

    const goalKicker = text("HÀM MỤC TIÊU", {
      size: 11,
      color: C.teal,
      weight: 600,
      letterSpacing: 2,
    });
    placeLeft(goalKicker, -5.73, -1.68);

    const goalFormula = await tex(
      "T(x)=\\frac{\\sqrt{x^2+9}}{6}+\\frac{8-x}{8}",
      { size: 35, color: C.ink },
    );
    goalFormula.moveTo([-2.05, -2.24, 0]);

    const goalDomain = await tex("0\\le x\\le 8", { size: 24, color: C.tealSoft });
    goalDomain.moveTo([4.8, -2.24, 0]);

    await scene.play(
      new FadeIn(card1, { duration: 0.45, shift: [0, -0.1, 0] }),
      new FadeIn(modelPanel, { duration: 0.45 }),
      new FadeIn(modelCaption, { duration: 0.3 }),
    );
    await scene.play(
      new FadeIn(card2, { duration: 0.4, shift: [0, -0.08, 0] }),
      new FadeIn(goalPanel, { duration: 0.45 }),
      new FadeIn(goalKicker, { duration: 0.3 }),
    );
    await river.reveal(scene);
    await scene.play(
      new FadeIn(goalFormula, { duration: 0.5, shift: [0, -0.1, 0] }),
      new FadeIn(goalDomain, { duration: 0.35 }),
    );
  },
};
