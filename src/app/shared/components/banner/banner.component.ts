import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { getColorClasses } from '../../util/styles-classes';

@Component({
  selector: 'app-banner',
  template: `<div [ngClass]="getColorClasses(playerID)" class="container">
    <div [ngClass]="setContrastLogoStyles(playerID)">
      <h2 routerLink="/home">
        sudo<span id="ku">ku</span><span id="-op">-op</span>
      </h2>
    </div>
  </div>`,
  styleUrls: ['./banner.component.css', '../../styles/sudoku-classes-list.css'],
})
export class BannerComponent {
  playerID: number = 0;

  getColorClasses = getColorClasses;

  constructor(private configService: ConfigService) {
    this.configService.getPlayerID().subscribe((playerID) => {
      this.playerID = playerID;
    });
  }

  setContrastLogoStyles(playerID: number) {
    return {
      'contrast-color':
        playerID === 2 ||
        playerID === 4 ||
        playerID === 8 ||
        playerID === 9 ||
        playerID === 11,
    };
  }

  onClick() {
    console.log(this.playerID);
  }
}
