import Editor from "./editor/Editor.svelte";

function mount() {
  const el = document.getElementById("editor-root");

  if (!el) {
    console.error("editor-root missing");
    return;
  }

  const raw = window.__DECK__;

  const safeDeck = {
    deck: Array.isArray(raw?.deck) ? raw.deck : []
  };
  new Editor({
    target: el,
    props: {
      deck: safeDeck
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}