<!-- src/editor/components/BulletListEditor.svelte -->

<script>
    export let slide;
  
    $: items = slide.data || [];
  
    // separate heading + bullets
    $: headingItem = items.find(d => d.name === "heading");
    $: bullets = items.filter(d => d.name === "bullet");
  
    function update() {
      slide.data = [...items];
    }
  
    function addBullet() {
      items.push({ name: "bullet", content: "" });
      slide.data = [...items];
    }
  
    function deleteBullet(i) {
      if (bullets.length <= 1) return; // enforce ≥1 bullet
  
      const index = items.findIndex(
        (d, idx) => d.name === "bullet" && bullets[i] === d
      );
  
      if (index !== -1) {
        items.splice(index, 1);
        slide.data = [...items];
      }
    }
  </script>
  
  <style>
    .slide-editor {
      padding: 16px;
      border-bottom: 1px solid #222;
    }
  
    input {
      display: block;
      width: 100%;
      margin-bottom: 10px;
      padding: 10px;
      background: #111;
      border: 1px solid #333;
      color: #fff;
      border-radius: 6px;
      font-size: 14px;
    }
  
    .bullet-row {
      display: flex;
      gap: 6px;
      margin-bottom: 6px;
    }
  
    .bullet-row input {
      flex: 1;
      margin-bottom: 0;
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
  
    .add-btn {
      margin-top: 6px;
    }
  </style>
  
  <div class="slide-editor">
  
    <!-- Heading (optional) -->
    <input
      placeholder="Enter heading (optional)"
      bind:value={headingItem.content}
      on:input={update}
    />
  
    <!-- Bullets -->
    {#each bullets as b, i}
      <div class="bullet-row">
        <input
          placeholder={`Bullet ${i + 1}`}
          bind:value={b.content}
          on:input={update}
        />
  
        <button on:click={() => deleteBullet(i)}>✖</button>
      </div>
    {/each}
  
    <!-- Add -->
    <button class="add-btn" on:click={addBullet}>
      + Add Bullet
    </button>
  
  </div>