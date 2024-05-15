import {BoardAction} from "../game/boardActions";
import {Group, Vector3} from "three";

export interface CacheAttack {
  attack: BoardAction, // raw attack
  src: Vector3,        // src position of the attack
  direction: Vector3,  // direction the attack is moving
  model: Group,        // the model of the attack
}
