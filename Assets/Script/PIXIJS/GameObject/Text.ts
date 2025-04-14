import { Container } from "./Container"
import { PIXI } from "./Types"

/** @public */
export class TextStyle{
  /** @dropdown left center right  */
  align:string = "left"
  breakWords: boolean
  dropShadow: boolean
  dropShadowAlpha: number
  dropShadowAngle: number
  dropShadowBlur: number
  /** @color */
  dropShadowColor: number
  dropShadowDistance: number
  /** @color */
  fill: number
  fontFamily: string
  fontSize: number
  /** @dropdown normal bold light  */
  fontStyle: string = "normal"
  letterSpacing: number
  lineHeight: number
  padding: number
  /** @color */
  stroke: number
  strokeThickness: number
  /** @dropdown alphabetic top hanging middle ideographic bottom */
  textBaseline: string = "alphabetic"
  trim: boolean
  wordWrap: boolean
  charWrap: boolean
  wordWrapWidth: number
  leading: number
}
export class Text extends Container{
  /** @unity [TextArea(4, 10)] */
  public _text:string = "";
  public formatter:boolean = true;
  public style:TextStyle

  get container(){
    return this.gameObject.GetComponent(PIXI.Text) as PIXI.Text;
  }
  get text(){ return this._text };
  set text(t){ 
    if(this._text != t){
      this._text = t;
      this.container.text = this._text;
    }
  }
}