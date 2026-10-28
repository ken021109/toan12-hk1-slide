import { FadeIn, ImageMobject, Line, RoundedRectangle } from "manim-web";
import { C, FONT } from "../theme.js";
import {
  bullet,
  makeHeader,
  placeLeft,
  revealHeader,
  text,
} from "../components/ui.js";

export default {
  id: "link",
  title: "Mở bộ slide trên web",
  accent: C.teal,
  async build(scene, meta) {
    const header = makeHeader({
      kicker: "Mở trên web",
      title: "Mở bộ slide này",
      accent: C.teal,
      index: meta.index,
      total: meta.total,
    });
    await revealHeader(scene, header);

    const qrFrame = new RoundedRectangle({
      width: 2.98,
      height: 2.98,
      cornerRadius: 0.19,
      color: C.teal,
      strokeWidth: 1.4,
      fillOpacity: 0,
    });
    qrFrame.moveTo([-3.15, 0.2, 0]);

    const qrImage = new ImageMobject({
      source: "./assets/slide-qr.png",
      width: 2.86,
      height: 2.86,
    });
    qrImage.moveTo([-3.15, 0.2, 0]);
    await qrImage.waitForLoad();

    const qrKicker = text("QUÉT MÃ QR", {
      size: 11,
      color: C.teal,
      weight: 600,
      letterSpacing: 2,
    });
    qrKicker.moveTo([-3.15, 1.95, 0]);

    const qrCaption = text("Mở trên điện thoại", {
      size: 13,
      color: C.muted,
    });
    qrCaption.moveTo([-3.15, -1.62, 0]);

    const divider = new Line({
      start: [0.22, 1.55, 0],
      end: [0.22, -1.5, 0],
      color: C.teal,
      strokeWidth: 1,
    });
    divider.setStrokeOpacity(0.28);

    const kicker = text("LIÊN KẾT TRỰC TIẾP", {
      size: 11,
      color: C.teal,
      weight: 600,
      letterSpacing: 2,
    });
    placeLeft(kicker, 0.62, 1.82);

    const heading = text("Mở trên trình duyệt", {
      size: 30,
      color: C.ink,
      font: FONT.serif,
      weight: 600,
    });
    placeLeft(heading, 0.62, 1.34);

    const body = text(
      "Quét mã QR bằng điện thoại, hoặc dùng liên kết\nvà nút sao chép ở thanh bên dưới.",
      { size: 15, color: C.muted, lineHeight: 1.4 },
    );
    placeLeft(body, 0.62, 0.82);

    const bullets = [
      bullet("Chạy trực tiếp trên web, không cần cài đặt", {
        x: 0.55,
        y: 0.12,
        size: 15,
        color: C.teal,
      }),
      bullet("Điều khiển bằng bàn phím hoặc vuốt cảm ứng", {
        x: 0.55,
        y: -0.33,
        size: 15,
        color: C.teal,
      }),
      bullet("Nhấn F để trình chiếu toàn màn hình", {
        x: 0.55,
        y: -0.78,
        size: 15,
        color: C.teal,
      }),
    ];

    const share = text("Dùng nút “Sao chép” để chia sẻ liên kết.", {
      size: 13,
      color: C.amberSoft,
    });
    placeLeft(share, 0.62, -1.38);

    await scene.play(
      new FadeIn(qrKicker, { duration: 0.28 }),
      new FadeIn(qrFrame, { duration: 0.45 }),
      new FadeIn(divider, { duration: 0.35 }),
    );
    await scene.play(new FadeIn(qrImage, { duration: 0.45 }));
    await scene.play(
      new FadeIn(qrCaption, { duration: 0.3 }),
      new FadeIn(kicker, { duration: 0.25 }),
      new FadeIn(heading, { duration: 0.35, shift: [0, -0.08, 0] }),
    );
    await scene.play(
      new FadeIn(body, { duration: 0.35 }),
      ...bullets.map((item) => new FadeIn(item, { duration: 0.3 })),
    );
    await scene.play(new FadeIn(share, { duration: 0.3 }));
  },
};
