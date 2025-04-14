// @ts-ignore
const fs = require("fs");


class Workflow {
  ws: WebSocket;
  constructor(path: string) {
    this.ws = new WebSocket(path);
    this.ws.addEventListener("open", this.onOpen);
    this.ws.addEventListener("message", this.onMessage);
  }
  onOpen() {
    this.ws.send(JSON.stringify({ message: "open" }));
  }
  onMessage(ev: MessageEvent<any>) {
    console.log(ev);
  }
}
class typeFlags {
  isAbstract?: boolean
  isPublic?: boolean
  isInherited?: boolean
  isProtected?: boolean
}
class BlockTags{
  tag: string
  content: [{
    kind: string
    text?: string
  }]
}
class BlockTagsExtend{
  unity: string = ""
  isColor: boolean = false
  dropdown: string = ""
}
class typeProperty {
  id: number
  kind: number
  name: string
  flags: typeFlags
  comment?:{
    temp: number,
    blockTags?: Array<BlockTags> 
  }
  type: {
    type: string
    target: number | { packageName: string }
    name: string
  }
  children?: Array<typespace | typeProperty>
  defaultValue: string
}
class typespace {
  id: number
  kind: number
  name: string
  flags: typeFlags
  comment?:{
    temp: number,
    blockTags?: Array<BlockTags> 
  }
  
  children: Array<typespace | typeProperty>
  implementedTypes?: [{ target: number }]
  extendedTypes?: [{ target: number }]
  parent: number
  
