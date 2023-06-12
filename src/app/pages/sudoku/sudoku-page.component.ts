import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnterUserDialogComponent } from './sudoku-game/components/enter-user-dialog/enter-user-dialog.component';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-sudoku',
  template: `<div class="mat-app-background" *ngIf="isUserNameSetted">
    <app-sudoku-game></app-sudoku-game>
  </div>`,
  styles: [
    `
      div {
        height: 100%;
      }
    `,
  ],
})
export class SudokuComponent implements OnInit {
  isUserNameSetted: boolean = false;

  constructor(public dialog: MatDialog, private configService: ConfigService) {}

  ngOnInit() {
    if (!this.configService.getUsername()) {
      this.openDialog();
    } else {
      this.isUserNameSetted = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EnterUserDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.configService.setUsername(result);
      this.isUserNameSetted = true;
    });
  }
}
