import { Create, FadeIn, Group, LaggedStart, Line } from "manim-web";
import { C } from "../theme.js";
import { tex } from "./ui.js";

/**
 * Build a Vietnamese-style variation table.
 *
 * The table deliberately keeps the middle value symbolic (T_min / S_min);
 * the exact value is introduced on the conclusion slide.
 */
export async function buildVariationTable(options) {
  const accent = options.accent ?? C.teal;
  const labelX = -3.7;
  const valueXs = [-1.75, 0.55, 2.9];
  const intervalXs = [-0.6, 1.725];
  const rows = { header: 0.82, sign: -0.04, value: -0.9 };
  const lines = { top: 1.26, upper: 0.44, lower: -0.46, bottom: -1.27 };

  const entries = await Promise.all([
    tex("x", { size: 28, color: C.muted }),
    tex(options.functionName, { size: 28, color: C.muted }),
    tex(options.primitiveName, { size: 28, color: C.muted }),
    tex(options.xStart, { size: 28, color: C.ink }),
    tex(options.xMiddle, { size: 28, color: accent }),
    tex(options.xEnd, { size: 28, color: C.ink }),
    tex("-", { size: 32, color: C.rose }),
    tex("0", { size: 28, color: C.muted }),
    tex("+", { size: 32, color: C.teal }),
    tex(options.startValue, { size: 24, color: C.muted }),
    tex(options.middleValue, { size: 26, color: accent }),
    tex(options.endValue, { size: 24, color: C.muted }),
    tex("\\searrow", { size: 30, color: C.muted }),
    tex("\\nearrow", { size: 30, color: C.muted }),
  ]);

  const [
    xLabel,
    functionLabel,
    primitiveLabel,
    xStart,
    xMiddle,
    xEnd,
    minus,
    zero,
    plus,
    startValue,
    middleValue,
    endValue,
    downArrow,
    upArrow,
  ] = entries;

  xLabel.moveTo([labelX, rows.header, 0]);
  functionLabel.moveTo([labelX, rows.sign, 0]);
  primitiveLabel.moveTo([labelX, rows.value, 0]);

  xStart.moveTo([valueXs[0], rows.header, 0]);
  xMiddle.moveTo([valueXs[1], rows.header, 0]);
  xEnd.moveTo([valueXs[2], rows.header, 0]);

  minus.moveTo([intervalXs[0], rows.sign, 0]);
  zero.moveTo([valueXs[1], rows.sign, 0]);
  plus.moveTo([intervalXs[1], rows.sign, 0]);

  startValue.moveTo([valueXs[0], rows.value, 0]);
  middleValue.moveTo([valueXs[1], rows.value, 0]);
  endValue.moveTo([valueXs[2], rows.value, 0]);

  downArrow.moveTo([intervalXs[0], rows.value, 0]);
  upArrow.moveTo([intervalXs[1], rows.value, 0]);

  const horizontal = [lines.top, lines.upper, lines.lower, lines.bottom].map(
    (y) =>
      new Line({
        start: [-4.4, y, 0],
        end: [4.4, y, 0],
        color: y === lines.upper || y === lines.lower ? "rgba(148,163,184,0.38)" : accent,
        strokeWidth: y === lines.top || y === lines.bottom ? 2 : 1.2,
      }),
  );

  const separator = new Line({
    start: [-2.85, lines.bottom, 0],
    end: [-2.85, lines.top, 0],
    color: "rgba(148,163,184,0.38)",
    strokeWidth: 1.2,
  });

  const cells = [
    xLabel,
    functionLabel,
    primitiveLabel,
    xStart,
    xMiddle,
    xEnd,
    minus,
    zero,
    plus,
    startValue,
    middleValue,
    endValue,
    downArrow,
    upArrow,
  ];

  const group = new Group(...horizontal, separator, ...cells);

  return {
    group,
    cells,
    lines: [...horizontal, separator],
    moveBy(dx, dy) {
      for (const mobject of [...horizontal, separator, ...cells]) {
        mobject.shift([dx, dy, 0]);
      }
      return this;
    },
    async reveal(scene) {
      await scene.play(...horizontal.map((line) => new Create(line, { duration: 0.35 })), new Create(separator, { duration: 0.35 }));
      await scene.play(
        new LaggedStart(
          cells.map((cell) => new FadeIn(cell, { duration: 0.25 })),
          { lagRatio: 0.05 },
        ),
      );
    },
  };
}
