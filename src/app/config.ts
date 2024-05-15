import {Euler, Vector3} from "three";
import {ModelType} from "./models/model/model-type";
import {Model} from "./models/model/model";

export const webSocketURL: string = "wss://dealer.dev.bitwars.online/live"
export const gameURL: string = "https://dealer.dev.bitwars.online/games"

export const minCameras: number = 1;
export const maxCameras: number = 9;

export const baseCameraLocation: Vector3 =  new Vector3(0, 25, 0);
export const baseCameraTarget: Vector3 = new Vector3(0, 0, 0);

export const modelConfig: Model[] = [
  {path: "./assets/attack.glb", type: ModelType.GLTF, initialScale: new Vector3(0.04,0.04,0.04), initialAngle: new Euler()},
  {path: './assets/ESP.glb', type: ModelType.GLTF, initialScale: new Vector3(10, 10, 10), initialAngle: new Euler()},
  {path: './assets/NANO.glb', type: ModelType.GLTF, initialScale: new Vector3(5, 5, 5), initialAngle: new Euler()},
  {path: './assets/miniPC.glb', type: ModelType.GLTF, initialScale: new Vector3(5, 5, 5), initialAngle: new Euler()},
  {path: './assets/PC.glb', type: ModelType.GLTF, initialScale: new Vector3(0.25, 0.25, 0.25), initialAngle: new Euler()},
  {path: './assets/Server.glb', type: ModelType.GLTF, initialScale: new Vector3(4, 4, 4), initialAngle: new Euler()},
]

export const modelFont: string = "./assets/aptos-display-bold.ttf";
