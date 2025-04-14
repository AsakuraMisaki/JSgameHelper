import { Component } from "./Component";
import { Transform } from "./Transform";
import { PIXI } from "./Types";

export class GameObject{
  static gc:Set<Component|GameObject> = new Set();
  static starting:Set<Component> = new Set();
  static prefabs:Map<number, GameObject> = new Map();
  static sourceId:number = 0;
  static Destroy(target){
    this.gc.add(target);
  } 
  static Instantiate(target){
    const prefab = this.prefabs.get(target.sourceId);
    return prefab;
  } 
  
  sourceId:number = 0;
  name:string = "";
  tag:string = "";
  components:Map<Function, Set<Component>> = new Map();
  constructor(name=""){
    this.name = name;
    this.sourceId = GameObject.sourceId++;
    this.AddComponent(new Transform());
  }
  AddComponent<T extends Component>(a: T):T{
    const set = this.components.get(a.constructor);
    if(!set){
      this.components.set(a.constructor, new Set());
      return this.AddComponent(a);
    }
    set.add(a);
    a.gameObject = this;
    return a;
  }
  GetComponent<C extends Component, A extends PIXI.Container>(T:Function):null|C|A{
    const set = this.components.get(T);
    if(!set) return null;
    let targets = Array.from(set);
    return targets[0] as C;
  }
  GetComponentsFromChildren<C extends Component>(T:Function, self=true, recusive=true):Array<C>{
    let targets = [];
    return targets;
  }
  Update(){
    this.components.forEach((set)=>{
      Array.from(set).forEach((com)=>{
        if(com instanceof PIXI.Container) return;
        if(com instanceof Component){
          if(!com._start){
            com.Start();
          }
          else if(com._enable){
            com.Update();
          }
          if(com._destroy){
            set.delete(com);
            GameObject.gc.delete(com);
            com._Destroy();
          }
        }
      })
    })
  }
}