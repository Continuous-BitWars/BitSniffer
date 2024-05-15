import {Base} from "../game/base";
import {Group} from "three";

export interface CacheBase {
  base: Base,   // raw base
  model: Group, // model of the base
}
