import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DIFFICULTY_ENG } from 'src/app/shared/models/dificulties.enum';
import { ROUTES } from 'src/app/shared/models/routes.enum';
import { ConfigService } from 'src/app/shared/services/config.service';
import { SudokuHostService } from 'src/app/shared/services/sudoku-host.service';
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string = '';
  gameID: string = '';
  difficulty: Difficulty | undefined = DIFFICULTY_ENG.EASY;
  formHome!: FormGroup;
  invalidID!: boolean;

  constructor(
    private configService: ConfigService,
    private sudokuHostService: SudokuHostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formHome = new FormGroup({
      username: new FormControl('', [Validators.required]),
      gameID: new FormControl(''),
      difficulty: new FormControl(DIFFICULTY_ENG.EASY, Validators.required),
    });
    this.detectInvalidID();
  }

  detectInvalidID() {
    this.route.queryParams
      .subscribe((params) => {
        this.invalidID = params['invalidID'];
      })
      .unsubscribe();
  }

  onClickJoin(): void {
    this.configService.setUsername(this.formHome.value.username);
    this.configService.setGameID(this.formHome.value.gameID);
    this.navigateToSudoku();
  }

  onClickCreate(): void {
    this.configService.setUsername(this.formHome.value.username);
    this.configService.setDificulty(this.formHome.value.difficulty);
    this.sudokuHostService.setNewGame().then(() => {
      this.navigateToSudoku();
    });
  }

  navigateToSudoku() {
    this.router.navigate([ROUTES.SUDOKU], {
      queryParams: { id: this.configService.getGameID() },
    });
  }
}
