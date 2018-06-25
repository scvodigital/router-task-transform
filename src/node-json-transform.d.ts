declare module 'node-json-transform' {
  export function DataTransform(data: any, map: TransformMap): Transformer;
  export interface Transformer {
    transform: Function;
  }
  export interface TransformMap {
    list: string;
    item: any;
    operate: TransformOperation[],
    each(item: any): any;
  }
  export interface TransformOperation {
    on: string;
    run: string | Function;
  }
}
