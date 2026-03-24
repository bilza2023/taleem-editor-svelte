import { mount } from 'svelte';
import Editor from "./editor/Editor.svelte";

function mountApp() {
  const el = document.getElementById("editor-root");

  const raw = window.__DECK__;

  const safeDeck = {
    deck: Array.isArray(raw?.deck) ? raw.deck : []
  };

  mount(Editor, {
    target: el,
    props: {
      deck: safeDeck
    }
  });
}

mountApp();