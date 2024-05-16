import {Injectable} from '@angular/core';
import {PlayerService} from "../playerService/player.service";
import {GameState} from "../../models/game/gameState";
import {BaseService} from "../baseService/base.service";
import {ModelService} from "../modelService/model.service";
import {AttackService} from "../attackService/attack.service";
import {GameService} from "../gameService/game.service";
import {Update} from "../../models/communication/update";
import {Subscription} from "../../models/communication/subscription";
import {HttpClient} from "@angular/common/http";
import {gameURL, webSocketURL} from "../../config";
import {GameInfo} from "../../models/communication/game-info";
import {CookieService} from "ngx-cookie-service";
import {Player} from "../../models/game/player";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // the current websocket in use
  private socket!: WebSocket;

  // current game spectated
  private target_game: number = 0;

  // list of all games running
  private games: GameInfo[] = [];

  // constructor with the required services:
      // playerService to update the players
      // baseService to update the bases
      // attackService to update the attacks
      // modelService to get the models loading state
      // gameService to update game information
      // httpService to fetch all running games
  constructor(
    private playerService: PlayerService,
    private baseService: BaseService,
    private attackService: AttackService,
    private modelService: ModelService,
    private gameService: GameService,
    private httpService: HttpClient,
    private cookieService: CookieService) {

    // connect to the websocket
    this.setupWebSocket(webSocketURL);
  }

  private setupWebSocket(webSocketURL: string): void {
    // connect to the webSocketURL
    this.socket = new WebSocket(webSocketURL);

    // don't perform actions after the socket has been opened
    this.socket.onopen = (): void => {
      // fetch available games
      this.fetchGames();
      // load the current target game
      this.setTargetGame(parseInt(this.cookieService.get('targetGame')) || 0);
      // clear cached data
      this.reload();
    };

    // await the first message to contain the player names
    this.socket.onmessage = (msg: MessageEvent) => this.handleGameUpdates(msg);

    // on disconnect try to reconnect
    this.socket.onclose = (): void => {
      // try to reconnect
      this.setupWebSocket(webSocketURL);
    }
  }

  // clear cache and optional fetch data
  public reload(fetch: boolean = false): void {
    // fetch current games
    if (fetch) this.fetchGames();
    // clear cache
    this.baseService.clear();
    this.attackService.clear();
    this.gameService.reset();
  }

  // fetch available games
  private fetchGames(): void {
    // get request to target
    this.httpService.get(gameURL).subscribe(
      gamesObj => {
        // set the available games
        this.games = <GameInfo[]> gamesObj;

        // check if there is only one game
        if (!this.games.map(game => game.id).includes(this.target_game) && this.games.length != 0) {
          this.setTargetGame(this.games[0].id);
        }

        // get game index in active game list
        let gameIndex: number = this.games.map(game => game.id).indexOf(this.target_game);
        // get current players
        let players: Player[] = gameIndex == -1 ? [] : this.games[gameIndex].players;
        // set the players for the current game
        this.playerService.setPlayers(players);

        // clear cache
        this.reload();
      }
    )
  }

  // return available games
  public getAvailableGames(): GameInfo[] {
    return this.games;
  }

  // return current targeted game
  public getCurrentTarget(): number {
    return this.target_game;
  }

  // change the selected game
  public setTargetGame(id: number): void {
    // change socket subscription
    this.target_game = id;
    this.switchTarget("game_"+this.target_game, "game_"+id);

    // store current selection
    this.cookieService.set("targetGame", String(id));

    // clear cached data
    this.reload();
  }

  // switch the target game
  private switchTarget(from: string, to: string): void {
    // unsubscribe the old game
    this.socket.send(JSON.stringify(<Subscription> {topic: from, message: "unsubscribe"}));
    // subscribe to new game
    this.socket.send(JSON.stringify(<Subscription> {topic: to, message: "subscribe"}));

    // update available games and players
    this.reload(true);
  }

  // handle a game update
  private handleGameUpdates(msg: MessageEvent): void {
    // wait for modelService to finish loading
    if (this.modelService.loadingProgress !== 1) {
      return;
    }
    // get the update state from the message
    let update: Update = JSON.parse(msg.data);

    // verify the right game is subscribed
    if (update.topic != "game_"+this.target_game) {
      // subscribe to the other game
      this.switchTarget(update.topic, "game_"+this.target_game);
      return;
    }

    // get the game state
    let gameState: GameState = update.message;
    // update the bases
    this.baseService.updateBases(gameState.bases);
    // update the actions
    this.attackService.updateAttacks(gameState.actions);

    // update current game settings and state
    this.gameService.setGame(gameState.game);
    // update current game settings and state
    this.gameService.setSettings(gameState.config);
  }
}
