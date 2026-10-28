import {
  Axes,
  Circle,
  Create,
  DashedLine,
  Dot,
  FadeIn,
  Group,
  Text,
  ValueTracker,
} from "manim-web";
import { C, FONT } from "../theme.js";
import { placeLeft, placeRight, tex } from "./ui.js";

const T = (x) => Math.sqrt(x * x + 9) / 6 + (8 - x) / 8;
const S = (x) => (x * x) / 16 + (60 - x) ** 2 / (4 * Math.PI);

function makeGraph(options) {
  const axes = new Axes({
    xRange: options.xRange,
    yRange: options.yRange,
    xLength: options.xLength,
    yLength: options.yLength,
    color: C.dim,
    tips: false,
    axisConfig: { strokeWidth: 1.1, tickSize: 0.08 },
    xAxisConfig: {
      includeNumbers: true,
      numbersToInclude: options.xNumbers,
      numberFontSize: 16,
      decimalPlaces: 0,
    },
    yAxisConfig: {
      includeNumbers: true,
      numbersToInclude: options.yNumbers,
      numberFontSize: 15,
      decimalPlaces: options.yDecimals ?? 1,
    },
  });

  // Keep the horizontal axis at the bottom of the plot even when the
  // displayed y-range does not include 0 (the T-graph).
  axes.xAxis.position.y = -options.yLength / 2;
  axes.moveTo(options.center);

  const [x0, x1] = options.xRange;
  const [y0, y1] = options.yRange;
  const core = [options.center[0], options.center[1]];

  const toPoint = (x, y) => [
    core[0] + ((x - x0) / (x1 - x0) - 0.5) * options.xLength,
    core[1] + ((y - y0) / (y1 - y0) - 0.5) * options.yLength,
    0,
  ];

  return {
    axes,
    toPoint,
    leftX: core[0] - options.xLength / 2,
    rightX: core[0] + options.xLength / 2,
    topY: core[1] + options.yLength / 2,
    bottomY: core[1] - options.yLength / 2,
  };
}

export async function buildTGraph(center = [3.35, 0.15, 0]) {
  const graph = makeGraph({
    xRange: [0, 8, 1],
    yRange: [1.2, 1.55, 0.05],
    xLength: 5.1,
    yLength: 3.05,
    center,
    xNumbers: [0, 2, 4, 6, 8],
    yNumbers: [1.2, 1.3, 1.4, 1.5],
    yDecimals: 1,
  });
  const { axes, toPoint } = graph;

  const curve = axes.plot(T, { color: C.teal, strokeWidth: 4 });
  const glow = axes.plot(T, { color: C.teal, strokeWidth: 9 });
  glow.setStrokeOpacity(0.1);

  const xMin = 9 / Math.sqrt(7);
  const yMin = T(xMin);
  const minPoint = toPoint(xMin, yMin);
  const tracker = new ValueTracker(0);
  const dot = new Dot({ point: toPoint(0, T(0)), radius: 0.11, color: C.amber });
  dot.addUpdater(() => dot.moveTo(toPoint(tracker.getValue(), T(tracker.getValue()))));

  const ring = new Circle({
    radius: 0.22,
    color: C.amber,
    strokeWidth: 2,
    fillOpacity: 0,
  });
  ring.moveTo(minPoint);
  ring.setStrokeOpacity(0);

  const vertical = new DashedLine({
    start: toPoint(xMin, 1.2),
    end: minPoint,
    color: C.amber,
    strokeWidth: 1.6,
    dashLength: 0.1,
    dashRatio: 0.55,
  });
  const horizontal = new DashedLine({
    start: toPoint(0, yMin),
    end: minPoint,
    color: C.amber,
    strokeWidth: 1.6,
    dashLength: 0.1,
    dashRatio: 0.55,
  });

  const xLabel = new Text({ text: "x = CD (km)", fontSize: 15, color: C.dim, fontFamily: FONT.sans });
  placeRight(xLabel, graph.rightX, graph.topY + 0.52);

  const yLabel = new Text({ text: "T (giờ)", fontSize: 15, color: C.dim, fontFamily: FONT.sans });
  placeLeft(yLabel, graph.leftX - 0.55, graph.topY + 0.52);

  const minLabel = await tex("T_{\\min}", { size: 24, color: C.amber });
  minLabel.moveTo([minPoint[0] + 0.7, minPoint[1] + 0.48, 0]);

  const curveLabel = await tex("T(x)", { size: 26, color: C.teal });
  curveLabel.moveTo([toPoint(7.55, T(7.55))[0] + 0.08, toPoint(7.55, T(7.55))[1] + 0.38, 0]);

  const group = new Group(axes, glow, curve, xLabel, yLabel);

  return {
    axes,
    curve,
    glow,
    tracker,
    dot,
    ring,
    vertical,
    horizontal,
    minLabel,
    curveLabel,
    group,
    xMin,
    yMin,
  };
}

