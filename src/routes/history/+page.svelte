<script lang="ts">
  export let data
</script>

<section class="mx-[5%] md:mx-[20%] relative">
  {#each data.articles as article}
    <div class="mb-40 mt-20">
      <h2 class="mb-5">{article.title}</h2>
      <p>{@html article.content}</p>
    </div>
  {/each}
</section>
