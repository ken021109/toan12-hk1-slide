import { FadeIn } from "manim-web";
import { C, FRAME } from "../theme.js";
import { buildRiverDiagram } from "../components/diagrams.js";
import { bullet, makeHeader, panel, placeLeft, revealHeader, tex, text } from "../components/ui.js";

export default {
  id: "bai1-de",
  title: "Bài 1 · Chọn điểm hạ bờ",
  accent: C.teal,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Bài 1 · Luyện tập 2",
      title: "Chọn điểm hạ bờ",
      accent: C.teal,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const problemLabel = text("ĐỀ BÀI", {
      size: 12,
      color: C.teal,
      weight: 600,
      letterSpacing: 2.2,
    });
    placeLeft(problemLabel, FRAME.left, 1.88);

    const bullets = [
      bullet("Sông rộng AC = 3 km, bờ CB = 8 km", { y: 1.36, size: 18 }),
      bullet("Chèo thuyền 6 km/h, chạy bộ 8 km/h", { y: 0.76, size: 18 }),
      bullet("Đi từ A, hạ bờ tại D, rồi chạy đến B", { y: 0.16, size: 18 }),
      bullet("Chọn D để tổng thời gian nhỏ nhất", { y: -0.44, size: 18, color: C.amber }),
    ];

    const questionPanel = panel(5.35, 1.48, {
      color: C.teal,
      fillOpacity: 0.055,
      radius: 0.2,
    });
    questionPanel.moveTo([-3.36, -1.84, 0]);

    const questionKicker = text("CẦN TÌM", {
      size: 11,
      color: C.teal,
      weight: 600,
      letterSpacing: 2,
    });
    placeLeft(questionKicker, -5.78, -1.43);

    const question = text("Vị trí D để tổng thời gian T nhỏ nhất", {
      size: 16,
      color: C.ink,
    });
    placeLeft(question, -5.78, -1.83);

    const domain = await tex("x=CD\\ (\\text{km}),\\quad 0\\le x\\le 8", {
      size: 22,
      color: C.tealSoft,
    });
    domain.moveTo([-3.4, -2.28, 0]);

    const diagram = await buildRiverDiagram();

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
