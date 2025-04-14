import { Component } from "./Component";
import { Container } from "./Container";
import { Model } from "./Model";
import { Resource } from "./Resource";
import { Bitmap, PIXI } from "./Types";

export class Sprite extends Container{
  public tex: Resource
  public resolution: number = 1
  loaders: Set<Function> = new Set();
  canUpdate: boolean = false;
  Start(): void {
    let sprite = this.container as PIXI.Sprite;
    Model.safeload(this.tex.uid).then(({bitmap, tex, base})=>{
      sprite.texture = tex;
      this._Load(bitmap, tex, base);
    })
  }
  _Load(bitmap:Bitmap, tex:PIXI.Texture, base:PIXI.BaseTexture){
    this.loaders.forEach((fn)=>{
      fn(bitmap, tex, base);
    })
  }
}