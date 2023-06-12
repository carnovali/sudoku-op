import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { TimerPipe } from './shared/pipes/timer.pipe';
import { TypeofCheckPipe } from './shared/pipes/typeof-check.pipe';

import { ConfigService } from './shared/services/config.service';
import { DatabaseService } from './shared/services/database.service';
import { SudokuHostService } from './shared/services/sudoku-host.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { SudokuGameComponent } from './pages/sudoku/sudoku-game/sudoku-game.component';
import { GameInfoComponent } from './pages/sudoku/sudoku-game/components/game-info/game-info.component';
import { SudokuBoardComponent } from './pages/sudoku/sudoku-game/components/sudoku-board/sudoku-board.component';
import { SudokuPanelComponent } from './pages/sudoku/sudoku-game/components/sudoku-panel/sudoku-panel.component';
import { SudokuPlayersComponent } from './pages/sudoku/sudoku-game/components/sudoku-players/sudoku-players.component';
import { SudokuComponent } from './pages/sudoku/sudoku-page.component';
import { EnterUserDialogComponent } from './pages/sudoku/sudoku-game/components/enter-user-dialog/enter-user-dialog.component';
import { HandleEndgameDialogComponent } from './pages/sudoku/sudoku-game/components/handle-endgame-dialog/handle-endgame-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimerPipe,
    TypeofCheckPipe,
    BannerComponent,
    SudokuComponent,
    SudokuGameComponent,
    GameInfoComponent,
    SudokuBoardComponent,
    SudokuPanelComponent,
    SudokuPlayersComponent,
    EnterUserDialogComponent,
    HandleEndgameDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [ConfigService, DatabaseService, SudokuHostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
