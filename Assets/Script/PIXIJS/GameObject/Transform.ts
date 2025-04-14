
import { Container } from "./Container";
import { Layout } from "./Layout";
import { Model } from "./Model";

export class Transform extends Container{
  localID:number = 0;
  width():number{
    return this.container.width;
  }
  height():number{
    return this.container.height;
  }
  Update() {
    if (this.localID != this.container.transform._localID) {
      Model.instance.emit(Model.EVS.transformChange, this.container);
    }
  }
}