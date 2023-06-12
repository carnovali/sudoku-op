import { Component, Input } from '@angular/core';
import { getColorClasses } from 'src/app/shared/util/styles-classes';

@Component({
  selector: 'app-sudoku-players',
  templateUrl: './sudoku-players.component.html',
  styleUrls: [
    './sudoku-players.component.css',
    '../../../../../shared/styles/sudoku-classes-list.css',
  ],
})
export class SudokuPlayersComponent {
  getColorClasses = getColorClasses;

  @Input() playerList!: [string, number][] | undefined;
}
