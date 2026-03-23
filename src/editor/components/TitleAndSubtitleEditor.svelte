<!-- src/editor/components/TitleAndSubtitleEditor.svelte -->

<script>
  export let slide;

  // safe access
  $: items = slide.data || [];

  $: titleItem = items.find(d => d.name === "title");
  $: subtitleItem = items.find(d => d.name === "subtitle");

  function update() {
    // trigger Svelte reactivity
    slide.data = [...items];
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

  input:focus {
    outline: none;
    border-color: #555;
  }
</style>

<div class="slide-editor">

  <!-- Title (required) -->
  <input
    placeholder="Enter title (required)"
    bind:value={titleItem.content}
    on:input={update}
  />

  <!-- Subtitle (optional) -->
  <input
    placeholder="Enter subtitle (optional)"
    bind:value={subtitleItem.content}
    on:input={update}
  />

</div>