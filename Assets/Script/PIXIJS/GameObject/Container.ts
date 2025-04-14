import { Component } from "./Component";
import { Model } from "./Model";
import { PIXI } from "./Types";

export class Container extends Component{
  get container(){
    return this.gameObject.GetComponent(PIXI.Container) as PIXI.Container;
  }
  _Destroy(){
    Model.remove(this.container);
  }
}