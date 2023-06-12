import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sudoku-op';
  timerInterval!: any;
  timer: number = 0;

  constructor() {
    //this.startTimer()
  }

  getDemencia() {
    return {
      filter: `hue-rotate(${this.timer}deg)`,
    };
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer++;
    }, 30);
  }
}
