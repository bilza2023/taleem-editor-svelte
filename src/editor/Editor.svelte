<script>
  import Nav from './Nav.svelte';
  import { EditorRegistry } from "./js/editorRegistry.js";
  import TitleAndSubtitleEditor from './components/TitleAndSubtitleEditor.svelte';
  import EqEditor from './components/EqEditor.svelte';
  import { slideFactory } from './js/slideFactory';

  export let deck = null;
  export let currentTime = 0;

  $: slides = deck?.deck || [];

  ///////////////////////////////////////////
  function addSlide(type) {
  const fn = slideFactory[type];
  if (!fn) return;

  const newSlide = fn();
  deck.deck = [...deck.deck, newSlide];
}
  ///////////////////////////////////////////
  // ---- UI STATE ----
  let collapsed = {};
  let allCollapsed = false;

  // ---- FOLD ----
  function toggleSlide(i) {
    collapsed[i] = !collapsed[i];
    collapsed = { ...collapsed };
  }

  function toggleAll() {
    allCollapsed = !allCollapsed;

    const newState = {};
    slides.forEach((_, i) => {
      newState[i] = allCollapsed;
    });

    collapsed = newState;
  }

  // ---- MOVE ----
  function moveUp(i) {
    if (i === 0) return;

    const arr = deck.deck;

    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];

    deck.deck = [...arr]; // 🔥 trigger
  }

  function moveDown(i) {
    const arr = deck.deck;

    if (i === arr.length - 1) return;

    [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];

    deck.deck = [...arr]; // 🔥 trigger
  }

  // ---- DELETE ----
  function deleteSlide(i) {
    const arr = deck.deck;

    arr.splice(i, 1);

    deck.deck = [...arr]; // 🔥

    // fix collapsed map
    const newCollapsed = {};
    arr.forEach((_, idx) => {
      newCollapsed[idx] = collapsed[idx] || false;
    });

    collapsed = newCollapsed;
  }
</script>

<div class="editor">
  <!-- NAV -->
  <Nav on:addSlide={(e) => addSlide(e.detail.type)} />

  {#if slides.length === 0}
    <p class="empty">No slides</p>
  {/if}
  {#each slides as slide, i}
    <div class="slide">

      <!-- HEADER -->
      <div class="slide-header">

        <div class="left">
          <button on:click={() => toggleSlide(i)}>
            {collapsed[i] ? '▶' : '▼'}
          </button>

          <span>#{i + 1} — {slide.type}</span>
        </div>

        <div class="right">
          <button on:click={() => moveUp(i)}>⬆</button>
          <button on:click={() => moveDown(i)}>⬇</button>
          <button on:click={() => deleteSlide(i)}>🗑</button>
        </div>

      </div>

      <!-- BODY -->
      {#if !collapsed[i]}
        <div class="slide-body">

          {#if EditorRegistry[slide.type]}
            <svelte:component
              this={EditorRegistry[slide.type]}
              {slide}
              {currentTime}
            />
          {:else}
            <div class="fallback">
              Unknown type: {slide.type}
            </div>
          {/if}

        </div>
      {/if}

    </div>
  {/each}
</div>  

<style>
  .editor {
    padding: 20px;
  }

  .empty {
    color: #777;
  }

  .slide {
    border: 1px solid #333;
    margin-bottom: 14px;
    border-radius: 6px;
    overflow: hidden;
    background: #1a1a1a;
  }

  .slide-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0f172a;
    padding: 6px 10px;
    border-bottom: 1px solid #333;
  }

  .slide-header .left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .slide-header .right {
    display: flex;
    gap: 6px;
  }

  .slide-body {
    padding: 10px;
  }

  button {
    background: #1e293b;
    border: 1px solid #334155;
    color: #fff;
    padding: 4px 6px;
    cursor: pointer;
  }

  button:hover {
    background: #334155;
  }

  .fallback {
    color: #777;
    font-size: 13px;
  }
</style>