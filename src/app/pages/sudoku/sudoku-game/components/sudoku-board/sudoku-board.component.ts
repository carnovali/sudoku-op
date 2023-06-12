import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameBoardArray } from 'src/app/shared/models/sudoku-game-data.model';
import {
  getCellClasses,
  getCellCandidatesPositionClasses,
  getColorClasses,
  getbaseUsedCellClass,
  getColorsByPlayerID,
} from 'src/app/shared/util/styles-classes';

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: [
    './sudoku-board.component.css',
    '../../../../../shared/styles/sudoku-classes-list.css',
  ],
})
export class SudokuBoardComponent {
  @Input() sudokuPuzzleArray!: GameBoardArray;
  @Input() originalSudokuPuzzleArray!: GameBoardArray;
  @Input() playerID!: number;
  @Output() boardChange: EventEmitter<any>;

  getCellClasses = getCellClasses;
  getCellCandidatesPositionClasses = getCellCandidatesPositionClasses;
  getColorClasses = getColorClasses;
  getbaseUsedCellClass = getbaseUsedCellClass;
  getColorsByPlayerID = getColorsByPlayerID;

  constructor() {
    this.boardChange = new EventEmitter();
  }

  parseCandidatesString(
    candidates: string | number | null
  ): string[] | undefined {
    if (typeof candidates === 'string') {
      let candidatesArray = candidates.split('') as string[];
      return candidatesArray.sort();
    }
    return;
  }

  onClickBoard(indexRow: number, indexColumn: number) {
    this.boardChange.emit({ row: indexRow, col: indexColumn });
  }

  getInsideBorders(playerID: number, indexRow: number, indexCol: number) {
    const color = getColorsByPlayerID(playerID);
    let response: { [key: string]: string } = {};
    if (indexRow === 2 || indexRow === 5) {
      response['border-bottom'] = `3px solid ${color}`;
    }
    if (indexCol === 2 || indexCol === 5) {
      response['border-right'] = `3px solid ${color}`;
    }
    return response;
  }
}
