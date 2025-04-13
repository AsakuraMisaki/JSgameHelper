import { PIXIfeatureComponent } from "./Component";
import { Layout } from "./Layout";
import { Model } from "./Model";

export class SizeFlag extends PIXIfeatureComponent{
  static sizes = new Map();
  static _init = false;
  left = 0.5;
  up = 0.5;
  constructor() {
    super();
    if (!SizeFlag._init) {
      Model.ticker().add(() => {
        SizeFlag.sizes.clear();
      })
      SizeFlag._init = true;
    }
  }
  static GetDisplayObjectSize(target) {
    if(!target) return;
    let size = SizeFlag.sizes.get(target);
    if (size) return size;
    
    let s = { width: target.width, height: target.height };
    SizeFlag.sizes.set(target, s);
    return s;
  }
  Update() {
    let parent = this.container.parent;
    if (parent && parent.gameObject && parent.gameObject.components.has(Layout)) return;
    const size = SizeFlag.GetDisplayObjectSize(parent);
    if(!size) return;
    this.container.x = this.left * size.width;
    this.container.y = this.up * size.height;
  }
}