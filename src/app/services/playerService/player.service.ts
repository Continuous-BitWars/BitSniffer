import { Injectable } from '@angular/core';
import {Player} from "../../models/game/player";
import {Color} from "three";
import {randInt} from "three/src/math/MathUtils.js";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  // list off all players participating this game
  public players!: Player[];

  // available random colors
  private colors: Color[] = [];


  // constructor without any required services
  constructor() {
    // initialize the player list
    this.clear();
  };

  // reset the random colors
  private resetColors(): void {
    this.colors = [
      new Color("#e32636"),
      new Color("#cc0000"),
      new Color("#a52a2a"),

      new Color("#ffbe98"),
      new Color("#fdee00"),
      new Color("#ffbf00"),

      new Color("#a4c639"),
      new Color("#008000"),
      new Color("#004225"),

      new Color("#00ffff"),
      new Color("#89cff0"),
      new Color("#007fff"),

      new Color("#f2f3f4"),
      new Color("#b2beb5"),
      new Color("#536872"),
    ]
  }

  // set the players
  public setPlayers(players: Player[]): void {
    // clear the current player list
    this.clear();
    // add all players to cache
    players.forEach((player: Player) => {
      // check if the player is unnamed. If so set its name to its id
      if (player.name == "") player.name = "Unnamed #" + player.id;
      // check if the player has an own color. If not generate a random one
      if (player.color == undefined) player.color = ("#"+this.colors.splice(randInt(0, this.colors.length-1), 1).at(0)?.getHexString()) || "#FFFFFF";
      // add the player to the active list
      this.players.push(player);
    });

    // sort the players based on their ids
    this.players.sort((a, b) => a.id - b.id);
  }

  // get player from uid
  public getPlayer(uid: number): Player {
    return this.players[this.players.findIndex(player => player.id === uid)];
  }

  // clear all players
  public clear(): void {
    this.players = [{name: "FREE", id: 0, color: "#000000"}];
    // reset the random colors
    this.resetColors();
  }
}
