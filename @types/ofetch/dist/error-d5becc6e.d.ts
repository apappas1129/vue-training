import { FetchRequest, FetchOptions, FetchResponse } from 'ofetch';

declare module 'ofetch' {

  // Necessary rewrite for types to be resolved
  type Fetch = typeof globalThis.fetch;
  export type MappedType<R extends ResponseType, JsonType = any> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;
  interface ResponseMap {
    blob: Blob;
    text: string;
    arrayBuffer: ArrayBuffer;
    stream: ReadableStream<Uint8Array>;
  }

  // #region Desired exports (ATTOW., current ofetch d.ts does not export the following)
  export type ResponseType = keyof ResponseMap | 'json';
  // So much work done just for one desired export =_="
  // #endregion

  // Necessary rewrite to resolve conflicting types
  // (rewritten types from module augmentation vs. from original *.d.ts) to be resolved
  export interface $Fetch {
    <T = any, R extends ResponseType = 'json'>(
      request: FetchRequest,
      options?: FetchOptions
    ): Promise<MappedType<R, T>>;
    raw<T = any, R extends ResponseType = 'json'>(
      request: FetchRequest,
      options?: FetchOptions
    ): Promise<FetchResponse<MappedType<R, T>>>;
    native: Fetch;
    create(defaults: FetchOptions): $Fetch;
  }
}

