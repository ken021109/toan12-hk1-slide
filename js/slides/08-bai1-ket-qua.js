import { FadeIn } from "manim-web";
import { C } from "../theme.js";
import { buildTGraph, revealTGraph } from "../components/plots.js";
import { makeHeader, panel, placeLeft, revealHeader, tex, text } from "../components/ui.js";

async function resultCard({ label, formula, center, accent, width = 4.85 }) {
  const card = panel(width, 1.3, {
    color: accent,
    fillOpacity: 0.055,
    radius: 0.18,
  });
  card.moveTo(center);

  const kicker = text(label.toUpperCase(), {
    size: 10,
    color: accent,
    weight: 600,
    letterSpacing: 1.8,
  });
  placeLeft(kicker, center[0] - width / 2 + 0.3, center[1] + 0.3);

  const math = await tex(formula, { size: 26, color: C.ink });
  math.moveTo([center[0] + 0.1, center[1] - 0.2, 0]);

  return { card, kicker, math };
}

export default {
  id: "bai1-ket-qua",
  title: "Bài 1 · Kết quả",
  accent: C.teal,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Bài 1 · Kết luận",
      title: "Điểm hạ bờ tối ưu",
      accent: C.teal,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const result1 = await resultCard({
      label: "Khoảng cách CD",
      formula: "CD=\\frac{9}{\\sqrt7}\\approx 3{,}40\\ \\text{km}",
      center: [-3.55, 1.35, 0],
      accent: C.amber,
    });
    const result2 = await resultCard({
      label: "Thời gian nhỏ nhất",
      formula: "T_{\\min}=1+\\frac{\\sqrt7}{8}\\approx 1{,}3307\\ \\text{h}",
      center: [-3.55, -0.12, 0],
      accent: C.teal,
    });

    const comparisonKicker = text("SO SÁNH HAI ĐẦU MÚT", {
      size: 10,
      color: C.dim,
      weight: 600,
      letterSpacing: 1.6,
    });
    placeLeft(comparisonKicker, -5.95, -1.18);

    const comparison = await tex(
      "T(0)=\\frac32,\\qquad T(8)=\\frac{\\sqrt{73}}{6}\\approx1{,}424",
      { size: 19, color: C.muted },
    );
    comparison.moveTo([-3.55, -1.53, 0]);

    const conclusionPanel = panel(4.85, 0.98, {
      color: C.teal,
      fillOpacity: 0.04,
      radius: 0.16,
    });
    conclusionPanel.moveTo([-3.55, -2.36, 0]);

    const conclusion = text("Hạ bờ tại D cách C khoảng 3,40 km.", {
      size: 15,
      color: C.ink,
    });
    conclusion.moveTo([-3.55, -2.36, 0]);

    const graph = await buildTGraph([3.4, 0.12, 0]);

    await scene.play(
      new FadeIn(result1.card, { duration: 0.4 }),
      new FadeIn(result1.kicker, { duration: 0.25 }),
      new FadeIn(result1.math, { duration: 0.35, shift: [0, -0.08, 0] }),
    );
    await scene.play(
      new FadeIn(result2.card, { duration: 0.4 }),
      new FadeIn(result2.kicker, { duration: 0.25 }),
      new FadeIn(result2.math, { duration: 0.35, shift: [0, -0.08, 0] }),
    );
    await scene.play(
      new FadeIn(comparisonKicker, { duration: 0.25 }),
      new FadeIn(comparison, { duration: 0.35 }),
      new FadeIn(conclusionPanel, { duration: 0.35 }),
      new FadeIn(conclusion, { duration: 0.3 }),
    );
    await revealTGraph(scene, graph);
  },
};
