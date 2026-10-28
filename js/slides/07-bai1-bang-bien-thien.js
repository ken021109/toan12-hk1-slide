import { FadeIn } from "manim-web";
import { C } from "../theme.js";
import { buildVariationTable } from "../components/variation-table.js";
import { makeHeader, panel, revealHeader, text } from "../components/ui.js";

export default {
  id: "bai1-bang-bien-thien",
  title: "Bài 1 · Bảng biến thiên",
  accent: C.teal,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Bài 1 · Bước 3",
      title: "Bảng biến thiên của T(x)",
      accent: C.teal,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const hint = text(
      "Điền giá trị của T tại hai đầu mút và tại điểm tới hạn, rồi đọc chiều mũi tên.",
      { size: 15, color: C.muted },
    );
    hint.moveTo([0, 1.88, 0]);

    const table = await buildVariationTable({
      functionName: "T'(x)",
      primitiveName: "T(x)",
      xStart: "0",
      xMiddle: "\\frac{9}{\\sqrt7}",
      xEnd: "8",
      startValue: "\\frac32",
      middleValue: "1+\\frac{\\sqrt7}{8}",
      endValue: "\\frac{\\sqrt{73}}{6}",
      accent: C.teal,
    });
    table.moveBy(0, -0.2);

    const conclusionPanel = panel(11.85, 0.7, {
      color: C.teal,
      fillOpacity: 0.055,
      radius: 0.14,
    });
    conclusionPanel.moveTo([0, -2.47, 0]);

    const conclusion = text(
      "T giảm trên (0; 9/√7), tăng trên (9/√7; 8) ⇒ T nhỏ nhất tại x = 9/√7.",
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
