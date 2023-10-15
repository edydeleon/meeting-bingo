<script lang="ts">
  import '@picocss/pico';
  import '../app.css';
</script>

<svelte:head>
  <title>Meeting Bingo</title>
</svelte:head>

<header class="container">
  <nav>
    <ul>
      <li>
        <strong>Meeting Bingo</strong>
      </li>
    </ul>

    <ul>
      <li>
        <a href="/">Github</a>
      </li>
    </ul>
  </nav>
</header>

<main class="container">
  <slot />
</main>
