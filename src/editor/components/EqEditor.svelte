<script>
  export let slide;
  export let currentTime = 0;

  let activeIndex = 0;

  const lineTypes = ['heading', 'math', 'text'];
  const spTypes = ['spText', 'spImage', 'spMath'];

  $: lines = slide.data || [];
  $: activeLine = lines[activeIndex] || {};
  $: spItems = activeLine.spItems || [];

  // ---- LINE ACTIONS ----

  function addLine(type = 'heading') {
    lines.push({
      name: "line",
      type,
      content: "New " + type,
      showAt: 0,
      spItems: []
    });

    slide.data = [...lines];
    activeIndex = lines.length - 1;
  }

  function deleteLine(i) {
    lines.splice(i, 1);
    slide.data = [...lines];

    if (activeIndex >= lines.length) {
      activeIndex = lines.length - 1;
    }
  }

  function setLineTime(line) {
    line.showAt = currentTime;
    slide.data = [...lines];
  }

  // ---- SP ITEMS ----

  function addSpItem(type = 'spText') {
    if (!activeLine.spItems) {
      activeLine.spItems = [];
    }

    activeLine.spItems.push({
      type,
      content: "New " + type
    });

    slide.data = [...lines];
  }

  function deleteSpItem(i) {
    activeLine.spItems.splice(i, 1);
    slide.data = [...lines];
  }
</script>

<div class="eq-editor">

  <!-- LEFT -->
  <div class="left">

    <ul class="eq-lines">
      {#each lines as line, i}
        <li class="eq-line {i === activeIndex ? 'active' : ''}">

          <div class="content" on:click={() => activeIndex = i}>

            <div class="header">
              <select bind:value={line.type}>
                {#each lineTypes as t}
                  <option value={t}>{t}</option>
                {/each}
              </select>

              <span>⏱ {line.showAt}</span>
            </div>

            <textarea bind:value={line.content}></textarea>

          </div>

          <div class="actions">
            <button class="time" on:click={() => setLineTime(line)}>⏱</button>
            <button class="delete" on:click={() => deleteLine(i)}>🗑</button>
          </div>

        </li>
      {/each}
    </ul>

    <!-- LINE TOOLBAR -->
    <div class="toolbar line-toolbar">
      <button on:click={() => addLine('heading')}>🅣 Heading</button>
      <button on:click={() => addLine('math')}>∑ Math</button>
      <button on:click={() => addLine('text')}>✎ Text</button>
    </div>

  </div>

  <!-- RIGHT -->
  <div class="right">

    <h4>Side Panel</h4>

    {#if spItems.length === 0}
      <div class="empty">No items</div>
    {/if}

    {#each spItems as item, i}
      <div class="sp-item">

        <select bind:value={item.type}>
          {#each spTypes as t}
            <option value={t}>{t}</option>
          {/each}
        </select>

        {#if item.type === 'spImage'}
          <input type="text" bind:value={item.content} />
          <img src={item.content} alt="" />
        {:else}
          <textarea bind:value={item.content}></textarea>
        {/if}

        <button class="delete" on:click={() => deleteSpItem(i)}>🗑</button>

      </div>
    {/each}

    <!-- SP TOOLBAR -->
    <div class="toolbar sp-toolbar">
      <button on:click={() => addSpItem('spText')}>📝 Text</button>
      <button on:click={() => addSpItem('spMath')}>∑ Math</button>
      <button on:click={() => addSpItem('spImage')}>🖼 Image</button>
    </div>

  </div>

</div>

<style>
  .eq-editor {
    display: flex;
    gap: 20px;
  }

  .left {
    width: 60%;
  }

  .right {
    width: 40%;
    border-left: 1px solid #333;
    padding-left: 10px;
  }

  .eq-line {
    border: 1px solid #333;
    padding: 8px;
    margin-bottom: 8px;
  }

  .eq-line.active {
    border-color: #4ade80;
    background: #052e1b;
  }

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #aaa;
    margin-bottom: 5px;
  }

  textarea {
    width: 100%;
    background: #000;
    color: #fff;
    border: 1px solid #333;
  }

  input {
    width: 100%;
    background: #000;
    color: #fff;
    border: 1px solid #333;
  }

  .actions {
    display: flex;
    gap: 6px;
    margin-top: 5px;
  }

  .actions button {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }

  .time {
    background: #1e3a8a;
    color: #93c5fd;
  }

  .delete {
    background: #7f1d1d;
    color: #fca5a5;
  }

  .toolbar {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .toolbar button {
    border: 1px solid #374151;
    padding: 6px 10px;
    cursor: pointer;
    font-size: 13px;
    border-radius: 4px;
  }

  .line-toolbar button {
    background: #1f2937;
    color: #93c5fd;
  }

  .sp-toolbar button {
    background: #1f2937;
    color: #facc15;
  }

  .toolbar button:hover {
    background: #374151;
  }

  .sp-item {
    border: 1px solid #333;
    padding: 6px;
    margin-bottom: 6px;
  }

  img {
    max-width: 100%;
    margin-top: 5px;
  }

  .empty {
    color: #666;
    font-size: 13px;
  }
</style>