import {
  Circle,
  Create,
  DashedLine,
  Dot,
  FadeIn,
  Group,
  Line,
  Polygon,
  Rectangle,
  Square,
  Text,
} from "manim-web";
import { C, FONT } from "../theme.js";
import { tex } from "./ui.js";

function dimensionLine(start, end, color, strokeWidth = 1.5) {
  const line = new Line({ start, end, color, strokeWidth });
  const horizontal = Math.abs(end[0] - start[0]) >= Math.abs(end[1] - start[1]);
  const tick = 0.075;
  const cap = (point) =>
    new Line({
      start: horizontal ? [point[0], point[1] - tick, 0] : [point[0] - tick, point[1], 0],
      end: horizontal ? [point[0], point[1] + tick, 0] : [point[0] + tick, point[1], 0],
      color,
      strokeWidth,
    });
  return new Group(line, cap(start), cap(end));
}

const river = {
  left: 1.95,
  right: 3.75,
  top: 1.62,
  bottom: -2.95,
  a: [1.95, 1.62, 0],
  c: [3.75, 1.62, 0],
  d: [3.75, -0.75, 0],
  b: [3.75, -2.95, 0],
};

export async function buildRiverDiagram() {
  const width = river.right - river.left;
  const height = river.top - river.bottom;
  const band = new Rectangle({
    width,
    height,
    color: C.teal,
    strokeWidth: 0,
    fillOpacity: 0,
  });
  band.setFill(C.teal, 0.075);
  band.moveTo([(river.left + river.right) / 2, (river.top + river.bottom) / 2, 0]);

  const leftBank = new Line({
    start: [river.left, river.bottom, 0],
    end: [river.left, river.top, 0],
    color: "rgba(226,232,240,0.62)",
    strokeWidth: 2,
  });
  const rightBank = new Line({
    start: [river.right, river.bottom, 0],
    end: [river.right, river.top, 0],
    color: "rgba(226,232,240,0.62)",
    strokeWidth: 2,
  });

  const flow = [2.28, 2.62, 2.96, 3.3].map(
    (x) =>
      new DashedLine({
        start: [x, river.bottom + 0.28, 0],
        end: [x, river.top - 0.28, 0],
        color: C.blue,
        strokeWidth: 1,
        dashLength: 0.15,
        dashRatio: 0.45,
      }),
  );
  flow.forEach((line) => line.setStrokeOpacity(0.16));

  const boatPath = new Line({
    start: river.a,
    end: river.d,
    color: C.teal,
    strokeWidth: 5,
  });
  const runPath = new Line({
    start: river.d,
    end: river.b,
    color: C.amber,
    strokeWidth: 5,
  });

  const acDimension = dimensionLine(
    [river.left, river.top + 0.3, 0],
    [river.right, river.top + 0.3, 0],
    C.muted,
    1.2,
  );
  const acLabel = new Text({
    text: "3 km",
    fontSize: 14,
    color: C.muted,
    fontFamily: FONT.sans,
  });
  acLabel.moveTo([(river.left + river.right) / 2, river.top + 0.58, 0]);

  const cbDimension = dimensionLine(
    [river.right + 0.78, river.top, 0],
    [river.right + 0.78, river.bottom, 0],
    C.muted,
    1.2,
  );
  const cbLabel = new Text({
    text: "8 km",
    fontSize: 14,
    color: C.muted,
    fontFamily: FONT.sans,
  });
  cbLabel.moveTo([river.right + 1.12, (river.top + river.bottom) / 2, 0]);

  const pointA = new Dot({ point: river.a, radius: 0.065, color: C.ink });
  const pointC = new Dot({ point: river.c, radius: 0.065, color: C.ink });
  const pointB = new Dot({ point: river.b, radius: 0.065, color: C.ink });
  const pointD = new Dot({ point: river.d, radius: 0.09, color: C.amber });

  const labelA = new Text({ text: "A", fontSize: 20, color: C.ink, fontFamily: FONT.serif, fontWeight: 600 });
  labelA.moveTo([river.left - 0.22, river.top + 0.01, 0]);
  const labelC = new Text({ text: "C", fontSize: 20, color: C.ink, fontFamily: FONT.serif, fontWeight: 600 });
  labelC.moveTo([river.right + 0.24, river.top + 0.01, 0]);
  const labelB = new Text({ text: "B", fontSize: 20, color: C.ink, fontFamily: FONT.serif, fontWeight: 600 });
  labelB.moveTo([river.right + 0.24, river.bottom - 0.01, 0]);
  const labelD = new Text({ text: "D", fontSize: 20, color: C.amber, fontFamily: FONT.serif, fontWeight: 600 });
  labelD.moveTo([river.right - 0.28, river.d[1] + 0.24, 0]);

  const [xLabel, restLabel] = await Promise.all([
    tex("x", { size: 24, color: C.teal }),
    tex("8-x", { size: 22, color: C.amber }),
  ]);
  xLabel.moveTo([river.right - 0.38, (river.top + river.d[1]) / 2, 0]);
  restLabel.moveTo([river.right - 0.42, (river.d[1] + river.bottom) / 2, 0]);

  return {
    band,
    leftBank,
    rightBank,
    flow,
    boatPath,
    runPath,
    acDimension,
    acLabel,
    cbDimension,
    cbLabel,
    points: [pointA, pointC, pointB, pointD],
    labels: [labelA, labelC, labelB, labelD],
    lengths: [xLabel, restLabel],
    async reveal(scene) {
      await scene.play(new FadeIn(band, { duration: 0.45 }), new Create(leftBank), new Create(rightBank));
      await scene.play(...flow.map((line) => new FadeIn(line, { duration: 0.25 })));
      await scene.play(new Create(boatPath, { duration: 0.65 }));
      await scene.play(new Create(runPath, { duration: 0.55 }));
      await scene.play(...this.points.map((point) => new FadeIn(point, { duration: 0.18 })));
      await scene.play(...this.labels.map((label) => new FadeIn(label, { duration: 0.2 })));
      await scene.play(
        new Create(acDimension, { duration: 0.35 }),
        new Create(cbDimension, { duration: 0.35 }),
        new FadeIn(acLabel, { duration: 0.25 }),
        new FadeIn(cbLabel, { duration: 0.25 }),
      );
      await scene.play(new FadeIn(xLabel, { duration: 0.25 }), new FadeIn(restLabel, { duration: 0.25 }));
    },
  };
}

