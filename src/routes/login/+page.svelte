<script lang="ts">
  import { enhance } from '$app/forms'
  
  export let form
</script>

<form method="post" use:enhance>
  <!-- username and password login -->
  <div class="group">
    <label for="username">Username</label>
    <input type="text" id="username" name="username" />
  </div>

  <div class="group">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" />
  </div>

  <button type="submit">Login</button>
</form>