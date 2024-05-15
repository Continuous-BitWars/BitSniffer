import { Component } from '@angular/core';
import {PlayerService} from "../services/playerService/player.service";
import {NgForOf} from "@angular/common";
import {BaseService} from "../services/baseService/base.service";
import {StyleService} from "../services/styleService/style.service";

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent {

  // constructor with the required services:
      // playerService to get the players
      // baseService to get the nr of bases owned by a player
      // styleService to get color scheme
  constructor(protected playerService: PlayerService, protected baseService: BaseService, protected styleService: StyleService) {};

}
