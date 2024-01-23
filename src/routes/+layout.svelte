<script>
  import '../app.css'
  
  // TODO: Script to mark the current page in the navbar
</script>

<!-- TODO: New navbar styling -->
<nav class="flex justify-between mx-[5%] md:mx-[20%]">
  <img class="flex h-16 m-2" src="/img/logo.png" alt="Navbar logo">

  <div class="flex my-auto">
    <a href="/" class="text-xl mr-5 m-auto">Home</a>
    <a href="/history" class="text-xl mr-5 m-auto">Storia</a>
    <a href="/projects" class="text-xl mr-5 m-auto">Progetti</a>
    <a href="/events" class="text-xl mr-5 m-auto">Eventi</a>
    <a href="/contacts" class="text-xl mr-5 m-auto">Contatti</a>
    <a href="/login" class="text-xl px-5 py-2 bg-gray-200 hover:bg-gray-300 transition rounded-lg">Login</a>
  </div>
</nav>

<slot />

<!-- TODO: Footer completion -->
<footer class="bg-neutral-200 text-center lg:text-left p-4 text-neutral-700">
  &copy; {new Date().getFullYear()} | Museo Time  
</footer>