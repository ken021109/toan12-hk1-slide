import { Dot, FadeIn } from "manim-web";
import { C } from "../theme.js";
import { makeHeader, panel, placeLeft, revealHeader, tex, text } from "../components/ui.js";

export default {
  id: "bai2-dao-ham",
  title: "Bài 2 · Giải S′(x) = 0",
  accent: C.violet,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Bài 2 · Bước 2",
      title: "Giải S′(x) = 0 và xét dấu",
      accent: C.violet,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const leftPanel = panel(6.0, 4.15, {
      color: C.violet,
      fillOpacity: 0.035,
      radius: 0.18,
    });
    leftPanel.moveTo([-2.95, -0.075, 0]);

    const leftKicker = text("GIẢI PHƯƠNG TRÌNH", {
      size: 11,
      color: C.violet,
      weight: 600,
      letterSpacing: 2,
    });
    placeLeft(leftKicker, -5.78, 1.72);

    const lines = await Promise.all([
      tex("S'(x)=\\frac{x}{8}-\\frac{60-x}{2\\pi}", { size: 23, color: C.ink }),
      tex("S'(x)=0\\;\\Longleftrightarrow\\;\\frac{x}{8}=\\frac{60-x}{2\\pi}", {
        size: 18,
        color: C.muted,
      }),
      tex("\\Longleftrightarrow\\;2\\pi x=8(60-x)", { size: 19, color: C.muted }),
      tex("\\Longleftrightarrow\\;\\pi x=4(60-x)\\;\\Longleftrightarrow\\;(\\pi+4)x=240", {
        size: 18,
        color: C.muted,
      }),
      tex("\\Longleftrightarrow\\;x=\\frac{240}{\\pi+4}", { size: 20, color: C.violetSoft }),
    ]);

    const lineYs = [1.36, 0.86, 0.4, -0.08, -0.58];
    lines.forEach((line, index) => line.moveTo([-2.95, lineYs[index], 0]));

    const condition = text("vì x ∈ (0; 60) nên nghiệm này hợp lệ", {
      size: 12.5,
      color: C.dim,
    });
    condition.moveTo([-2.95, -0.98, 0]);

    const answer = await tex("x_0=\\frac{240}{\\pi+4}\\approx33{,}61", {
      size: 25,
      color: C.amber,
    });
    answer.moveTo([-2.95, -1.55, 0]);

    const rightPanel = panel(5.45, 4.15, {
      color: C.amber,
      fillOpacity: 0.035,
      radius: 0.18,
    });
    rightPanel.moveTo([3.33, -0.075, 0]);

    const rightKicker = text("XÉT DẤU S′(x)", {
      size: 11,
      color: C.amber,
      weight: 600,
      letterSpacing: 2,
    });
    placeLeft(rightKicker, 0.78, 1.72);

    const factored = await tex(
      "S'(x)=\\frac{(\\pi+4)x-240}{8\\pi}",
      { size: 22, color: C.ink },
    );
    factored.moveTo([3.33, 1.28, 0]);

    const reason = text(
      "• Mẫu số 8π > 0.\n• Tử số là hàm bậc nhất có hệ số góc\n   π + 4 > 0, chỉ triệt tiêu tại x₀.\n• S′(0) < 0; S′(60) = 7,5 > 0.\n• Do đó S′ đổi dấu từ − sang +.",
      {
        size: 14,
        color: C.ink,
        lineHeight: 1.55,
      },
    );
    placeLeft(reason, 0.82, 0.48);

    const noteDot = new Dot({ point: [1.0, -1.35, 0], radius: 0.045, color: C.amber });
    const note = text("S giảm rồi tăng ⇒ x₀ là điểm cực tiểu.", {
      size: 14,
      color: C.amberSoft,
    });
    placeLeft(note, 1.18, -1.35);

    const conclusionPanel = panel(11.85, 0.64, {
      color: C.amber,
      fillOpacity: 0.055,
      radius: 0.14,
    });
    conclusionPanel.moveTo([0, -2.62, 0]);

    const conclusion = text(
      "Vì S′(x) đổi dấu từ âm sang dương tại x₀ nên S(x) đạt giá trị nhỏ nhất tại x₀.",
      { size: 14, color: C.ink },
    );
    conclusion.moveTo([0, -2.62, 0]);

    await scene.play(
      new FadeIn(leftPanel, { duration: 0.4 }),
      new FadeIn(rightPanel, { duration: 0.4 }),
      new FadeIn(leftKicker, { duration: 0.25 }),
      new FadeIn(rightKicker, { duration: 0.25 }),
    );
    for (const line of lines) {
      await scene.play(new FadeIn(line, { duration: 0.28, shift: [0, -0.05, 0] }));
    }
    await scene.play(
      new FadeIn(condition, { duration: 0.3 }),
      new FadeIn(answer, { duration: 0.35, shift: [0, -0.06, 0] }),
      new FadeIn(factored, { duration: 0.35, shift: [0, -0.06, 0] }),
    );
    await scene.play(new FadeIn(reason, { duration: 0.5 }), new FadeIn(noteDot, { duration: 0.22 }));
    await scene.play(
      new FadeIn(note, { duration: 0.3 }),
      new FadeIn(conclusionPanel, { duration: 0.35 }),
      new FadeIn(conclusion, { duration: 0.3, shift: [0, -0.04, 0] }),
    );
  },
};
