import { FadeIn } from "manim-web";
import { C } from "../theme.js";
import { buildVariationTable } from "../components/variation-table.js";
import { makeHeader, panel, revealHeader, text } from "../components/ui.js";

export default {
  id: "bai2-bang-bien-thien",
  title: "Bài 2 · Bảng biến thiên",
  accent: C.violet,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Bài 2 · Bước 3",
      title: "Bảng biến thiên của S(x)",
      accent: C.violet,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const hint = text(
      "Điền giá trị của S tại hai đầu mút và tại điểm tới hạn, rồi đọc chiều mũi tên.",
      { size: 15, color: C.muted },
    );
    hint.moveTo([0, 1.88, 0]);

    const table = await buildVariationTable({
      functionName: "S'(x)",
      primitiveName: "S(x)",
      xStart: "0",
      xMiddle: "\\frac{240}{\\pi+4}",
      xEnd: "60",
      startValue: "\\frac{900}{\\pi}",
      middleValue: "\\frac{900}{\\pi+4}",
      endValue: "225",
      accent: C.violet,
    });
    table.moveBy(0, -0.2);

    const conclusionPanel = panel(11.85, 0.7, {
      color: C.violet,
      fillOpacity: 0.055,
      radius: 0.14,
    });
    conclusionPanel.moveTo([0, -2.47, 0]);

    const conclusion = text(
      "S giảm trên (0; 240/(π+4)), tăng trên (240/(π+4); 60) ⇒ S nhỏ nhất tại x₀.",
      { size: 15, color: C.ink },
    );
    conclusion.moveTo([0, -2.47, 0]);

    await scene.play(new FadeIn(hint, { duration: 0.35, shift: [0, -0.05, 0] }));
    await table.reveal(scene);
    await scene.play(
      new FadeIn(conclusionPanel, { duration: 0.35 }),
      new FadeIn(conclusion, { duration: 0.3 }),
    );
  },
};
