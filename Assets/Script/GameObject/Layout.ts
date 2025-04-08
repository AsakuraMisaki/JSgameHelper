import { PIXIfeatureComponent } from "./Component";
import { EV } from "./EV";
import { Model } from "./Model";
import { PIXI } from "./Types";

export class Vec2{
  _x: number = 0;
  _y: number = 0;
  constructor(x=0, y=0){
    this._x = x;
    this._y = y;
  }
  get x(){return this._x};
  get y(){return this._y};
  get width(){return this._x};
  get height(){return this._y};
}

export enum dirs { Horizontal, Vertical }

export class Layout extends PIXIfeatureComponent {
  
  static maskArea:PIXI.Container;
  static _init = false;
  ev = new EV();
  
  _dir = dirs.Vertical;
  _needLayout = false;
  margin = new Vec2();
  _padding = new Vec2(5, 5);
  _size = new Vec2(Infinity, Infinity);
  round = 0;
  maxCols = Infinity;
  mask:PIXI.Graphics;
  get size(){
    return this._size;
  }
  set size(s){
    if(this._size != s){
      this._size = s;
      this.ev.emit(Model.EVS.change, this._size);
    }
  }
  get padding(){
    return this._padding;
  }
  set padding(p){
    if(this._padding != p){
      this._padding = p;
      this.ev.emit(Model.EVS.change, this._padding);
    }
  }
  _childpos = this._updateLayoutBase;
  _childsize = this._simpleChildSize;
  constructor() {
    super();
    if(!Layout._init){
      Layout._init = true;
      Layout.maskArea = new PIXI.Container();
    }
    Model.instance.addTarget(this, Model.EVS.transformChange, this._check.bind(this));
    this.ev.on(Model.EVS.change, this.OnChange);
    this.ev.on(Model.EVS.change, this.OnChange);
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    const {width, height} = this.size;
    graphics.drawRoundedRect(0, 0, width, height, this.round);
    this.mask = graphics;
  }
  OnChange(target){
    if(target === this.size){
      this._Resize();
    }
    else if(target === this.padding && this.container){
      
    }
  }
  Start(){
    super.Start();
    this.container.mask = this.mask;
  }
  _Destroy(){
    Model.remove(this.mask);
  }
  _Resize(){
    this.mask.clear();
    const {width, height} = this.size;
    this.mask.drawRoundedRect(0, 0, width, height, this.round);
  }
  _check(target) {
    if (target.parent != this.container) return;
    this._needLayout = true;
  }
  SetChildPosGetter(fn){
    this._childpos = fn;
  }
  SetChildSizeGetter(fn){
    this._childsize = fn;
  }
  Children(){
    return this.container.children.filter((c)=>{
      return (!c.isMask) && c != this.mask;
    })
  }
  Update() {
    const scene = Model.scene();
    if(this.container.parent != this.mask.parent){
      (this.container.parent as PIXI.Container).addChild(this.mask);
    }
    this.mask.x = this.container.x;
    this.mask.y = this.container.y;
    if (this._needLayout) {
      this.UpdateLayout();
    }
  }
  UpdateLayout() {
    this._needLayout = false;
    this._childpos();
  }
  _simpleChildSize(c){
    return {width:c.width, height:c.height};
  }
  _updateLayoutBase() {
    let x = 0;
    let y = 0;
    let i = 1;
    let maxHeight = -1;
    this.Children().forEach((c) => {
      c.x = x;
      c.y = y;
      const {width, height} = this._childsize(c);
      maxHeight = Math.max(height, maxHeight);
      x += width + this.margin.x;
      i ++;
      if(i >= this.maxCols){
        y += maxHeight + this.margin.y;
      }
    })
  }
}