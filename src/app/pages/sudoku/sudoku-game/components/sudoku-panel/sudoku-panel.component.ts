import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getColorClasses } from 'src/app/shared/util/styles-classes';

@Component({
  selector: 'app-sudoku-panel',
  templateUrl: './sudoku-panel.component.html',
  styleUrls: [
    './sudoku-panel.component.css',
    '../../../../../shared/styles/sudoku-classes-list.css',
  ],
})
export class SudokuPanelComponent {
  getColorClasses = getColorClasses;

  @Output() onClickToggleCandidateMode: EventEmitter<string>;
  @Input() timer!: number;
  @Input() playerID!: number;

  @Output() onClickChangeSelectedNumber: EventEmitter<number | null>;
  @Input() selectedNumber!: number | null;
  numbers: (number | null)[] = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  @Output() onClickUndoChanges: EventEmitter<null>;
  @Output() onClickCheckForWin: EventEmitter<null>;

  constructor() {
    this.onClickToggleCandidateMode = new EventEmitter();
    this.onClickChangeSelectedNumber = new EventEmitter();
    this.onClickUndoChanges = new EventEmitter();
    this.onClickCheckForWin = new EventEmitter();
  }

  getPlayerColor(number: number | null) {
    if (number === this.selectedNumber) {
      return getColorClasses(this.playerID);
    } else {
      return;
    }
  }

  getSelectedCellEffect(number: number | null) {
    if (number === this.selectedNumber) {
      return {
        'box-shadow': 'inset 2px 2px 2px rgba(0, 0, 0, 0.4)',
      };
    } else {
      return;
    }
  }
}
