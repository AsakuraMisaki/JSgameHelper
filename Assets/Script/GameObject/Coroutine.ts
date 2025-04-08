import { Model } from "./Model";

class Coroutine{
  static coroutines = new Set();
  static gc = new Set();
  _promise:Promise<any>;
  constructor(){ };
  static StartCoroutine(generatorFunc){
    return this.ProcessCoroutine(generatorFunc());
  }
  static async ProcessCoroutine(generator) {
    let result;
    while (true) {
        const { value, done } = generator.next(result);
        
        if (done) {
            return value; // 协程完成
        }
        
        try {
            // 处理yield返回的值
            if (value instanceof Coroutine) {
              result = await value._promise;
            }
            if (value instanceof Promise) {
                result = await value;
            } else if (typeof value === 'function') {
                result = await value();
            } else {
                result = await Promise.resolve(value);
            }
        } catch (error) {
            generator.throw(error);
            throw error;
        }
    }
  }
}
class WaitForSecondsRealtime extends Coroutine{
  constructor(time:number){
    super();
    this._promise = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(1);
      }, time * 1000)
    })
  }
}
class WaitForSeconds extends Coroutine{
  constructor(time:number){
    super();
    this._promise = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(1);
      }, time * 1000)
    })
  }
}
class WaitForEndOfFrame extends Coroutine{
  _frame = 0;
  _updateFrame = null;
  constructor(frame=1){
    super();
    this._frame = frame;
    this._promise = new Promise((resolve, reject)=>{
      this._updateFrame = this.updateFrame.bind(this, resolve, reject);
      Model.ticker().add(this._updateFrame);
    })
  }
  updateFrame(resolve, reject){
    this._frame--;
    console.log(this._frame);
    if(this._frame <= 0){
      resolve(1);
      Model.ticker().remove(this._updateFrame)
    }
  }
}
class Task extends Coroutine{
  checker:()=>Boolean;
  _resolve: (value:any)=>any;
  _reject: (value:any)=>any;
  frequency = 1;
  _frequency = 0;
  static runnings:Set<Task> = new Set();
  static _init = false;
  static updateRunnings(){
    let removed:Array<Task> = [];
    this.runnings.forEach((task)=>{
      let done = task.update();
      if(done){
        removed.push(task);
      }
    })
    removed.forEach((task)=>{
      this.runnings.delete(task);
    })
  }
  constructor(){
    super();
    if(!Task._init){
      Task._init = true;
      Model.ticker().add(Task.updateRunnings.bind(Task));
    } 
    this._promise = new Promise((resolve, reject)=>{
      this._resolve = resolve;
      this._reject = reject;
    })
  }
  update(): Boolean{
    if((this._frequency++) < this.frequency) return false;
    this._frequency = 0;
    if(!this.checker){
      this._resolve(-1);
      return true;
    }
    let check = this.checker();
    if(check){
      this._resolve(check);
      return true;
    }
    return false;
  }
}