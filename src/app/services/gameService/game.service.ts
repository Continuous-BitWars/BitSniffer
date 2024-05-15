import { Injectable } from '@angular/core';
import {GameConfig} from "../../models/game/gameConfig";
import {Game} from "../../models/game/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // settings of the displayed game
  public settings?: GameConfig;
  // game info of the displayed game
  public game?: Game;

  // setter for the settings
  public setSettings(settings: GameConfig): void {
    this.settings = settings;
  }

  // setter for the game info
  public setGame(game: Game): void {
    this.game = game;
  }

  // reset game info
  public reset(): void {
    // don't say anything
    this.settings = undefined;
    this.game = undefined;
  }

}
