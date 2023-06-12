import { Component, Input } from '@angular/core';
import { getTranslatedDifficulty } from 'src/app/shared/util/sudoku-utilities';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css'],
})
export class GameInfoComponent {
  getTranslatedDifficulty = getTranslatedDifficulty;

  @Input() gameID!: string;
  @Input() difficulty!: string | undefined;

  constructor(
    private clipboard: Clipboard,
    private snackBarMessage: MatSnackBar
  ) {}

  onClickCopy() {
    this.clipboard.copy(this.gameID);
    this.showSnackBar();
  }

  showSnackBar() {
    this.snackBarMessage.open('ID de juego copiada!', 'Cerrar', {
      duration: 3000,
    });
  }
}
