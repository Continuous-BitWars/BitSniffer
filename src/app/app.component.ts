import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {GameRendererComponent} from "./live-viewer/game-renderer/game-renderer.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {LiveViewerComponent} from "./live-viewer/live-viewer.component";
import {PlayerListComponent} from "./player-list/player-list.component";
import {WebsocketService} from "./services/webSocketService/websocket.service";
import {HeaderComponent} from "./header/header.component";
import {StyleService} from "./services/styleService/style.service";
import {GameInfoComponent} from "./game-info/game-info.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgbModule,
    RouterOutlet,
    GameRendererComponent,
    NgForOf,
    LiveViewerComponent,
    NgIf,
    PlayerListComponent,
    HeaderComponent,
    NgStyle,
    GameInfoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // the title of the application
  title: string = 'dashboard';

  // constructor with the required services:
      // webSocketService to connect to the backend
      // styleService to get color scheme
  constructor(private _: WebsocketService, protected styleService: StyleService) {};

}
