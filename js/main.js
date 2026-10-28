import { Deck } from "./deck.js";
import slides from "./slides/index.js";

const container = document.getElementById("stage");

if (!container) {
  throw new Error("Missing #stage container");
}

new Deck({ container, slides });
