import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';

export interface SudokuGameData {
  players: [string, number][];
  playerCount?: number;
  sudokuPuzzle?: GameBoardArray | GameBoardObject;
  sudokuSolved?: GameBoardArray | GameBoardObject;
  originalSudokuPuzzle?: GameBoardArray | GameBoardObject;
  gameStartTime: number;
  gameEndTime: number;
  isTimerInitialized: boolean;
  difficulty: Difficulty | undefined;
  isGameEnded: boolean;
}

export interface DialogData {
  isWinner: boolean;
  timer: number;
  difficulty: string;
  playersAmount: number;
}

export type GameBoardObject = {
  [key: string]: {
    [key: string]: [number | null | string, number | null];
  };
};

export type GameBoardArray = [number | null | string, number | null][][];

export type SudokuMovementData = {
  row: number;
  col: number;
  number: string | number | null;
  player: number | null;
};
