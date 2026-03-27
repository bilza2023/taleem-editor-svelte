import { mount } from 'svelte';
import Editor from "./editor/Editor.svelte";

function mountApp() {
  const el = document.getElementById("editor-root");

  const raw = window.__DECK__;

  const safeDeck = {
    deck: Array.isArray(raw?.deck) ? raw.deck : []
  };

  // 🔥 SINGLE SOURCE OF TRUTH (updated deck lives here)
  let currentDeck = safeDeck;

  function handleChange(updated) {
    currentDeck = updated;
    console.log("UPDATED DECK:", currentDeck);
  }

  // 🔥 OPTIONAL: expose globally (for debugging / external use)
  window.__GET_DECK__ = () => currentDeck;

  mount(Editor, {
    target: el,
    props: {
      deck: safeDeck,
      onChange: handleChange
    }
  });
}

mountApp();