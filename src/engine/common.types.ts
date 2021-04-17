import { Camera, Scene, WebGLRenderer } from "three";

export type Engine = {
  readonly renderer: WebGLRenderer;
  readonly camera: Camera;
  readonly scene: Scene;
};
