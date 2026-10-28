import { FadeIn } from "manim-web";
import { C, FRAME } from "../theme.js";
import { wireDiagram } from "../components/diagrams.js";
import { bullet, makeHeader, panel, placeLeft, revealHeader, tex, text } from "../components/ui.js";

export default {
  id: "bai2-de",
  title: "Bài 2 · Chia sợi dây",
  accent: C.violet,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Bài 2",
      title: "Chia sợi dây 60 cm",
      accent: C.violet,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const problemLabel = text("ĐỀ BÀI", {
      size: 12,
      color: C.violet,
      weight: 600,
      letterSpacing: 2.2,
    });
    placeLeft(problemLabel, FRAME.left, 1.88);

    const bullets = [
      bullet("Sợi dây dài 60 cm", { y: 1.36, size: 18, color: C.violet }),
      bullet("Đoạn x uốn thành hình vuông", { y: 0.76, size: 18, color: C.violet }),
      bullet("Đoạn 60 − x uốn thành hình tròn", { y: 0.16, size: 18, color: C.violet }),
      bullet("Tìm x để tổng diện tích nhỏ nhất", {
        y: -0.44,
        size: 18,
        color: C.amber,
      }),
    ];

    const questionPanel = panel(5.35, 1.48, {
      color: C.violet,
      fillOpacity: 0.06,
      radius: 0.2,
    });
    questionPanel.moveTo([-3.36, -1.84, 0]);

    const questionKicker = text("CẦN TÌM", {
      size: 11,
      color: C.violet,
      weight: 600,
      letterSpacing: 2,
    });
    placeLeft(questionKicker, -5.78, -1.43);

    const question = text("Độ dài đoạn uốn thành hình vuông", {
      size: 16,
      color: C.ink,
    });
    placeLeft(question, -5.78, -1.83);

    const domain = await tex("x\\in(0;60)\\ \\text{(cm)}", {
      size: 22,
      color: C.violetSoft,
    });
    domain.moveTo([-3.36, -2.28, 0]);

    const diagram = wireDiagram().build([3.35, -0.05, 0]);

    await scene.play(
      new FadeIn(problemLabel, { duration: 0.3, shift: [0, -0.08, 0] }),
      new FadeIn(bullets[0], { duration: 0.35, shift: [0, -0.08, 0] }),
    );
    await scene.play(
      new FadeIn(bullets[1], { duration: 0.3, shift: [0, -0.08, 0] }),
      new FadeIn(bullets[2], { duration: 0.3, shift: [0, -0.08, 0] }),
      new FadeIn(questionPanel, { duration: 0.45 }),
      new FadeIn(questionKicker, { duration: 0.3 }),
    );
    await scene.play(
      new FadeIn(bullets[3], { duration: 0.3 }),
      new FadeIn(question, { duration: 0.3 }),
      new FadeIn(domain, { duration: 0.35 }),
    );
    await diagram.reveal(scene);
  },
};
