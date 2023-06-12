import { Injectable } from '@angular/core';
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import { DIFFICULTY_ENG } from '../models/dificulties.enum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private username: string = '';
  private dificulty: Difficulty | undefined = DIFFICULTY_ENG.EASY;
  private gameID: string = '';
  private isHost: boolean = false;
  private playerID: number = 0;
  $playerID: BehaviorSubject<number>;

  constructor() {
    this.$playerID = new BehaviorSubject(0);
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(name: string): string {
    return (this.username = name);
  }

  getDificulty(): Difficulty | undefined {
    return this.dificulty;
  }

  setDificulty(dificulty: Difficulty | undefined): Difficulty | undefined {
    return (this.dificulty = dificulty);
  }

  getGameID(): string {
    return this.gameID;
  }

  setGameID(gameID: string): string {
    return (this.gameID = gameID);
  }

  getIsHost(): boolean {
    return this.isHost;
  }

  setIsHost(isHost: boolean): boolean {
    return (this.isHost = isHost);
  }

  getPlayerID(): Observable<number> {
    return this.$playerID.asObservable();
  }

  setPlayerID(playerID: number): number {
    return (this.playerID = playerID);
  }
}
