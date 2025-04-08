import { GameObject } from "./GameObject"

export class Bitmap{
  _donotDestroy: boolean
  addLoadListener: (...args:any[])=>Bitmap
  _baseTexture: PIXI.BaseTexture
}

export class ImageManager{
  static loadBitmapFromUrl: (...args:any[])=>Bitmap
}

export namespace Graphics{
  export class app{
    static ticker: {
      add: (...args:any[])=>any
      remove: (...args:any[])=>any
    }
  }
}


export namespace SceneManager{
  export class _scene{

  }
}

export namespace PIXI{
  export class Transform{
    _localID: number
    applyInverse: (pos:Point, newPos:Point)=>Point
  }
  export class Point{
    x: number
    y: number
  }
  export class Rectangle{
    contains: (x:number, y:number)=>Boolean
    x: number
    y: number
    width: number
    height: number
  }
  export class EventEmitter{
    on: (...args:any[])=>any
    once: (...args:any[])=>any
    off: (...args:any[])=>any
    emit: (...args:any[])=>any
  }
  export class Container extends EventEmitter{
    addChild: (...args:any[])=>Container
    removeChild: (...args:any[])=>Boolean
    removeChildren: ()=>Boolean
    width: number
    height: number
    x: number
    y: number
    children: Array<Container>
    isMask: Boolean
    parent: Container | null
    gameObject: GameObject | null
    transform: Transform
    hitArea: Rectangle
    get mask(){
      return this._mask;
    }
    set mask(m: Sprite | Graphics | Text){
      this._mask = m;
    }
    _mask: Sprite | Graphics | Text
    worldTransform: Transform
  }
  export class BaseTexture extends EventEmitter{
    source: any
    static from: (any:any)=>BaseTexture
  }
  export class Texture extends EventEmitter{
    baseTexture: BaseTexture
    constructor(b:BaseTexture){ super() }
  }
  export class Sprite extends Container{
    texture: Texture
    containsPoint: (p:Point)=>Boolean
  }
  export class Graphics extends Container{
    texture: Texture
    containsPoint: (p:Point)=>Boolean
    beginFill: (value:any)=>any
    drawRoundedRect: (...values:any[])=>any
    clear: (...values:any[])=>any
  }
  export class Text extends Container{
    text: String
    containsPoint: (p:Point)=>Boolean
  }
}