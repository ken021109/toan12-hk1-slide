import { FadeOut, Scene } from "manim-web";
import { C } from "./theme.js";

export class Deck {
  constructor({ container, slides }) {
    this.container = container;
    this.slides = slides;
    this.index = -1;
    this.busy = false;
    this.queued = null;
    this.started = false;

    this.scene = new Scene(container, {
      frameWidth: 14,
      frameHeight: 8,
      backgroundColor: C.bg,
      backgroundOpacity: 0,
      autoResize: true,
    });

    this.loading = document.getElementById("loading");
    this.errorBox = document.getElementById("error");
    this.errorMessage = document.getElementById("error-message");
    this.counter = document.getElementById("counter");
    this.progress = document.querySelector(".progress");
    this.progressFill = document.getElementById("progress-fill");
    this.hint = document.getElementById("hint");

    this.bindControls();
    this.ready = this.start();
  }

  async start() {
    try {
      await document.fonts.ready;
      await this.goTo(0, { initial: true, direction: 1 });
      this.started = true;
      setTimeout(() => this.hint?.classList.add("is-visible"), 1300);
    } catch (error) {
      this.fail(error);
    }
  }

  bindControls() {
    document.getElementById("prev")?.addEventListener("click", () => this.prev());
    document.getElementById("next")?.addEventListener("click", () => this.next());
    document.getElementById("fullscreen")?.addEventListener("click", () => this.toggleFullscreen());

    window.addEventListener("keydown", (event) => {
      const target = event.target;
      const onButton = target instanceof HTMLElement && target.closest("button");

      if (event.key === "ArrowRight" || event.key === "PageDown" || (event.key === " " && !onButton)) {
        event.preventDefault();
        this.next();
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        this.prev();
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        this.goTo(0, { direction: -1 });
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        this.goTo(this.slides.length - 1, { direction: 1 });
        return;
      }
      if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        this.toggleFullscreen();
      }
    });

    let touchStartX = null;
    this.container.addEventListener(
      "pointerdown",
      (event) => {
        if (event.pointerType === "mouse") return;
        touchStartX = event.clientX;
      },
      { passive: true },
    );
    this.container.addEventListener(
      "pointerup",
      (event) => {
        if (touchStartX === null) return;
        const delta = event.clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(delta) < 45) return;
        if (delta < 0) this.next();
        else this.prev();
      },
      { passive: true },
    );
  }

  next() {
    this.goTo(this.index + 1, { direction: 1 });
  }

  prev() {
    this.goTo(this.index - 1, { direction: -1 });
  }

  async toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Fullscreen may be blocked by the embedding context.
    }
  }

  async fadeOut(direction) {
    const roots = [...this.scene.mobjects];
    if (roots.length === 0) return;
    await this.scene.play(
      ...roots.map(
        (root) =>
          new FadeOut(root, {
            duration: 0.28,
            shift: [direction > 0 ? -0.35 : 0.35, 0, 0],
          }),
      ),
    );
    this.scene.clear();
  }

  async goTo(index, options = {}) {
    if (index < 0 || index >= this.slides.length) return;
    if (this.busy) {
      this.queued = { index, direction: options.direction ?? 1 };
      return;
    }
    if (index === this.index && !options.initial) return;

    this.busy = true;
    const direction = options.direction ?? 1;
    try {
      if (!options.initial && this.index >= 0) {
        await this.fadeOut(direction);
      }

      this.index = index;
      this.applySlideMeta(index);
      await this.slides[index].build(this.scene, {
        index,
        total: this.slides.length,
      });

      if (this.loading) this.loading.classList.add("is-hidden");
      this.hint?.classList.remove("is-visible");
    } catch (error) {
      this.fail(error);
    } finally {
      this.busy = false;
      if (this.queued) {
        const queued = this.queued;
        this.queued = null;
        if (queued.index !== this.index) {
          await this.goTo(queued.index, { direction: queued.direction });
        }
      }
    }
  }

  applySlideMeta(index) {
    const slide = this.slides[index];
    const accent = slide.accent ?? C.teal;
    const current = String(index + 1).padStart(2, "0");
    const total = String(this.slides.length).padStart(2, "0");

    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.setProperty("--accent-soft", `${accent}22`);
    if (this.counter) this.counter.innerHTML = `<strong>${current}</strong> / ${total}`;
    if (this.progress) {
      this.progress.setAttribute("aria-valuenow", String(Math.round(((index + 1) / this.slides.length) * 100)));
    }
    if (this.progressFill) {
      this.progressFill.style.width = `${((index + 1) / this.slides.length) * 100}%`;
    }
    document.title = `${slide.title} — Toán 12`;
  }

  fail(error) {
    console.error(error);
    if (this.loading) this.loading.classList.add("is-hidden");
    if (this.errorBox) this.errorBox.hidden = false;
    if (this.errorMessage) this.errorMessage.textContent = String(error?.stack ?? error);
  }
}
