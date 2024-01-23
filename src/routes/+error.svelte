<script lang="ts">
  import { page } from '$app/stores'
</script>

<div class="height-max flex justify-center items-center text-center text-8xl">
  Error {$page.status} <br> {$page.error?.message}
</div>

<style>
  .height-max {
    height: calc(100vh - 80px);
  }
</style>