  static kindNamespace: number = 4
  static kindModule: number = 1
  static kindClass: number = 128
  static kindInterface: number = 256
  static kindEnum: number = 8
  static kindMember: number = 1024
  static kindEnumItem: number = 16
  static mono = "Component";
  static kindProperty = [this.kindMember, this.kindEnumItem];
  static kindSpace = [this.kindNamespace, this.kindClass, this.kindEnum, this.kindModule, this.kindInterface];
  static kindCS = {
    "boolean": "bool",
    "number": "float",
    "array": "List",
    "set": "List",
    "string": "string",
    "map": "Dictionary", // 不支持序列化
    "Infinity": Math.pow(2, 32),
    "-Infinity": Math.pow(2, 32)
  }
}
class MakeCS {
  temp:number = 1;
  typespace: typespace = null;
  kindCaches: Map<number, [string, string, Set<string>, number, typespace]> = new Map();
  // kindCachesForCheck:Map<number, typespace> = new Map();
  constructor(typespace: typespace) {
    this.typespace = typespace;
  }
  checkExtend(topRule: (a: typespace, b: typespace) => boolean, current: typespace, origin: typespace) {
    if (!current) return;
    if (topRule(current, origin)) return true;
    else if (current.extendedTypes && current.extendedTypes[0].target > 0) {
      let parent = this.kindCaches.get(current.extendedTypes[0].target);
      if (parent) {
        return this.checkExtend(topRule, parent[4], origin);
      }
    }
  }
  _checkIsComponent(parent: typespace, child: typespace) {
    return parent.name == "Component" && parent.flags.isAbstract && (child.extendedTypes && child.extendedTypes[0]);
  }
  exec(namespace = "PIXIJS_Component", path="../Components/", Sirenix=true) {
    this.typespace.name = namespace;
    let cache: Map<number, [typespace, string]> = new Map();
    this.save(this.typespace, cache);
    let root = cache.get(0);
    if (root) {
      // let file = root[1].replace(/\/\/\$(\d+)\$\/\//g, (m):string=>{
      //   const id = Number(/\/\$(\d+)\$\//i.exec(m)[1]);
      //   const obj = cache.get(id);
      //   let parent = this.getTargetCacheRelativeName(obj[0], obj[0].name, cache);
      //   // if(parent)
      //   return parent;
      // })
      root[0].children.forEach((obj) => {
        let uFile = cache.get(obj.id);
        let file = uFile[1].replace(/\/\/\&(\d+)\&\/\//g, (m): string => {
          const id = Number(/\/\/\&(\d+)\&\/\//i.exec(m)[1]);
          const obj = cache.get(id);
          let parent = this.getTargetCacheRelativeName(obj[0], obj[0].name, cache);
          if(parent.obj.kind == typespace.kindEnum){
            if(Sirenix){
              return `[EnumPaging]\n public ${parent.name}`;
            }
            return `public ${parent.name}`;
          }
          else if(parent.obj.kind == typespace.kindClass){
            return `public ${parent.name}`;
          }
          return parent.name;
        })
        file = file.replace(/\/\/\$(\d+)\$\/\//g, (m): string => {
          const id = Number(/\/\$(\d+)\$\//i.exec(m)[1]);
          const obj = cache.get(id);
          let parent = this.getTargetCacheRelativeName(obj[0], obj[0].name, cache);
          return parent.name;
        })
        let result = [
          "using System;",
          "using UnityEngine;",
          "using System.Collections.Generic;",
          Sirenix ? "using Sirenix.OdinInspector;" : "",
          `namespace ${namespace}\n{\n${file}\n}\n`
        ]
        fs.writeFileSync(`./${path}/PIXI_${obj.name}.cs`, result.join("\n"), {encoding:"utf-8"});
      })

      // console.log(file);

    }

    // this._exec(this.typespace);
    // console.log(this.kindCaches);
    // this.makeFile();
    // console.log(cache);
  }
  getTargetCacheRelativeName(obj: typespace, result: string, cache: Map<number, [typespace, string]>): {name:string, obj:typespace} {
    if (obj.parent > 0) {
      result = `${this.getTargetCacheRelativeName(cache.get(obj.parent)[0], result, cache).name}` + "." + result;
      return { name:result, obj };
    }
    // if(!obj) return "";
    // if(obj.parent == 0 || !obj.parent) return "";
    // else if(obj.parent){
    //   result += `${this.getTargetCacheRelativeName(cache.get(obj.parent)[0], result, cache)}`; 
    //   return result;
    // }
    return {name:obj.name, obj};
  }
  getHeritedObject(types: Array<any> | null): number {
    if (!types) return -1;
    if (!types.length) return -1;
    return types[0].target as number;
  }
  getPropObject(info: any): number | string {
    if (info.target && info.target > 0) return info.target;
    if (info.name) return typespace.kindCS[info.name.toLowerCase()];
  }
  save(obj: typespace | typeProperty, cache: Map<number, [typespace, string]> = new Map(), parent: typespace = {} as typespace) {
    let result = "";
    if (obj.kind == typespace.kindMember &&
      (obj.flags.isPublic || (parent && parent.flags.isPublic))
      && !obj.flags.isInherited && !obj.flags.isProtected) {
      obj = obj as typeProperty;
      let prop = this.getPropObject(obj.type);
      obj = obj as typeProperty;
      let exInfo = this.processBlockTags(obj);
      let rr = "";
      if(exInfo.isColor){
        rr = `public Color ${obj.name};\n`;
      }
      else if (typeof (prop) == "string") {
        let dv = `${typespace.kindCS[obj.defaultValue] || obj.defaultValue || ""}`;
        if(dv) dv = " = " + dv; 
        if(prop == "float" && dv){
          dv += "f";
        }
        rr = `public ${prop} ${obj.name}${dv};\n`;
      }
      else if (typeof (prop) == "number") {
        rr = `//&${prop}&// ${obj.name};\n`;
      }
      if (exInfo.dropdown.length) {
        rr = `${exInfo.dropdown}\n${rr}`;
      }
      if (exInfo.unity.length) {
        rr = `${exInfo.unity}\n${rr}`;
      }
      return rr;
    }
    else if (obj.kind == typespace.kindEnumItem) {
      return `${obj.name},`;
    }
    else {
      obj = obj as typespace;
      if (typespace.kindSpace.indexOf(obj.kind) < 0) return "";
      if (parent) {
        obj.parent = parent.id;
      }
      let content = "", header = "";
      if (obj.kind == typespace.kindInterface) {
        let implementedTypes = this.getHeritedObject(obj.implementedTypes);
        let target = implementedTypes < 0 ? "" : ` : //$${implementedTypes}$//`;
        header = `public interface ${obj.name}${target}`;
      }
      else if (obj.kind == typespace.kindClass) {
        let extendedTypes = this.getHeritedObject(obj.extendedTypes || obj.implementedTypes);
        let target = extendedTypes < 0 ? "" : ` : //$${extendedTypes}$//`;
        if (obj.flags.isAbstract && obj.name == typespace.mono) {
          target = ` : MonoBehaviour`;
        }
        header = `[Serializable]\npublic class ${obj.name}${target}`;
      }
      else if (obj.kind == typespace.kindEnum) {
        header = `[Serializable]\npublic enum ${obj.name}`;
      }
      else if (obj.kind == typespace.kindNamespace) {
        header = `namespace ${obj.name}`;
      }
      else if (obj.kind == typespace.kindModule) {
        header = `namespace ${obj.name}`;
      }
      if (obj.children) {
        obj.children.forEach((_) => {
          let r = this.save(_, cache, obj as typespace);
          content += r;
        })
      }
      if (header) {
        result = `${header}\n{\n${content}\n}\n`;
      }
      cache.set(obj.id, [obj, result]);

      return result;
    }

  }
  makeDefaultValue(theClass, target) {
    if (theClass) {

    }
  }
  processBlockTags(obj: typespace|typeProperty):BlockTagsExtend{
    let info = new BlockTagsExtend();
    if(!obj.comment) return info;
    if(!obj.comment.blockTags) return info;
    obj.comment.temp = obj.comment.temp || 1;
    obj.comment.blockTags.forEach((t)=>{
      if(/^\@unity/i.test(t.tag)){
        info.unity = `${t.content[0].text}`;
      }
      else if(/^\@dropdown/i.test(t.tag)){
        let options = t.content[0].text.split(/\s+/g);
        let values_ = `values_${this.temp++}`;
        // if(!isNaN(Number(options[0]))){
        //   info.dropdown = `private List<float> ${values_} = {${options.join(",")}}`
        // }
        // else 
        if(options[0]){
          let ops = options.map((s)=>`"${s}"`);
          info.dropdown = `private List<string> ${values_} = new List<string>(){${ops.join(",")}};`
        }
        info.dropdown += `\n[ValueDropdown("${values_}")]`;
      }
      else if(/^\@color/i.test(t.tag)){
        info.isColor = true;
      }
    })
    return info;
  }
  
