import { EV } from "./EV";
import { Bitmap, Graphics, ImageManager, PIXI, SceneManager } from "./Types";

// pixi app context getter
export class Model extends EV{
  static instance = new Model();
  static caches = new Map();
  static EVS = {
    transformChange: "transformChange",
    tick: "tick",
    change: "change"
  }
  static remove(target){
    if(!target.parent) return;
    target.parent.removeChild(target);
  }
  static app():any{
    return Graphics.app;
  }
  static screen(){
    return Graphics;
  }
  static scene(){
    return SceneManager._scene;
  }
  static ticker(){
    return Graphics.app.ticker;
  }
  static async safeload(path){
    const p = new Promise((resolve, reject)=>{
      // base64
      if (/^data:/i.test(path)) {
        let img = new Image();
        img.src = path;
        const base = PIXI.BaseTexture.from(img);
        base.once('loaded', () => {
          let tex = new PIXI.Texture(base);
          resolve({ tex, base });
        })
      }
      else {
        let bitmap = Model.loader(path);
        bitmap._donotDestroy = true;
        bitmap.addLoadListener(() => {
          const base = bitmap._baseTexture;
          let tex = new PIXI.Texture(base);
          resolve({ tex, base });
        })
      }
    })
    return p;
  } 
  static loader(path:string):Bitmap{
    return ImageManager.loadBitmapFromUrl.bind(ImageManager)(path);
  }
  targets = new Map();
  _init = false;
  addTarget(target, name, cb0:(...args:any[])=>any, z=1, once=false) {
    let methods = this.targets.get(target);
    if (!methods) {
      methods = new Set();
    }
    let cb = super.on(name, cb0, z, once);
    if (cb) {
      methods.add(cb);
      this.targets.set(target, methods);
    }
    return cb;
  }
  removeTarget(target) {
    const ms = this.targets.get(target);
    super.clearMethods(Array.from(ms));
    this.targets.delete(target);
  }
}