export async function buildTriangleDiagram(center = [3.05, 0.55, 0]) {
  const a = [-2.2, 1.15, 0];
  const c = [1.4, 1.15, 0];
  const d = [1.4, -1.0, 0];

  const acSide = new Line({ start: a, end: c, color: C.muted, strokeWidth: 3 });
  const cdSide = new Line({ start: c, end: d, color: C.amber, strokeWidth: 3 });
  const adSide = new Line({ start: a, end: d, color: C.teal, strokeWidth: 4 });

  const pointA = new Dot({ point: a, radius: 0.06, color: C.ink });
  const pointC = new Dot({ point: c, radius: 0.06, color: C.ink });
  const pointD = new Dot({ point: d, radius: 0.08, color: C.amber });

  const labelA = new Text({ text: "A", fontSize: 19, color: C.ink, fontFamily: FONT.serif, fontWeight: 600 });
  labelA.moveTo([a[0] - 0.2, a[1] + 0.16, 0]);
  const labelC = new Text({ text: "C", fontSize: 19, color: C.ink, fontFamily: FONT.serif, fontWeight: 600 });
  labelC.moveTo([c[0] + 0.19, c[1] + 0.16, 0]);
  const labelD = new Text({ text: "D", fontSize: 19, color: C.amber, fontFamily: FONT.serif, fontWeight: 600 });
  labelD.moveTo([d[0] + 0.2, d[1] - 0.18, 0]);

  const acLabel = new Text({ text: "AC = 3 km", fontSize: 14, color: C.muted, fontFamily: FONT.sans });
  acLabel.moveTo([(a[0] + c[0]) / 2, a[1] + 0.3, 0]);
  const cdLabel = await tex("x", { size: 24, color: C.amber });
  cdLabel.moveTo([c[0] + 0.28, (c[1] + d[1]) / 2 + 0.06, 0]);
  const adLabel = await tex("\\sqrt{x^2+9}", { size: 23, color: C.teal });
  adLabel.moveTo([-1.3, -0.15, 0]);

  const rightAngle = new Square({
    sideLength: 0.22,
    color: C.muted,
    strokeWidth: 1.2,
  });
  rightAngle.moveTo([c[0] - 0.11, c[1] - 0.11, 0]);

  const group = new Group(
    acSide,
    cdSide,
    adSide,
    pointA,
    pointC,
    pointD,
    labelA,
    labelC,
    labelD,
    acLabel,
    cdLabel,
    adLabel,
    rightAngle,
  );
  for (const child of group) {
    child.shift(center);
  }

  return {
    group,
    async reveal(scene) {
      await scene.play(new Create(acSide, { duration: 0.4 }), new Create(cdSide, { duration: 0.4 }));
      await scene.play(new Create(adSide, { duration: 0.5 }));
      await scene.play(
        new FadeIn(pointA, { duration: 0.18 }),
        new FadeIn(pointC, { duration: 0.18 }),
        new FadeIn(pointD, { duration: 0.18 }),
        new FadeIn(labelA, { duration: 0.2 }),
        new FadeIn(labelC, { duration: 0.2 }),
        new FadeIn(labelD, { duration: 0.2 }),
        new FadeIn(rightAngle, { duration: 0.2 }),
      );
      await scene.play(
        new FadeIn(acLabel, { duration: 0.25 }),
        new FadeIn(cdLabel, { duration: 0.25 }),
        new FadeIn(adLabel, { duration: 0.25 }),
      );
    },
  };
}

