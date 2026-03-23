<script>
    export let allCollapsed = false;
    export let onToggleAll;
  </script>
  
  <div class="nav">
    <button on:click={onToggleAll}>
      {allCollapsed ? '▢ Unfold All' : '▣ Fold All'}
    </button>
  </div>
  
  <style>
    .nav {
      display: flex;
      gap: 10px;
      padding: 10px;
      border-bottom: 1px solid #333;
      background: #1a1a1a;
    }
  
    button {
      background: #222;
      color: #fff;
      border: 1px solid #444;
      padding: 6px 12px;
      cursor: pointer;
    }
  
    button:hover {
      background: #333;
    }
  </style>