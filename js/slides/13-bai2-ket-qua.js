import { FadeIn } from "manim-web";
import { C } from "../theme.js";
import { buildSGraph, revealSGraph } from "../components/plots.js";
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

  const math = await tex(formula, { size: 25, color: C.ink });
  math.moveTo([center[0] + 0.08, center[1] - 0.2, 0]);

  return { card, kicker, math };
}

export default {
  id: "bai2-ket-qua",
  title: "Bài 2 · Kết quả",
  accent: C.violet,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Bài 2 · Kết luận",
      title: "Lượng dây tối ưu",
      accent: C.violet,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const result1 = await resultCard({
      label: "Chiều dài đoạn uốn vuông",
      formula: "x=\\frac{240}{\\pi+4}\\approx 33{,}61\\ \\text{cm}",
      center: [-3.55, 1.35, 0],
      accent: C.amber,
    });
    const result2 = await resultCard({
      label: "Diện tích nhỏ nhất",
      formula: "S_{\\min}=\\frac{900}{\\pi+4}\\approx 126{,}02\\ \\text{cm}^2",
      center: [-3.55, -0.12, 0],
      accent: C.violet,
    });

    const comparisonKicker = text("SO SÁNH HAI ĐẦU MÚT", {
      size: 10,
      color: C.dim,
      weight: 600,
      letterSpacing: 1.6,
    });
    placeLeft(comparisonKicker, -5.95, -1.18);

    const comparison = await tex(
      "S(0)=\\frac{900}{\\pi}\\approx286{,}5,\\qquad S(60)=225",
      { size: 18, color: C.muted },
    );
    comparison.moveTo([-3.55, -1.53, 0]);

    const conclusionPanel = panel(4.85, 0.98, {
      color: C.violet,
      fillOpacity: 0.04,
      radius: 0.16,
    });
    conclusionPanel.moveTo([-3.55, -2.36, 0]);

    const conclusion = text("Dùng khoảng 33,61 cm để uốn hình vuông.", {
      size: 15,
      color: C.ink,
    });
    conclusion.moveTo([-3.55, -2.36, 0]);

    const graph = await buildSGraph([3.4, 0.12, 0]);

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
    await revealSGraph(scene, graph);
  },
};