/**
 * The river from slide 3, redrawn at a smaller scale, with the right triangle
 * ACD overlaid on the exact same banks. This keeps the abstract geometry tied
 * to the physical picture.
 */
export async function buildRiverTriangleModel(center = [3.18, 0.3, 0], scale = 0.9) {
  const P = (x, y) => [center[0] + x * scale, center[1] + y * scale, 0];
  const left = -1.25;
  const right = 1.05;
  const top = 1.55;
  const bottom = -1.85;
  const dY = 0.05;
  const a = P(left, top);
  const c = P(right, top);
  const d = P(right, dY);
  const b = P(right, bottom);

  const band = new Rectangle({
    width: (right - left) * scale,
    height: (top - bottom) * scale,
    color: C.teal,
    strokeWidth: 0,
    fillOpacity: 0,
  });
  band.setFill(C.teal, 0.08);
  band.moveTo(P((left + right) / 2, (top + bottom) / 2));

  const leftBank = new Line({ start: P(left, bottom), end: P(left, top), color: "rgba(226,232,240,0.62)", strokeWidth: 2 });
  const rightBank = new Line({ start: P(right, bottom), end: P(right, top), color: "rgba(226,232,240,0.62)", strokeWidth: 2 });

  const flow = [-0.78, -0.32, 0.14, 0.6].map(
    (x) =>
      new DashedLine({
        start: P(x, bottom + 0.22),
        end: P(x, top - 0.22),
        color: C.blue,
        strokeWidth: 1,
        dashLength: 0.13,
        dashRatio: 0.45,
      }),
  );
  flow.forEach((line) => line.setStrokeOpacity(0.15));

  const triangleFill = new Polygon({
    vertices: [a, c, d],
    color: C.teal,
    strokeWidth: 0,
    fillOpacity: 0.16,
  });

  const acSide = new Line({ start: a, end: c, color: C.muted, strokeWidth: 3 });
  const cdSide = new Line({ start: c, end: d, color: C.amber, strokeWidth: 4 });
  const adSide = new Line({ start: a, end: d, color: C.teal, strokeWidth: 4 });
  const runPath = new DashedLine({
    start: d,
    end: b,
    color: C.amber,
    strokeWidth: 2,
    dashLength: 0.12,
    dashRatio: 0.5,
  });

  const acDimension = dimensionLine(P(left, top + 0.28), P(right, top + 0.28), C.muted, 1.2);
  const cbDimension = dimensionLine(P(right + 0.48, top), P(right + 0.48, bottom), C.muted, 1.2);
  const acLabel = new Text({ text: "3 km", fontSize: 13, color: C.muted, fontFamily: FONT.sans });
  acLabel.moveTo(P((left + right) / 2, top + 0.5));
  const cbLabel = new Text({ text: "8 km", fontSize: 13, color: C.muted, fontFamily: FONT.sans });
  cbLabel.moveTo(P(right + 0.76, (top + bottom) / 2));

  const points = [
    new Dot({ point: a, radius: 0.055, color: C.ink }),
    new Dot({ point: c, radius: 0.055, color: C.ink }),
    new Dot({ point: d, radius: 0.085, color: C.amber }),
    new Dot({ point: b, radius: 0.055, color: C.ink }),
  ];

  const labelA = new Text({ text: "A", fontSize: 17, color: C.ink, fontFamily: FONT.serif, fontWeight: 600 });
  labelA.moveTo(P(left - 0.18, top + 0.14));
  const labelC = new Text({ text: "C", fontSize: 17, color: C.ink, fontFamily: FONT.serif, fontWeight: 600 });
  labelC.moveTo(P(right + 0.17, top + 0.14));
  const labelD = new Text({ text: "D", fontSize: 17, color: C.amber, fontFamily: FONT.serif, fontWeight: 600 });
  labelD.moveTo(P(right + 0.2, dY + 0.17));
  const labelB = new Text({ text: "B", fontSize: 17, color: C.ink, fontFamily: FONT.serif, fontWeight: 600 });
  labelB.moveTo(P(right + 0.2, bottom - 0.02));

  const xLabel = await tex("x", { size: 21, color: C.amber });
  xLabel.moveTo(P(right + 0.28, (top + dY) / 2));
  const restLabel = await tex("8-x", { size: 18, color: C.amber });
  restLabel.moveTo(P(right + 0.3, (dY + bottom) / 2 - 0.05));
  const adLabel = await tex("\\sqrt{x^2+9}", { size: 20, color: C.teal });
  adLabel.moveTo(P(-0.68, 0.33));

  const rightAngle = new Square({ sideLength: 0.18 * scale, color: C.muted, strokeWidth: 1.1 });
  rightAngle.moveTo([c[0] - 0.09 * scale, c[1] - 0.09 * scale, 0]);

  return {
    async reveal(scene) {
      await scene.play(
        new FadeIn(band, { duration: 0.45 }),
        new Create(leftBank, { duration: 0.4 }),
        new Create(rightBank, { duration: 0.4 }),
      );
      await scene.play(...flow.map((line) => new FadeIn(line, { duration: 0.22 })));
      await scene.play(
        new FadeIn(triangleFill, { duration: 0.4 }),
        new Create(acSide, { duration: 0.35 }),
        new Create(cdSide, { duration: 0.45 }),
        new Create(adSide, { duration: 0.5 }),
        new Create(runPath, { duration: 0.35 }),
      );
      await scene.play(
        ...points.map((point) => new FadeIn(point, { duration: 0.18 })),
        new FadeIn(labelA, { duration: 0.2 }),
        new FadeIn(labelC, { duration: 0.2 }),
        new FadeIn(labelD, { duration: 0.2 }),
        new FadeIn(labelB, { duration: 0.2 }),
        new FadeIn(rightAngle, { duration: 0.2 }),
      );
      await scene.play(
        new Create(acDimension, { duration: 0.35 }),
        new Create(cbDimension, { duration: 0.35 }),
        new FadeIn(acLabel, { duration: 0.25 }),
        new FadeIn(cbLabel, { duration: 0.25 }),
      );
      await scene.play(
        new FadeIn(xLabel, { duration: 0.22 }),
        new FadeIn(restLabel, { duration: 0.22 }),
        new FadeIn(adLabel, { duration: 0.25 }),
      );
    },
  };
}

