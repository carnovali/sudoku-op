import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SudokuMovementData,
  GameBoardObject,
  GameBoardArray,
} from 'src/app/shared/models/sudoku-game-data.model';
import { SudokuGame } from 'src/app/shared/models/sudoku.class';
import { SUDOKU } from 'src/app/shared/models/sudoku.enum';
import { ROUTES } from 'src/app/shared/models/routes.enum';
import { ConfigService } from 'src/app/shared/services/config.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import {
  sudokuObjectToArray,
  compareTwoBoards,
  removeSudokuPlayerInteractions,
} from 'src/app/shared/util/sudoku-utilities';
import { MatDialog } from '@angular/material/dialog';
import { HandleEndgameDialogComponent } from './components/handle-endgame-dialog/handle-endgame-dialog.component';

@Component({
  selector: 'app-sudoku-game',
  templateUrl: './sudoku-game.component.html',
  styleUrls: ['./sudoku-game.component.css'],
})
export class SudokuGameComponent implements OnInit {
  gameID!: string;
  playerUserName!: string;
  playerID!: number;
  isHost!: boolean;

  isTimerSync: boolean = false;
  timer: number = 0;
  timerInterval: any;

  candidateMode: boolean = false;
  movesHistory: SudokuMovementData[] = [];

  sudokuGame: SudokuGame;

  selectedNumber: number | null = null;

