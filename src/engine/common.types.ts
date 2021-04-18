import { Camera, Scene, WebGLRenderer } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

export type Engine = {
  readonly renderer: WebGLRenderer;
  readonly camera: Camera;
  readonly scene: Scene;
  readonly controls: PointerLockControls;
  readonly controlsParameters: any;
};
