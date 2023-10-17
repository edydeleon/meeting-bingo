<script lang="ts">
  import { bingoSquares, getWinConditions } from '$lib/bingo';
  import { bingoStore, updateBingoBoard, updateSelected } from '$lib/stores/bingo.store';
  import { get } from 'svelte/store';

  type State = 'start' | 'playing' | 'won';

  let state: State = 'start';
  let size = 25;
  const winConditions = getWinConditions(size);
  let board: string[] = [];
  let letters = ['B', 'I', 'N', 'G', 'O'];
  let selected: number[] = [12];

  function createBoard() {
    let squares = new Set<string>([]);

    while (squares.size < size) {
      const randomIndex = Math.floor(Math.random() * bingoSquares.length);
      squares.add(squares.size === 12 ? 'Free Space' : bingoSquares[randomIndex]);
    }

    return [...squares];
  }

  function selectSquare(squareIndex: number) {
    if (squareIndex === 12) {
      return;
    }
    const set = new Set(selected);
    if (set.has(squareIndex)) {
      set.delete(squareIndex);
    } else {
      set.add(squareIndex);
    }
    const newSelected = [...set];

    selected = newSelected;
    updateSelected(newSelected);
  }

  function gameWon() {
    const set = new Set(selected);
    if (winConditions.some((condition) => condition.every((index) => set.has(index)))) {
      state = 'won';
    }
  }

  function start() {
    board = createBoard();
    selected = [12];
    updateBingoBoard(board);
    updateSelected(selected);
    state = 'playing';
  }

  function continueLastGame() {
    board = get(bingoStore).board;
    selected = get(bingoStore).selected;
    state = 'playing';
  }

  $: selected.length > 0 && gameWon();
</script>

{#if state === 'start'}
  <div class="center">
    <div>
      <h1>Meeting Bingo</h1>
      <div class="grid" style="min-width: 5rem;">
        {#if $bingoStore.board.length > 0}
          <button class="secondary outline" on:click={() => continueLastGame()}
            >Continue Last Game</button
          >
        {/if}
        <button class="secondary" on:click={() => start()}>Start</button>
      </div>
    </div>
  </div>
{/if}

{#if state === 'playing'}
  <div class="bingo-board">
    {#each letters as letter}
      <div class="letter">
        {letter}
      </div>
    {/each}

    {#each board as square, squareIndex}
      {@const isSelected = squareIndex === 12 || selected.includes(squareIndex)}
      <button
        class="square"
        class:secondary={!isSelected}
        class:primary={isSelected}
        on:click={() => selectSquare(squareIndex)}
      >
        {square}
      </button>
    {/each}
  </div>
{/if}

{#if state === 'won'}
  <div class="center">
    <div>
      <h1>You Win!</h1>
      <button class="secondary" on:click={() => start()}>Play again</button>
    </div>
  </div>
{/if}

<style>
  .center {
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .bingo-board {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 3.75rem repeat(5, 1fr);

    & .letter {
      font-size: 2rem;
      align-self: center;
      justify-self: center;
      font-weight: bold;
    }

    & .square {
      margin: 0;
    }
  }
</style>
