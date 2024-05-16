import {Component, ElementRef, ViewChild} from '@angular/core';
import {StyleService} from "../services/styleService/style.service";
import {WebsocketService} from "../services/webSocketService/websocket.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-game-selector',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './game-selector.component.html',
  styleUrl: './game-selector.component.css'
})
export class GameSelectorComponent {

  // game select input element
  @ViewChild("gameSelect") gameSelector!: ElementRef

  // constructor with the required services:
    // styleService to get style
    // webSocketService to set the target game
  constructor(protected styleService: StyleService, protected webSocketService: WebsocketService) {}

  ngAfterViewChecked(): void {
    // load the current target
    this.gameSelector.nativeElement.value = this.webSocketService.getAvailableGames().length > 0 ? this.webSocketService.getCurrentTarget(): 0;
  }

  protected readonly parseInt = parseInt;
}
