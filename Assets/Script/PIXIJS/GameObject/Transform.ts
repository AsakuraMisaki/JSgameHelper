import { PIXIfeatureComponent } from "./Component";
import { Layout } from "./Layout";
import { Model } from "./Model";

export class Transform extends PIXIfeatureComponent{
  localID:number = 0;
  constructor() {
    super();
  }
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