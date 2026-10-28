import { Dot, FadeIn, Line } from "manim-web";
import { C } from "../theme.js";
import { makeHeader, panel, placeLeft, revealHeader, tex, text } from "../components/ui.js";

async function summaryCard({ kicker, formula1, formula2, note, center, accent }) {
  const card = panel(5.75, 2.45, {
    color: accent,
    fillOpacity: 0.05,
    radius: 0.2,
  });
  card.moveTo(center);

  const kickerLabel = text(kicker, {
    size: 11,
    color: accent,
    weight: 600,
    letterSpacing: 2,
  });
  placeLeft(kickerLabel, center[0] - 2.55, center[1] + 0.85);

  const first = await tex(formula1, { size: 26, color: C.ink });
  first.moveTo([center[0], center[1] + 0.28, 0]);

  const second = await tex(formula2, { size: 23, color: accent });
  second.moveTo([center[0], center[1] - 0.33, 0]);

  const noteLabel = text(note, { size: 13, color: C.muted });
  noteLabel.moveTo([center[0], center[1] - 0.88, 0]);

  return { card, kickerLabel, first, second, noteLabel };
}

export default {
  id: "tong-ket",
  title: "Tổng kết",
  accent: C.teal,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Tổng kết",
      title: "Một quy trình, hai bài toán",
      accent: C.teal,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const card1 = await summaryCard({
      kicker: "BÀI 1 · THỜI GIAN",
      formula1: "CD=\\frac{9}{\\sqrt7}\\approx3{,}40\\ \\text{km}",
      formula2: "T_{\\min}=1+\\frac{\\sqrt7}{8}\\approx1{,}3307\\ \\text{h}",
      note: "hạ bờ sớm hơn so với chạy bộ toàn bộ",
      center: [-3.05, 0.72, 0],
      accent: C.teal,
    });
    const card2 = await summaryCard({
      kicker: "BÀI 2 · DIỆN TÍCH",
      formula1: "x=\\frac{240}{\\pi+4}\\approx33{,}61\\ \\text{cm}",
      formula2: "S_{\\min}=\\frac{900}{\\pi+4}\\approx126{,}02\\ \\text{cm}^2",
      note: "đoạn còn lại uốn thành hình tròn",
      center: [3.05, 0.72, 0],
      accent: C.violet,
    });

    const insightPanel = panel(11.85, 0.72, {
      color: C.amber,
      fillOpacity: 0.045,
      radius: 0.16,
    });
    insightPanel.moveTo([0, -1.12, 0]);

    const insightDot = new Dot({ point: [-5.48, -1.12, 0], radius: 0.05, color: C.amber });
    const insight = text(
      "Đạo hàm đổi dấu từ âm sang dương tại điểm tới hạn duy nhất  ⇒  cực tiểu toàn cục.",
      { size: 15, color: C.ink },
    );
    placeLeft(insight, -5.27, -1.12);

    const flowLine = new Line({
      start: [-5.15, -2.06, 0],
      end: [5.15, -2.06, 0],
      color: C.dim,
      strokeWidth: 1.2,
    });
    flowLine.setStrokeOpacity(0.55);

    const steps = [
      ["01", "Mô hình hóa", -4.55],
      ["02", "Đạo hàm", -1.5],
      ["03", "Bảng biến thiên", 1.55],
      ["04", "Kết luận", 4.55],
    ];
    const flow = [];
    for (const [number, label, x] of steps) {
      const dot = new Dot({ point: [x, -2.06, 0], radius: 0.055, color: C.teal });
      const n = text(number, {
        size: 11,
        color: C.teal,
        weight: 600,
        letterSpacing: 0.8,
      });
      n.moveTo([x, -2.38, 0]);
      const l = text(label, { size: 13, color: C.muted });
      l.moveTo([x, -2.62, 0]);
      flow.push(dot, n, l);
    }

    await scene.play(
      new FadeIn(card1.card, { duration: 0.45 }),
      new FadeIn(card1.kickerLabel, { duration: 0.25 }),
      new FadeIn(card2.card, { duration: 0.45 }),
      new FadeIn(card2.kickerLabel, { duration: 0.25 }),
    );
    await scene.play(
      new FadeIn(card1.first, { duration: 0.4, shift: [0, -0.08, 0] }),
      new FadeIn(card2.first, { duration: 0.4, shift: [0, -0.08, 0] }),
    );
    await scene.play(
      new FadeIn(card1.second, { duration: 0.35 }),
      new FadeIn(card2.second, { duration: 0.35 }),
      new FadeIn(card1.noteLabel, { duration: 0.3 }),
      new FadeIn(card2.noteLabel, { duration: 0.3 }),
    );
    await scene.play(
      new FadeIn(insightPanel, { duration: 0.4 }),
      new FadeIn(insightDot, { duration: 0.25 }),
      new FadeIn(insight, { duration: 0.35, shift: [0, -0.06, 0] }),
    );
    await scene.play(
      new FadeIn(flowLine, { duration: 0.4 }),
      ...flow.map((item) => new FadeIn(item, { duration: 0.3 })),
    );
  },
};
