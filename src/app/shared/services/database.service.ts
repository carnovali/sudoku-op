import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  docData,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { GameBoardObject } from '../models/sudoku-game-data.model';
import { ConfigService } from './config.service';
import { SUDOKU } from '../models/sudoku.enum';
import { SudokuGameHost } from '../models/sudoku.class';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  gamesCollectionRef: CollectionReference = collection(
    this.firestore,
    SUDOKU.GAMES
  );

  constructor(private firestore: Firestore, private config: ConfigService) {}

  getGameStreamData(id: string) {
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    return docData(docRef).pipe(
      map((doc) => {
        //console.log('getGameStreamData')
        const sudokuPuzzle: GameBoardObject = doc[SUDOKU.PUZZLE];
        const gamePlayers: string[] = doc[SUDOKU.PLAYERS];
        const isGameEnded: boolean = doc[SUDOKU.IS_GAME_ENDED];
        const gameStartTime: number = doc[SUDOKU.GAME_START_TIME];
        const isTimerInitialized: boolean = doc[SUDOKU.IS_TIMER_INITIALIZED];
        return {
          sudokuPuzzle: sudokuPuzzle,
          gamePlayers: gamePlayers,
          isGameEnded: isGameEnded,
          gameStartTime: gameStartTime,
          isTimerInitialized: isTimerInitialized,
        };
      })
    );
  }

  async getGameData(id: string): Promise<DocumentData | undefined> {
    //console.log('getGameStreamData')
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    const docSnap: DocumentSnapshot = await getDoc(docRef);
    return docSnap.data();
  }

  async getGameEndTime(id: string) {
    //console.log('getGameEndTime')
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    const docSnap: DocumentSnapshot = await getDoc(docRef);
    return docSnap.data();
  }

  async createGame(game: SudokuGameHost): Promise<void> {
    //console.log('createGame')
    const docRef: DocumentReference = doc(this.gamesCollectionRef);
    this.config.setGameID(docRef.id);
    return await setDoc(docRef, {
      ...game,
    } as SudokuGameHost);
  }

  async updateGameStatus(id: string, value: boolean) {
    //console.log('updateGameStatus')
    const path: string = SUDOKU.IS_GAME_ENDED;
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    this.config.setGameID(docRef.id);
    return await updateDoc(docRef, {
      [path]: value,
    });
  }

  async updateGameBoard(
    id: string,
    row: number,
    col: number,
    value: number | string | null,
    playerID: number | null
  ): Promise<void> {
    //console.log('updateGameBoard')
    const path: string = `${SUDOKU.PUZZLE}.row_${row}.col_${col}`;
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    return await updateDoc(docRef, {
      [path]: [value, playerID],
    });
  }

  async updateGamePlayerCount(id: string): Promise<void> {
    //console.log('updateGamePlayerCount')
    const path: string = SUDOKU.PLAYER_COUNT;
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    return await updateDoc(docRef, {
      [path]: increment(1),
    });
  }

  async updateGamePlayers(
    id: string,
    newPlayer: string,
    playerID: number
  ): Promise<void> {
    //console.log('updateGamePlayers')
    const path: string = SUDOKU.PLAYERS;
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    return await updateDoc(docRef, {
      [path]: arrayUnion(`${[newPlayer, playerID]}`),
    });
  }

  async updateGameTimer(id: string, gameStartTime: number) {
    //console.log('updateGameTimer')
    const path: string = SUDOKU.GAME_START_TIME;
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    return await updateDoc(docRef, {
      [path]: gameStartTime,
    });
  }

  async updateEndGameTimer(id: string, gameEndTime: number) {
    //console.log('updateEndTime')
    const path: string = SUDOKU.GAME_END_TIME;
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    return await updateDoc(docRef, {
      [path]: gameEndTime,
    });
  }

  async updateGameIsTimerInitialized(id: string, value: boolean) {
    //console.log('updateGameIsTimerInitialized')
    const path: string = SUDOKU.IS_TIMER_INITIALIZED;
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    return await updateDoc(docRef, {
      [path]: value,
    });
  }

  async deleteGamePlayer(id: string, player: string): Promise<void> {
    //console.log('deleteGamePlayer')
    const path: string = SUDOKU.PLAYERS;
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    return await updateDoc(docRef, {
      [path]: arrayRemove(`${player}`),
    });
  }

  async deleteGame(id: string): Promise<void> {
    const docRef: DocumentReference = doc(this.firestore, SUDOKU.GAMES, id);
    return await deleteDoc(docRef);
  }
}
