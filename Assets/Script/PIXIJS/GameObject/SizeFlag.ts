
import { Container } from "./Container";
import { Layout } from "./Layout";
import { Model } from "./Model";

export class SizeFlag extends Container{
  static sizes = new Map();
  static _init = false;
  left = 0.5;
  up = 0.5;
  static GetDisplayObjectSize(target) {
    if(!target) return;
    let size = SizeFlag.sizes.get(target);
    if (size) return size;
    let s = { width: target.width, height: target.height };
    SizeFlag.sizes.set(target, s);
    return s;
  }
  Start(): void {
    if (!SizeFlag._init) {
      Model.ticker().add(() => {
        SizeFlag.sizes.clear();
      })
      SizeFlag._init = true;
    }
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