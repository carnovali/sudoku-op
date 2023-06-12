import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/sudoku-game-data.model';
import { getTranslatedDifficulty } from 'src/app/shared/util/sudoku-utilities';

@Component({
  selector: 'app-handle-endgame-dialog',
  templateUrl: './handle-endgame-dialog.component.html',
})
export class HandleEndgameDialogComponent {
  isWinner: boolean = false;
  timer: number = 0;
  difficulty: string = '';
  playersAmount: number = 0;
  getTranslatedDifficulty = getTranslatedDifficulty;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