export async function revealTGraph(scene, graph) {
  scene.add(graph.group);
  await scene.play(new FadeIn(graph.axes, { duration: 0.45 }));
  await scene.play(new Create(graph.glow, { duration: 0.9 }), new Create(graph.curve, { duration: 0.9 }));
  await scene.play(new FadeIn(graph.dot, { duration: 0.25 }), new FadeIn(graph.curveLabel, { duration: 0.3 }));
  await scene.play(graph.tracker.animateTo(graph.xMin, { duration: 1.35 }));
  graph.ring.setStrokeOpacity(1);
  await scene.play(
    new Create(graph.vertical, { duration: 0.35 }),
    new Create(graph.horizontal, { duration: 0.35 }),
    new FadeIn(graph.ring, { duration: 0.3 }),
    new FadeIn(graph.minLabel, { duration: 0.3 }),
  );
}

export async function buildSGraph(center = [3.35, 0.12, 0]) {
  const graph = makeGraph({
    xRange: [0, 60, 10],
    yRange: [0, 300, 50],
    xLength: 5.2,
    yLength: 3.15,
    center,
    xNumbers: [0, 10, 20, 30, 40, 50, 60],
    yNumbers: [0, 50, 100, 150, 200, 250, 300],
    yDecimals: 0,
  });
  const { axes, toPoint } = graph;

  const curve = axes.plot(S, { color: C.violet, strokeWidth: 4 });
  const glow = axes.plot(S, { color: C.violet, strokeWidth: 9 });
  glow.setStrokeOpacity(0.1);

  const xMin = 240 / (Math.PI + 4);
  const yMin = S(xMin);
  const minPoint = toPoint(xMin, yMin);
  const tracker = new ValueTracker(0);
  const dot = new Dot({ point: toPoint(0, S(0)), radius: 0.11, color: C.amber });
  dot.addUpdater(() => dot.moveTo(toPoint(tracker.getValue(), S(tracker.getValue()))));

  const ring = new Circle({
    radius: 0.22,
    color: C.amber,
    strokeWidth: 2,
    fillOpacity: 0,
  });
  ring.moveTo(minPoint);
  ring.setStrokeOpacity(0);

  const vertical = new DashedLine({
    start: toPoint(xMin, 0),
    end: minPoint,
    color: C.amber,
    strokeWidth: 1.6,
    dashLength: 0.1,
    dashRatio: 0.55,
  });
  const horizontal = new DashedLine({
    start: toPoint(0, yMin),
    end: minPoint,
    color: C.amber,
    strokeWidth: 1.6,
    dashLength: 0.1,
    dashRatio: 0.55,
  });

  const xLabel = new Text({ text: "x (cm)", fontSize: 15, color: C.dim, fontFamily: FONT.sans });
  placeRight(xLabel, graph.rightX, graph.topY + 0.52);

  const yLabel = new Text({ text: "S (cm²)", fontSize: 15, color: C.dim, fontFamily: FONT.sans });
  placeLeft(yLabel, graph.leftX - 0.55, graph.topY + 0.52);

  const minLabel = await tex("S_{\\min}", { size: 24, color: C.amber });
  minLabel.moveTo([minPoint[0] + 0.7, minPoint[1] + 0.48, 0]);

  const curveLabel = await tex("S(x)", { size: 26, color: C.violet });
  curveLabel.moveTo([toPoint(50, S(50))[0] + 0.08, toPoint(50, S(50))[1] + 0.38, 0]);

  const group = new Group(axes, glow, curve, xLabel, yLabel);

  return {
    axes,
    curve,
    glow,
    tracker,
    dot,
    ring,
    vertical,
    horizontal,
    minLabel,
    curveLabel,
    group,
    xMin,
    yMin,
  };
}

export async function revealSGraph(scene, graph) {
  scene.add(graph.group);
  await scene.play(new FadeIn(graph.axes, { duration: 0.45 }));
  await scene.play(new Create(graph.glow, { duration: 0.9 }), new Create(graph.curve, { duration: 0.9 }));
  await scene.play(new FadeIn(graph.dot, { duration: 0.25 }), new FadeIn(graph.curveLabel, { duration: 0.3 }));
  await scene.play(graph.tracker.animateTo(graph.xMin, { duration: 1.35 }));
  graph.ring.setStrokeOpacity(1);
  await scene.play(
    new Create(graph.vertical, { duration: 0.35 }),
    new Create(graph.horizontal, { duration: 0.35 }),
    new FadeIn(graph.ring, { duration: 0.3 }),
    new FadeIn(graph.minLabel, { duration: 0.3 }),
  );
}
