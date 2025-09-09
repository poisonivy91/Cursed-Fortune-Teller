/// <reference types="vite/client" />

declare interface Window {
  __ENV__?: {
    endpoint: string;
    project: string;
    db: string;
    col: string;
  };
}
