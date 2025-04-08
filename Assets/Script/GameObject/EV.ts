
export class EV{
  events: Map<string, Map<Function, {z:number, size:number, once:boolean}>>;
  constructor(){
    this.init();
  }
  init(){
    this.events = new Map();
  }
  on(name, cb:(...args:any[])=>any, z=1, once=false) {
    let list = this.events.get(name);
    if (!list) {
      this.events.set(name, new Map());
      return this.on(name, cb, z, once);
    }
    let size = list.size;
    list.set(cb, { z, once, size });
    let newList = this.sort(list);
    this.events.set(name, newList);
    return cb;
  }
  sort(list:Map<Function, {z:number, size:number, once:boolean}>){
    let temp = Array.from(list.entries());
    temp.sort((a, b) => {
      let a1 = a[1];
      let b1 = b[1];
      let z = b1.z - a1.z; //层级越高 越先执行
      if(!z){
        return b1.size - a1.size; //按添加顺序执行
      }
      return z;
    })
    return new Map(temp);
  }
  clear(name) {
    if (!name) {
      this.events.clear();
      return;
    }
    this.events.delete(name);
  }
  clearMethods(...methods) {
    methods.forEach((m)=>{
      this.events.forEach((map, name)=>{
        map.delete(m);
      })
    })
  }
  once(name, cb, z=1) {
    return this.on(name, cb, z, true);
  }
  off(name, cb) {
    if (!cb) {
      this.events.delete(name);
      return;
    }
    let list = this.events.get(name);
    if(!list) return;
    list.delete(cb);
  }
  emitonly(name, cb, ...args) {
    let list = this.events.get(name);
    if (!list) return;
    let options = list.get(cb);
    this._emit(options, cb, list, args);
  }
  emit(name, ...args) {
    let list = this.events.get(name);
    if (!list) return;
    list.forEach((options, cb, list) => {
      this._emit(options, cb, list, ...args);
    })
    return;
  }
  _emit(options, cb, list, ...args) {
    cb(...args);
    if (options.once) {
      list.delete(cb);
    }
  }
}

