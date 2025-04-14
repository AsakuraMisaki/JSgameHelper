import { Container } from "./Container";
import { PIXI } from "./Types";

export enum GraphicsType{ Circle, Rect,  };
export class Graphics extends Container{
  public type:GraphicsType;

  public ax:number = 0.5;
  public ay:number = 0.5;

  /** @color */
  public color:number = 0x3f3f3f;

  /** @unity [ShowIf("type", GraphicsType.Circle)] */
  public radius:number = 10;

  /** @unity [ShowIf("type", GraphicsType.Rect)] */
  public round:number = 5;
  public width:number = 20;
  public height:number = 20;

  get container(){
    return this.gameObject.GetComponent(PIXI.Graphics) as PIXI.Graphics;
  }
  Start(): void {
    this._Refresh();
  }
  _Refresh(){
    this.container.clear();
    this.container.beginFill(this.color);
    if(this.type == GraphicsType.Circle){
      this.container.drawCircle(0, 0, this.radius);
    }
    else if(this.type == GraphicsType.Rect){
      this.container.drawRoundedRect(0, 0, this.width, this.height, this.round);
    }
  }
}