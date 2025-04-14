/** @public */
export class Resource{
  uid:string
  callback:(...args:any[])=>boolean
}