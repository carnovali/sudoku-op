import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { DatabaseService } from './database.service';
import { SudokuGameHost } from '../models/sudoku.class';

@Injectable({
  providedIn: 'root',
})
export class SudokuHostService {
  sudokuGameHost!: SudokuGameHost;

  constructor(
    private config: ConfigService,
    private dbService: DatabaseService
  ) {}

  async setNewGame(): Promise<void> {
    this.config.setIsHost(true);
    this.sudokuGameHost = new SudokuGameHost(this.config.getDificulty());
    this.sudokuGameHost.setNewSudoku();
    this.sudokuGameHost.parseSudokusToObjects();
    return await this.dbService.createGame(this.sudokuGameHost);
  }
}
