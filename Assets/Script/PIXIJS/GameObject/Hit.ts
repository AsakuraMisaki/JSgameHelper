import { Model } from "./Model"
import { PIXI } from "./Types"
type HitInfo = {
  target: PIXI.Container | null
}
abstract class Hit{
  global: ()=>PIXI.Point
  test: <T extends PIXI.Container>(displayObject:T, info:HitInfo, point:PIXI.Point,)=>PIXI.Container | null
}
export class DefaultHit implements Hit{
  _tempPoint: PIXI.Point
  constructor(){
    this._tempPoint = new PIXI.Point();
  }
  global(){
    return Model.app().renderer.plugins.interaction.eventData.data.global as PIXI.Point;
  }
  test<T extends PIXI.Container>(displayObject: T, info: HitInfo = { target: null }, point=this.global()) {
    if (displayObject.hitArea) {
      // local->world
      displayObject.worldTransform.applyInverse(point, this._tempPoint);
      if (displayObject.hitArea.contains(this._tempPoint.x, this._tempPoint.y)) return null;
      info.target = displayObject;
    }
    // If there is a mask, no need to hitTest against anything else if the pointer is not within the mask.
    // We still want to hitTestChildren, however, to ensure a mouseout can still be generated.
    // https://github.com/pixijs/pixi.js/issues/5135
    else if (displayObject._mask) {
      if (!(displayObject._mask.containsPoint && displayObject._mask.containsPoint(point))) return null;
      info.target = displayObject;
    }
    return info.target;
  }
}