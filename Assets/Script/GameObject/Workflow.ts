class Workflow{
  ws:WebSocket;
  constructor(path:string){
    this.ws = new WebSocket(path);
    this.ws.addEventListener("open", this.onOpen);
    this.ws.addEventListener("message", this.onMessage);
  }
  onOpen(){
    this.ws.send(JSON.stringify( { message:"open" } ));
  }
  onMessage(ev:MessageEvent<any>){
    console.log(ev);
  }
}

class typeProperty{
  id: number
  kind: number
  name: string
  flags: {
    isInherited?: boolean
  }
  type:{
    type: string
    target: number | { packageName: string }
    name: string
  }
}
class typespace{
  id: number
  kind: number
  name: string
  children: Array<typespace|typeProperty>
  implementedTypes?: [{ target:number }]
  extendedTypes?: [{ target:number }]
  static kindNamespace:number = 4
  static kindModule:number = 1
  static kindClass:number = 128
  static kindEnum:number = 8
  static kindMember:number = 1024
}
class MakeCS{
  typespace:typespace = null;
  kindCaches:Map<number, [string, string]> = new Map();
  constructor(typespace:typespace){
    this.typespace = typespace;
  }
  exec(){
    this.save(this.typespace);
    console.log(this.kindCaches);
    this._exec();
  }
  save(obj:typespace){
    if(obj.kind == typespace.kindNamespace || obj.kind == typespace.kindModule){
      obj.children.forEach((c)=>{
        this.save(c as typespace);
      })
    }
    else if(obj.kind == typespace.kindClass){
      this.kindCaches.set(obj.id, ["class", obj.name]);
    }
    else if(obj.kind == typespace.kindEnum){
      this.kindCaches.set(obj.id, ["enum", obj.name]);
    }
  }
  _exec(){

  }
}
function test(){
  const fs = require("fs");
  let content:string = fs.readFileSync("./output.json", { encoding:"utf-8" });
  let obj:typespace = JSON.parse(content);
  let a = new MakeCS(obj);
  a.exec();
}
test();