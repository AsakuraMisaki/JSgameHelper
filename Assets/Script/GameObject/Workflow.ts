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