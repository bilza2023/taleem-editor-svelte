<script>
    export let slide;
  </script>
  
  <div class="box">
    <b>TitleAndSubtitle Component</b>
  
    <div>Start: {slide.start}</div>
    <div>End: {slide.end}</div>
  
    <div style="margin-top:10px;">
      {#each slide.data as item}
        <div>
          {item.name}: {item.content}
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .box {
      border: 1px solid #4ade80;
      padding: 10px;
      border-radius: 6px;
      background: #052e1b;
    }
  </style>