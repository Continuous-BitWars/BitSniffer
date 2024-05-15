import { Component } from '@angular/core';
import {GameService} from "../services/gameService/game.service";
import {StyleService} from "../services/styleService/style.service";

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.css'
})
export class GameInfoComponent {

  // constructor with the required services:
      // styleService to get the current style
      // gameService to get current game Information
  constructor(protected styleService: StyleService, protected gameService: GameService) {
  }

}
