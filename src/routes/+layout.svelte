<script lang="ts">
  import '$lib/scss/global.scss';
  export const prerender = true;
</script>

<svelte:head>
  <title>Meeting Bingo</title>
</svelte:head>

<header class="ms-menu">
  <div class="container">
    <div class="ms-menu-logo">
      <a class="ms-text-main" href="/meeting-bingo"><strong>Meeting Bingo</strong></a>
    </div>
    <nav class="ms-menu-link">
      <ul>
        <li>
          <a href="https://github.com/edydeleon/meeting-bingo" target="_blank"
            >Github <ion-icon style="font-size: 14px;" name="open-outline" /></a
          >
        </li>
      </ul>
    </nav>
  </div>
</header>

<main class="container">
  <slot />
</main>

<style lang="scss">
  header {
    grid-area: header;
    display: flex;
  }

  main {
    grid-area: content;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 2rem;
  }
</style>
