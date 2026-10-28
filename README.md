# Slide: Tối ưu hóa bằng đạo hàm

Bộ slide web cho hai bài toán trong [`bai-toan/loi-giai.md`](bai-toan/loi-giai.md),
dựng hoàn toàn bằng **manim-web** (WebGL + KaTeX) và chia thành nhiều module nhỏ.

## Chạy slide

Không cần cài đặt hay build. Chỉ cần một static server và một trình duyệt hiện đại
(có WebGL). Trang nạp `manim-web@0.40.1` từ jsDelivr, nên cần kết nối Internet ở
lần tải đầu.

Từ thư mục gốc của repo:

```bash
python3 -m http.server 8000
```

Mở <http://localhost:8000/>.

> Không mở trực tiếp `index.html` bằng `file://`: ES module, import map và
> tài nguyên CDN cần một HTTP origin.

## Điều khiển

| Thao tác | Chức năng |
| --- | --- |
| `→`, `PageDown`, `Space` | Slide tiếp theo |
| `←`, `PageUp` | Slide trước |
| `Home` / `End` | Slide đầu / cuối |
| `F` | Bật / tắt toàn màn hình |
| Vuốt ngang trên thiết bị cảm ứng | Chuyển slide |
| Nút `‹` `›` trên thanh dưới | Chuyển slide |
| Nút góc phải thanh dưới | Toàn màn hình |

## Nội dung

1. **Tối ưu hóa bằng đạo hàm** — tiêu đề.
2. **Hai bài toán, một ý tưởng** — lộ trình và hai hàm mục tiêu.
3. **Quy trình giải bài toán tối ưu** — bốn bước chung.
4. **Bài 1 · Đề bài** — sông rộng 3 km, bờ 8 km, vận tốc 6 và 8 km/h.
5. **Bài 1 · Mô hình hóa** — sơ đồ sông có tam giác \(ACD\) phủ lên, hàm `T(x)`.
6. **Bài 1 · Giải T′(x) = 0** — biến đổi phương trình, tìm \(x_0\), xét dấu.
7. **Bài 1 · Bảng biến thiên** — giá trị tại hai đầu mút và tại \(x_0\).
8. **Bài 1 · Kết quả** — `CD = 9/√7 ≈ 3,40 km`, `T_min ≈ 1,3307 h`, đồ thị.
9. **Bài 2 · Đề bài** — chia sợi dây 60 cm.
10. **Bài 2 · Mô hình hóa** — diện tích hình vuông và hình tròn, hàm `S(x)`.
11. **Bài 2 · Giải S′(x) = 0** — biến đổi phương trình, tìm \(x_0\), xét dấu.
12. **Bài 2 · Bảng biến thiên** — giá trị tại hai đầu mút và tại \(x_0\).
13. **Bài 2 · Kết quả** — `x ≈ 33,61 cm`, `S_min ≈ 126,02 cm²`, đồ thị.
14. **Tổng kết** — so sánh hai kết quả và quy trình chung.
15. **Mở trên web** — mã QR, liên kết trực tiếp và nút sao chép địa chỉ
    <https://ken021109.github.io/toan12-hk1-slide/>.

## Cấu trúc

```text
.
├── index.html                 # khung trang, import map, HUD
├── styles.css                 # theme, stage 16:9, thanh điều hướng
├── favicon.svg
├── assets/
│   └── slide-qr.png           # mã QR trỏ tới bản GitHub Pages
├── README.md
└── js/
    ├── main.js                # điểm vào
    ├── deck.js                # điều khiển slide, chuyển cảnh, bàn phím
    ├── theme.js               # màu, font, kích thước frame
    ├── components/
    │   ├── ui.js              # Text/MathTex, header, panel, bullet
    │   ├── diagrams.js        # sơ đồ sông, tam giác phủ, sợi dây
    │   ├── plots.js           # đồ thị T(x), S(x) có điểm chạy
    │   └── variation-table.js # bảng biến thiên kiểu Việt Nam
    └── slides/
        ├── index.js           # đăng ký 15 slide
        ├── 01-title.js
        ├── 02-overview.js
        ├── 03-method.js
        ├── 04-bai1-de.js
        ├── 05-bai1-mo-hinh.js
        ├── 06-bai1-dao-ham.js
        ├── 07-bai1-bang-bien-thien.js
        ├── 08-bai1-ket-qua.js
        ├── 09-bai2-de.js
        ├── 10-bai2-mo-hinh.js
        ├── 11-bai2-dao-ham.js
        ├── 12-bai2-bang-bien-thien.js
        ├── 13-bai2-ket-qua.js
        ├── 14-tong-ket.js
        └── 15-link.js
```

## Thêm hoặc sửa slide

Mỗi slide là một module mặc định export:

```js
export default {
  id: "ten-slide",
  title: "Tiêu đề trên tab",
  accent: C.teal,
  async build(scene, meta) {
    // meta.index và meta.total được Deck truyền vào
  },
};
```

Sau đó import và thêm vào mảng trong `js/slides/index.js`. Số trang trên header
tự lấy từ `meta`, nên không cần sửa thủ công khi thêm slide.

Các hàm dựng sẵn:

- `makeHeader`, `revealHeader` — header thống nhất.
- `panel`, `bullet`, `text`, `tex` — khối nội dung và công thức.
- `buildRiverDiagram`, `buildRiverTriangleModel`, `buildTriangleDiagram`, `wireDiagram` — hình minh họa.
- `buildTGraph`, `revealTGraph`, `buildSGraph`, `revealSGraph` — đồ thị.
- `buildVariationTable` — bảng biến thiên; dùng `table.moveBy(dx, dy)` để đặt vị trí.

Slide cuối dùng thêm một thanh HTML phủ trên canvas (`#slide-actions`) cho liên kết
thật và nút **Sao chép**. Thanh này chỉ hiện khi slide có `id: "link"`; nút dùng
Clipboard API và có phương án dự phòng bằng `execCommand("copy")`.

Lưu ý: `MathTex` cần `await waitForRender()` (đã bọc trong `tex()`), còn
`scene.play()` và `scene.wait()` là bất đồng bộ nên phải `await`.
