<script lang="ts">
  export let data
</script>

<!-- TODO: History page customization -->

{#each data.articles as article}
  <div class="px-[5vw] mb-40 mt-20">
    <h2 class="mb-5">{article.title}</h2>
    <p>{article.content}</p>
  </div>
{/each}