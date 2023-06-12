import {
  GameBoardArray,
  GameBoardObject,
} from 'src/app/shared/models/sudoku-game-data.model';
import { DIFFICULTY_ESP, DIFFICULTY_ENG } from '../models/dificulties.enum';

export const sudokuStringToArray = (inputString: string): GameBoardArray => {
  const rows = inputString.match(/.{1,9}/g) as string[];
  const cells = rows.map((row) => row.split(''));
  const board = cells.map((row) =>
    row.map(
      (cell) =>
        [cell === '-' ? null : parseInt(cell), null] as [
          number | null | string,
          number | null
        ]
    )
  );
  return board;
};

export const sudokuArrayToObject = (
  boardArray: GameBoardArray
): GameBoardObject => {
  const boardObject: GameBoardObject = {};

  for (let i = 0; i < boardArray.length; i++) {
    const row = boardArray[i];
    const rowKey = `row_${i}`;

    boardObject[rowKey] = {};

    for (let j = 0; j < row.length; j++) {
      const colKey = `col_${j}`;
      boardObject[rowKey][colKey] = row[j] as [number | null, number | null];
    }
  }

  return boardObject;
};

export const sudokuObjectToArray = (
  boardObject: GameBoardObject
): GameBoardArray => {
  const rowKeys = Object.keys(boardObject).sort();
  const boardArray: GameBoardArray = [];

  rowKeys.forEach((rowKey) => {
    const row = boardObject[rowKey];
    const colKeys = Object.keys(row).sort();
    const rowArray: [string | number | null, number | null][] = [];

    colKeys.forEach((colKey) => {
      rowArray.push(row[colKey]);
    });

    boardArray.push(rowArray);
  });

  return boardArray;
};

export const removeSudokuPlayerInteractions = (board: GameBoardArray) => {
  const cleanSudoku = board.map((row) => {
    return row.map((cell) => {
      return (cell = [cell[0], null]);
    });
  });

  return cleanSudoku;
};

export const compareTwoBoards = (
  board1: GameBoardArray,
  board2: GameBoardArray
) => {
  return JSON.stringify(board1) === JSON.stringify(board2);
};

export const getTranslatedDifficulty = (
  difficulty: string | undefined
): DIFFICULTY_ESP | undefined => {
  switch (difficulty) {
    case DIFFICULTY_ENG.EASY:
      return DIFFICULTY_ESP.FACIL;
    case DIFFICULTY_ENG.MEDIUM:
      return DIFFICULTY_ESP.MEDIO;
    case DIFFICULTY_ENG.HARD:
      return DIFFICULTY_ESP.DIFICIL;
    case DIFFICULTY_ENG.EXPERT:
      return DIFFICULTY_ESP.EXPERTO;
    default:
      return;
  }
};
