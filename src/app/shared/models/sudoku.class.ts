import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import {
  GameBoardArray,
  GameBoardObject,
  SudokuGameData,
} from './sudoku-game-data.model';
import { getSudoku } from 'sudoku-gen';
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import {
  sudokuArrayToObject,
  sudokuStringToArray,
} from '../util/sudoku-utilities';

export class SudokuGame implements SudokuGameData {
  players: [string, number][];
  private _sudokuPuzzle?: GameBoardArray | GameBoardObject;
  private _sudokuSolved?: GameBoardArray | GameBoardObject;
  private _originalSudokuPuzzle?: GameBoardArray | GameBoardObject;
  gameStartTime: number;
  gameEndTime: number;
  isTimerInitialized: boolean;
  difficulty: Difficulty | undefined;
  isGameEnded: boolean;

  constructor(difficulty: Difficulty | undefined) {
    this.players = [];
    this.gameStartTime = 0;
    this.gameEndTime = 0;
    this.isTimerInitialized = false;
    this.isGameEnded = false;
    this.difficulty = difficulty;
  }

  //Array getters and setters
  get sudokuPuzzleArray() {
    return this._sudokuPuzzle as GameBoardArray;
  }

  set sudokuPuzzleArray(sudokuPuzzle: GameBoardArray) {
    this._sudokuPuzzle = sudokuPuzzle;
  }

  get sudokuSolvedArray() {
    return this._sudokuSolved as GameBoardArray;
  }

  set sudokuSolvedArray(sudokuSolved: GameBoardArray) {
    this._sudokuSolved = sudokuSolved;
  }

  get originalSudokuPuzzleArray() {
    return this._originalSudokuPuzzle as GameBoardArray;
  }

  set originalSudokuPuzzleArray(sudokuPuzzle: GameBoardArray) {
    this._originalSudokuPuzzle = sudokuPuzzle;
  }

  //Object getters and setters
  get sudokuPuzzleObject() {
    return this._sudokuPuzzle as GameBoardObject;
  }

  set sudokuPuzzleObject(sudokuPuzzle: GameBoardObject) {
    this._sudokuPuzzle = sudokuPuzzle;
  }

  get sudokuSolvedObject() {
    return this._sudokuSolved as GameBoardObject;
  }

  set sudokuSolvedObject(sudokuSolved: GameBoardObject) {
    this._sudokuSolved = sudokuSolved;
  }

  get originalSudokuPuzzleObject() {
    return this._originalSudokuPuzzle as GameBoardObject;
  }

  set originalSudokuPuzzleObject(sudokuPuzzle: GameBoardObject) {
    this._originalSudokuPuzzle = sudokuPuzzle;
  }
}

export class SudokuGameHost extends SudokuGame {
  playerCount: number;

  constructor(difficulty: Difficulty | undefined) {
    super(difficulty);
    this.playerCount = 0;
  }

  setNewSudoku(): void {
    const sudokuObject: Sudoku = getSudoku(this.difficulty);
    this.sudokuPuzzleArray = sudokuStringToArray(sudokuObject.puzzle);
    this.sudokuSolvedArray = sudokuStringToArray(sudokuObject.solution);
  }

  parseSudokusToObjects() {
    this.sudokuPuzzleObject = sudokuArrayToObject(
      this.sudokuPuzzleArray as GameBoardArray
    );
    this.sudokuSolvedObject = sudokuArrayToObject(
      this.sudokuSolvedArray as GameBoardArray
    );
    this.originalSudokuPuzzleObject = { ...this.sudokuPuzzleObject };
  }
}
