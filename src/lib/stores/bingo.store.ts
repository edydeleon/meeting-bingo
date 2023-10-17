import { persisted } from 'svelte-persisted-store';

const BINGO_STORE_KEY = 'bingo-store';

interface BingoProps {
  board: string[];
  selected: number[];
}

export const bingoStore = persisted<BingoProps>(
  BINGO_STORE_KEY,
  {
    board: [],
    selected: [],
  },
  {
    storage: 'local',
  }
);

export function updateBingoBoard(board: string[]) {
  bingoStore.update((state) => ({
    ...state,
    board,
  }));
}

export function updateSelected(selected: number[]) {
  bingoStore.update((state) => ({
    ...state,
    selected,
  }));
}
