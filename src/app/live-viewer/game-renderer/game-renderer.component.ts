import {Component, ElementRef, EventEmitter, Input, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {SceneService} from "../../services/sceneService/scene.service";
import {CameraService} from "../../services/cameraService/camera.service";
import {NgStyle} from "@angular/common";
import {StyleService} from "../../services/styleService/style.service";

@Component({
  selector: 'app-game-renderer',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './game-renderer.component.html',
  styleUrl: './game-renderer.component.css'
})
export class GameRendererComponent {
  // WebGL renderer for this window
  private renderer!: WebGLRenderer;

  // camera of this window
  private camera!: THREE.Camera;
  // the orbit controls associated with camera
  private controls!: OrbitControls;

  // event emitter used to interrupt the render loop
  private renderStop: EventEmitter<void> = new EventEmitter();
  // state of the renderer
  public running!: boolean;

  // the canvas used to display the rendered image
  @ViewChild('canvas') canvas?: ElementRef;

  // the id of the camera rendered on the canvas
  @Input() cameraId!: number;

  // constructor with the required services:
      // sceneService to get the elements to be rendered
      // cameraService to get the camera position
      // styleService to get color scheme
  constructor(private sceneService: SceneService, protected cameraService: CameraService, protected styleService: StyleService) {};

  ngAfterViewInit(): void {
    // create new renderer in canvas
    this.renderer = new WebGLRenderer( {
      canvas: this.canvas?.nativeElement,
      // TODO: maybe turn off antialiasing for performance
      antialias: true,
      alpha: true,
    });

    // set the renderer resolution
    // TODO: current: 4x canvas resolution -> reduce for performance
    this.setRenderScale();

    // add an event listener to change the render scale
    this.styleService.renderScaleUpdate.subscribe(_ => {
      // stop the renderer
      this.renderStop.emit();
      // update the render scale
      this.setRenderScale();
      // restart the renderer
      this.animate();
    });

    // get camera from cameraService
    this.camera = this.cameraService.cameras[this.cameraId].camera;

    // add orbit controls to camera
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // get the target the camera is facing towards
    let cameraTarget: THREE.Vector3 = this.cameraService.cameras[this.cameraId].target;
    // set the orbit controls to look towards the target
    this.controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);

    // add event listener to the orbit controls that triggers at the end of a movement and updates the camera position
    this.controls.addEventListener("end", event => this.cameraService.updateCamera(this.cameraId, this.camera.position, event.target.target));

    // animate the camera
    this.animate();
  }

  ngOnDestroy() {
    // inform the renderer to stop, since it runs in its own context
    this.renderStop.emit();
  }

  private animate(): void {
    // create reference to this context (basically clone it)
    let context = this;

    // keep the animation running;
    context.running = true;

    // add an event listener to stop the render loop
    context.renderStop.subscribe(_ => {
      // stop the render loop
      context.running = false;
    });

    // render loop
    (function render(): void {
      // render scene and camera
      context.renderer.render(context.sceneService.scene, context.camera);
      // animate controls
      context.controls.update();
      // render next frame
      if (context.running) requestAnimationFrame( render );
    }())
  }

  // render scale setter
  private setRenderScale(): void {
    // reduce scale for more than one camera
    let scale: number = this.styleService.renderScale / Math.ceil(Math.sqrt(this.cameraService.cameras.length))

    this.renderer.setSize(
      scale * 16 / 9,
      scale,
    );
  }

  // reset camera
  public resetCamera(): void {
    // instruct the cameraService to reset the camera
    this.cameraService.resetCamera(this.cameraId);
    // reset the target of the camera
    this.controls.target = this.cameraService.cameras[this.cameraId].target;
  }
}
