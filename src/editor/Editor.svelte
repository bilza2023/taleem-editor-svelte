<script>
    import TitleAndSubtitleEditor from './components/TitleAndSubtitleEditor.svelte';
    import EqEditor from './components/EqEditor.svelte';
  
    export let deck = null;
    export let currentTime = 0;
  
    $: slides = deck?.deck || [];
  </script>
  
  <div class="editor">
  
    {#if slides.length === 0}
      <p>No slides</p>
    {/if}
  
    {#each slides as slide, i}
      <div class="slide">
  
        <div class="meta">
          <b>#{i + 1}</b> — {slide.type}
        </div>
  
        {#if slide.type === 'titleAndSubtitle'}
          <TitleAndSubtitleEditor {slide} {currentTime} />
  
        {:else if slide.type === 'eq'}
          <EqEditor {slide} {currentTime} />
  
        {:else}
          <div class="fallback">
            <div>Type: {slide.type}</div>
            <div>Start: {slide.start} | End: {slide.end}</div>
          </div>
        {/if}
  
      </div>
    {/each}
  
  </div>
  
  <style>
    .editor {
      padding: 20px;
    }
  
    .slide {
      border: 1px solid #333;
      padding: 12px;
      margin-bottom: 14px;
      border-radius: 6px;
      background: #1a1a1a;
    }
  
    .meta {
      margin-bottom: 8px;
      color: #aaa;
      font-size: 14px;
    }
  
    .fallback {
      color: #777;
      font-size: 13px;
    }
  </style>