export function wireDiagram() {
  const startX = 0.95;
  const cutX = 3.55;
  const endX = 5.8;
  const wireY = 1.78;

  const wire = new Line({
    start: [startX, wireY, 0],
    end: [endX, wireY, 0],
    color: "#cbd5e1",
    strokeWidth: 6,
  });
  const cut = new Line({
    start: [cutX, wireY - 0.22, 0],
    end: [cutX, wireY + 0.22, 0],
    color: C.amber,
    strokeWidth: 3,
  });
  const cutLabel = new Text({
    text: "cắt",
    fontSize: 14,
    color: C.amber,
    fontFamily: FONT.sans,
    fontWeight: 600,
  });
  cutLabel.moveTo([cutX, wireY + 0.48, 0]);

  const xSegment = dimensionLine(
    [startX, wireY - 0.36, 0],
    [cutX, wireY - 0.36, 0],
    C.teal,
    2,
  );
  const restSegment = dimensionLine(
    [cutX, wireY - 0.36, 0],
    [endX, wireY - 0.36, 0],
    C.violet,
    2,
  );

  const xLabel = new Text({ text: "x", fontSize: 20, color: C.teal, fontFamily: FONT.serif });
  xLabel.moveTo([(startX + cutX) / 2, wireY - 0.72, 0]);
  const restLabel = new Text({ text: "60 − x", fontSize: 20, color: C.violet, fontFamily: FONT.serif });
  restLabel.moveTo([(cutX + endX) / 2, wireY - 0.72, 0]);

  const square = new Square({
    sideLength: 1.35,
    color: C.teal,
    strokeWidth: 2,
  });
  square.setFill(C.teal, 0.08);

  const circle = new Circle({
    radius: 0.72,
    color: C.violet,
    strokeWidth: 2,
  });
  circle.setFill(C.violet, 0.08);

  const squareLabel = new Text({
    text: "hình vuông",
    fontSize: 15,
    color: C.muted,
    fontFamily: FONT.sans,
  });
  const circleLabel = new Text({
    text: "hình tròn",
    fontSize: 15,
    color: C.muted,
    fontFamily: FONT.sans,
  });

  return {
    build(center = [3.38, -0.72, 0]) {
      wire.moveTo([(startX + endX) / 2, wireY, 0]);
      square.moveTo([2.25, -0.9, 0]);
      circle.moveTo([4.65, -0.9, 0]);
      squareLabel.moveTo([2.25, -1.85, 0]);
      circleLabel.moveTo([4.65, -1.9, 0]);

      const squareSide = new Text({
        text: "x/4",
        fontSize: 18,
        color: C.tealSoft,
        fontFamily: FONT.serif,
      });
      squareSide.moveTo([2.25, -0.9, 0]);

      const radiusLine = new Line({
        start: [4.65, -0.9, 0],
        end: [5.37, -0.9, 0],
        color: C.violetSoft,
        strokeWidth: 1.5,
      });
      const radiusLabel = new Text({
        text: "r",
        fontSize: 16,
        color: C.violetSoft,
        fontFamily: FONT.serif,
        fontStyle: "italic",
      });
      radiusLabel.moveTo([5.02, -0.68, 0]);

      return {
        wire,
        cut,
        cutLabel,
        xSegment,
        restSegment,
        xLabel,
        restLabel,
        square,
        circle,
        squareLabel,
        circleLabel,
        squareSide,
        radiusLine,
        radiusLabel,
        async reveal(scene) {
          await scene.play(new Create(wire, { duration: 0.6 }));
          await scene.play(new Create(cut, { duration: 0.3 }), new FadeIn(cutLabel, { duration: 0.25 }));
          await scene.play(
            new Create(xSegment, { duration: 0.4 }),
            new Create(restSegment, { duration: 0.4 }),
            new FadeIn(xLabel, { duration: 0.25 }),
            new FadeIn(restLabel, { duration: 0.25 }),
          );
          await scene.play(
            new Create(square, { duration: 0.5 }),
            new Create(circle, { duration: 0.5 }),
            new FadeIn(squareLabel, { duration: 0.25 }),
            new FadeIn(circleLabel, { duration: 0.25 }),
          );
          await scene.play(
            new FadeIn(squareSide, { duration: 0.25 }),
            new Create(radiusLine, { duration: 0.3 }),
            new FadeIn(radiusLabel, { duration: 0.25 }),
          );
        },
      };
    },
  };
}
