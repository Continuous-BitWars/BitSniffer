import { Component } from '@angular/core';
import {CameraService} from "../services/cameraService/camera.service";
import {StyleButtonComponent} from "../style-button/style-button.component";
import {StyleService} from "../services/styleService/style.service";
import {GameSelectorComponent} from "../game-selector/game-selector.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    StyleButtonComponent,
    GameSelectorComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  // constructor with the required services:
      // cameraService to provide the new camera button
      // styleService to get color scheme
  constructor(protected cameraService: CameraService, protected styleService: StyleService) {};
}
