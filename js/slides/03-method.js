import { Dot, FadeIn } from "manim-web";
import { C, FONT } from "../theme.js";
import { makeHeader, panel, placeLeft, revealHeader, text } from "../components/ui.js";

const STEPS = [
  {
    number: "01",
    title: "Đặt ẩn\nvà miền xác định",
    body: "Chọn biến x, ghi rõ đơn vị\nvà điều kiện của x.",
  },
  {
    number: "02",
    title: "Dựng hàm\nmục tiêu",
    body: "Biểu diễn đại lượng cần\ntối ưu thành hàm f(x).",
  },
  {
    number: "03",
    title: "Đạo hàm\nvà xét dấu",
    body: "Giải f′(x) = 0, xét dấu\nđể tìm chiều biến thiên.",
  },
  {
    number: "04",
    title: "So sánh\nvà kết luận",
    body: "Kiểm tra hai đầu mút,\nchọn GTNN – GTLN.",
  },
];

export default {
  id: "phuong-phap",
  title: "Quy trình giải bài toán tối ưu",
  accent: C.amber,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Phương pháp",
      title: "Quy trình giải bài toán tối ưu",
      accent: C.amber,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const cards = [];
    const connectors = [];
    const centers = [-4.55, -1.52, 1.52, 4.55];

    for (let i = 0; i < STEPS.length; i += 1) {
      const step = STEPS[i];
      const x = centers[i];
      const card = panel(2.78, 2.3, {
        color: C.amber,
        fillOpacity: 0.045,
        radius: 0.18,
      });
      card.moveTo([x, 0.55, 0]);

      const number = text(step.number, {
        size: 12,
        color: C.amber,
        weight: 600,
        letterSpacing: 1.4,
      });
      placeLeft(number, x - 1.16, 1.42);

      const title = text(step.title, {
        size: 18,
        color: C.ink,
        font: FONT.serif,
        weight: 600,
        lineHeight: 1.16,
      });
      placeLeft(title, x - 1.16, 1.02);

      const body = text(step.body, {
        size: 12.5,
        color: C.muted,
        lineHeight: 1.38,
      });
      placeLeft(body, x - 1.16, 0.25);

      cards.push(card, number, title, body);

      if (i < STEPS.length - 1) {
        const connector = text("→", { size: 20, color: C.dim });
        connector.moveTo([(centers[i] + centers[i + 1]) / 2, 0.55, 0]);
        connectors.push(connector);
      }
    }

    const notePanel = panel(11.85, 0.92, {
      color: C.amber,
      fillOpacity: 0.05,
      radius: 0.16,
    });
    notePanel.moveTo([0, -1.62, 0]);

    const noteDot = new Dot({ point: [-5.48, -1.62, 0], radius: 0.05, color: C.amber });
    const note = text(
      "Điểm tới hạn chỉ là ứng viên. Phải xét dấu đạo hàm hoặc so sánh giá trị hai đầu mút trước khi kết luận.",
      { size: 15, color: C.ink },
    );
    placeLeft(note, -5.27, -1.62);

    await scene.play(
      ...cards
        .filter((_, index) => index % 4 === 0 || index % 4 === 1)
        .map((mobject) => new FadeIn(mobject, { duration: 0.35 })),
      ...connectors.map((mobject) => new FadeIn(mobject, { duration: 0.25 })),
    );
    await scene.play(
      ...cards
        .filter((_, index) => index % 4 === 2 || index % 4 === 3)
        .map((mobject) => new FadeIn(mobject, { duration: 0.35, shift: [0, -0.06, 0] })),
    );
    await scene.play(
      new FadeIn(notePanel, { duration: 0.4 }),
      new FadeIn(noteDot, { duration: 0.25 }),
      new FadeIn(note, { duration: 0.35, shift: [0, -0.05, 0] }),
    );
  },
};