  constructor(
    private dbService: DatabaseService,
    private configService: ConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.sudokuGame = new SudokuGame(undefined);
    this.isHost = this.configService.getIsHost();

    this.playerUserName = this.configService.getUsername();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(): void {
    this.dbService.deleteGamePlayer(this.gameID, this.playerUserName);
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown($event: KeyboardEvent): void {
    let num = parseInt($event.code.replace('Numpad', '')) as number;
    if (isNaN(num)) {
      num = parseInt($event.code.replace('Digit', '')) as number;
    }
    if (typeof num === 'number' && num >= 1 && num <= 9) {
      this.selectedNumber = num;
    }
    if (num === 0) {
      this.selectedNumber = null;
    }
  }

  ngOnInit(): void | Promise<boolean> {
    this.configureGameID();
    if (!this.gameID) {
      return this.router.navigate([ROUTES.CREATE_GAME]);
    }
    this.initializeGame();
  }

  getGameIDByQueryParam() {
    this.route.queryParams
      .subscribe((params) => {
        this.gameID = params['id'];
      })
      .unsubscribe(); //
  }

  configureGameID() {
    const id = this.configService.getGameID();
    id ? (this.gameID = id) : this.getGameIDByQueryParam(); //
  }

  initializeGame(): void | Promise<boolean> {
    this.getAsyncData();
    this.getStreamData();
  }

  getAsyncData(): void {
    try {
      this.dbService
        .getGameData(this.gameID)
        .then((doc: any) => {
          this.sudokuGame.isTimerInitialized = doc[SUDOKU.IS_TIMER_INITIALIZED];
          this.playerID = doc[SUDOKU.PLAYER_COUNT];
          this.sudokuGame.gameStartTime = doc[SUDOKU.GAME_START_TIME];
          this.sudokuGame.difficulty = doc[SUDOKU.DIFFICULTY];
          this.sudokuGame.originalSudokuPuzzleArray = sudokuObjectToArray(
            doc[SUDOKU.ORIGINAL_PUZZLE] as GameBoardObject
          );
          this.sudokuGame.sudokuSolvedArray = sudokuObjectToArray(
            doc[SUDOKU.SOLVED] as GameBoardObject
          );
        })
        .then((): any => {
          if (this.playerID >= 14) {
            return this.router.navigate([ROUTES.CREATE_GAME]);
          }
        })
        .then(() => {
          this.dbService.updateGamePlayerCount(this.gameID);
          this.dbService.updateGamePlayers(
            this.gameID,
            this.playerUserName,
            this.playerID
          );
          this.configService.setPlayerID(this.playerID);
          this.configService.$playerID.next(this.playerID);
        })
        .catch(() => {
          this.router.navigate([ROUTES.CREATE_GAME], {
            queryParams: { invalidID: true },
          });
        });
    } catch (err) {
      this.router.navigate([ROUTES.CREATE_GAME], {
        queryParams: { invalidID: true },
      });
    }
  }

  getStreamData(): void {
    this.dbService.getGameStreamData(this.gameID).subscribe((doc) => {
      const sudokuPuzzle: GameBoardArray = sudokuObjectToArray(
        doc.sudokuPuzzle as GameBoardObject
      );
      const gamePlayers: string[] = doc.gamePlayers;
      const gameStartTime: number = doc.gameStartTime;
      const isTimerInitialized: boolean = doc.isTimerInitialized;
      const isGameEnded: boolean = doc.isGameEnded;
      const parsedPlayerList: [string, number][] = gamePlayers.map((elem) => {
        const [name, value] = elem.split(',');
        return [name, parseInt(value)];
      });

      this.sudokuGame.sudokuPuzzleArray = sudokuPuzzle;

      if (!this.sudokuGame.isTimerInitialized) {
        this.sudokuGame.isTimerInitialized = isTimerInitialized; //
      }

      this.handleTimer(isTimerInitialized, gameStartTime);

      this.sudokuGame.players = parsedPlayerList;

      this.handleGameEnd(isGameEnded);
    });
  }

  handleTimer(isTimerInitialized: boolean, gameStartTime: number) {
    if (isTimerInitialized && gameStartTime !== 0) {
      if (!this.isTimerSync) {
        this.timer = Math.floor((Date.now() - gameStartTime) / 1000);
        this.startTimer();
        this.isTimerSync = true;
      }
    }
  }

  handleGameEnd(isGameEnded: boolean) {
    if (this.sudokuGame.isGameEnded) {
      return;
    }
    if (isGameEnded) {
      this.sudokuGame.isGameEnded = true;
      this.dbService
        .getGameData(this.gameID)
        .then((doc: any) => {
          this.timer = doc[SUDOKU.GAME_END_TIME];
        })
        .then(() => {
          this.stopTimer();
          this.isWinner(true);
        });
    }
  }

  toggleCandidateMode($event: string) {
    $event === '1' ? (this.candidateMode = true) : (this.candidateMode = false);
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
  }

  changeSelectedNumber(number: number | null): void {
    this.selectedNumber = number;
  }

  onClickBoard(event: { row: number; col: number }): void {
    //
    const row = event.row;
    const col = event.col;

    if (
      this.sudokuGame.originalSudokuPuzzleArray[row][col][0] !== null ||
      this.sudokuGame.isGameEnded
    ) {
      return;
    }

    let cellColor = 14;
    let selectedNumber: number | string | null = this.selectedNumber;
    const pastCellValue: SudokuMovementData = {
      row: row,
      col: col,
      number: this.sudokuGame.sudokuPuzzleArray[row][col][0],
      player: this.sudokuGame.sudokuPuzzleArray[row][col][1],
    };

    if (this.candidateMode && selectedNumber !== null) {
      selectedNumber = selectedNumber.toString();
      const selectedCell = this.sudokuGame.sudokuPuzzleArray[row][col][0];
      if (typeof selectedCell === 'string') {
        if (selectedCell.includes(selectedNumber)) {
          selectedNumber = selectedCell.replace(selectedNumber, '');
          if (selectedNumber.length === 0) {
            selectedNumber = null;
          }
        } else {
          selectedNumber = selectedCell + selectedNumber;
        }
      }
    }

    if (selectedNumber === null || this.candidateMode) {
      cellColor = 14;
    } else {
      cellColor = this.playerID;
    }

    this.dbService
      .updateGameBoard(
        this.gameID,
        row,
        col,
        selectedNumber,
        cellColor as number
      )
      .then(() => {
        this.movesHistory.push(pastCellValue);
        if (!this.sudokuGame.isTimerInitialized) {
          this.dbService.updateGameIsTimerInitialized(this.gameID, true); //
          this.dbService.updateGameTimer(this.gameID, Date.now());
        }
      });
  }

  undo() {
    if (this.movesHistory.length >= 1 && !this.sudokuGame.isGameEnded) {
      const lastCellValue = this.movesHistory[this.movesHistory.length - 1];
      this.dbService
        .updateGameBoard(
          this.gameID,
          lastCellValue.row,
          lastCellValue.col,
          lastCellValue.number,
          lastCellValue.player
        )
        .then(() => {
          this.movesHistory.pop();
        });
    }
  }

  checkForWin(): void {
    if (
      compareTwoBoards(
        removeSudokuPlayerInteractions(this.sudokuGame.sudokuPuzzleArray),
        this.sudokuGame.sudokuSolvedArray
      )
    ) {
      this.dbService.updateGameStatus(this.gameID, true);
      this.dbService.updateEndGameTimer(this.gameID, this.timer);
    } else {
      this.isWinner(false);
    }
  }

  isWinner(bool: boolean) {
    this.openDialog(bool);
  }

  openDialog(winner: boolean) {
    this.dialog.open(HandleEndgameDialogComponent, {
      data: {
        isWinner: winner,
        timer: this.timer,
        difficulty: this.sudokuGame.difficulty,
        playersAmount: this.sudokuGame.players.length,
      },
    });
  }

  onClick() {
    console.log(this.candidateMode);
  }

  onClick2() {
    console.log(this.movesHistory);
  }
}