  _exec(obj: typespace, set = new Set(), flags: { isPublic?: boolean } = {}) {
    obj.children.forEach((target) => {
      if (typespace.kindProperty.indexOf(target.kind) >= 0) {
        target = target as typeProperty;
        if (target.kind == typespace.kindEnumItem) {
          set.add(`${target.name}, `);
        }
        else if (target.flags.isPublic || (flags && flags.isPublic)) {
          if (target.flags.isInherited || target.flags.isProtected) return;
          let kindTarget = this.kindCaches.get(target.type.target as number);
          let name = "";
          let isClassLike = false;
          if (kindTarget) {
            name = kindTarget[1] + "_" + target.type.target; //名+id
            isClassLike = true;
          }
          else {
            let built = typespace.kindCS[target.type.name.toLocaleLowerCase()];
            if (built) {
              name = built;
            }
          }
          if (name) {
            let dv = isClassLike ? "" : ` = ${typespace.kindCS[target.defaultValue] || target.defaultValue}`;
            set.add(`\npublic ${name} ${target.name}${dv};`);
          }
        }
      }
      else if (typespace.kindSpace.indexOf(target.kind) >= 0) {
        target = target as typespace;
        let caches = this.kindCaches.get(target.id);
        let set = new Set();
        if (caches) {
          set = caches[2];
        }

        this._exec(target, set, target.flags);
      }
    })
  }
  makeFile(path = "./ttt.cs") {

    let all = "";
    let collections: Set<string> = new Set();
    this.kindCaches.forEach((infoer, id) => {
      let content = "";
      Array.from(infoer[2]).forEach((v) => {
        content += v;
      })
      let ex = "";
      if (infoer[3] > 0) {
        let parent = this.kindCaches.get(infoer[3]);
        if (parent) {
          ex = ` : ${parent[1]}_${infoer[3]}`;
        }
      }
      let kindName = Number(infoer[0]) == typespace.kindEnum ? "enum" : "class";
      let realName = `${infoer[1]}_${id}`;
      let result = `[Serializable]\npublic ${kindName} ${realName}${ex}\n{\n ${content} \n}\n`;
      console.log(result);
      all += result;
      if (this.checkExtend(this._checkIsComponent.bind(this), infoer[4], infoer[4])) {
        collections.add(realName);
      }
    })
    console.log(all, collections);
    fs.writeFileSync(path, all, { encoding: "utf-8" });
  }
}

function test() {
  
  let path = `./output.json`;
  console.log(path);
  let content: string = fs.readFileSync(path, { encoding: "utf-8" });
  let obj: typespace = JSON.parse(content);
  let a = new MakeCS(obj);
  a.exec();
}
test();