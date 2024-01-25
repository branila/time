<script lang="ts">
  import { enhance } from '$app/forms'
  
  export let form
</script>

<form class="h-[calc(100vh-80px)] flex justify-center items-center flex-col" method="post" use:enhance>
  <h1 class="font-bold text-3xl mb-5">Login</h1>
  <div class="mb-5">
    <label for="username">Username</label>
    <input class="border-2" type="text" id="username" name="username"/>
  </div>

  <div class="mb-5">
    <label for="password">Password</label>
    <input class="border-2" type="password" id="password" name="password"/>
  </div>

  <button class="border-2 py-2 px-3 hover:cursor-pointer mb-5" type="submit">Login</button>

  {#if form?.success}
    <div>Successfully logged in! Welcome back</div>
  {/if}
</form>