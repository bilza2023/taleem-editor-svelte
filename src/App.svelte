<script>
let currentDeck = null;
function handleExport(deck) {
  currentDeck = deck;

  console.log("FINAL EXPORTED DECK:", deck);
}
import Editor from './editor/Editor.svelte';

  import equationDeck from '../public/equation-demo.json';
  // import goldDeck from '../public/gold.json';

  // let deck = equationDeck;
  let deck = {deck:[]};

</script>

<div class="app">

  <!-- <Editor bind:deck={deck}/> -->
  <Editor
  {deck}
  onExport={handleExport}
/>
</div>

<style>
  .app {
    background: #111;
    color: #eee;
    min-height: 100vh;
    font-family: system-ui;
  }

</style>