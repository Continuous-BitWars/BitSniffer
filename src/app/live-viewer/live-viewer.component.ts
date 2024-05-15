import {Component} from '@angular/core';
import {GameRendererComponent} from "./game-renderer/game-renderer.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {CameraService} from "../services/cameraService/camera.service";
import {ModelService} from "../services/modelService/model.service";
import {StyleService} from "../services/styleService/style.service";

@Component({
  selector: 'app-live-viewer',
  standalone: true,
  imports: [
    GameRendererComponent,
    NgForOf,
    NgIf,
    NgStyle
  ],
  templateUrl: './live-viewer.component.html',
  styleUrl: './live-viewer.component.css'
})
export class LiveViewerComponent {

  // constructor with the required services:
      // cameraService to get the number of cameras
      // modelService to preload the models and get the loading state
      // styleService to get color scheme
  constructor(protected cameraService: CameraService, protected modelService: ModelService, protected styleService: StyleService) {};

  // pass the Math library to html
  protected readonly Math: Math = Math;
}
