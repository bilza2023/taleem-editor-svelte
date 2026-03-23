<script>
  import Editor from './editor/Editor.svelte';

  import equationDeck from '../public/equation-demo.json';
  // import goldDeck from '../public/gold.json';

  let deck = equationDeck;

  // 🔥 single source of time
  let currentTime = 0;
</script>

<div class="app">

  <!-- TIME CONTROL (ONLY HERE) -->
  <div class="time-bar">
    <span>⏱ Time:</span>

    <input type="number" bind:value={currentTime} />

    <button on:click={() => currentTime += 1}>➕</button>
    <button on:click={() => currentTime -= 1}>➖</button>
  </div>

  <Editor bind:deck={deck} {currentTime} />

</div>

<style>
  .app {
    background: #111;
    color: #eee;
    min-height: 100vh;
    font-family: system-ui;
  }

  .time-bar {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #333;
    background: #1a1a1a;
  }

  input {
    width: 80px;
    background: #000;
    color: #fff;
    border: 1px solid #333;
    padding: 4px;
  }

  button {
    background: #222;
    color: #fff;
    border: 1px solid #444;
    padding: 4px 10px;
    cursor: pointer;
  }

  button:hover {
    background: #333;
  }
</style>