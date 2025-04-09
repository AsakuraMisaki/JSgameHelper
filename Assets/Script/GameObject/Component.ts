import { GameObject } from "./GameObject";
import { PIXI } from "./Types";


export abstract class Component{
  _gameObject:GameObject;
  _enable:Boolean = true;
  _start:Boolean = false;
  get _destroy(){
    return GameObject.gc.has(this);
  }
  get enable(){
    return this._enable;
  }
  set enable(b){
    if(this._enable != b && b){
      this._enable = b;
      this.Awake();
    }
  }
  // get _start(){
  //   return this._gameObject != null;
  // }
  // set _start(gameObject){
  //   this._gameObject = gameObject;
  // }
  get gameObject(){
    return this._gameObject || new GameObject();
  }
  set gameObject(g){
    this._gameObject = g;
    this._GameObjectUpdate();
  }
  constructor(){ };
  _GameObjectUpdate(){ };
  Awake(){ };
  Start(){ };
  Update(){ };
  _Destroy(){ };
}
export class PIXIfeatureComponent extends Component{
  container: PIXI.Container;
}
