import React, { useEffect, useState } from "react";
import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, Color } from "three";
import { initialization } from "./engine/initialization";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { setupControl, updateControl } from "./engine/control";

export function App() {
  const [camera] = useState(new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const [engine] = useState({
    scene: new Scene(),
    renderer: new WebGLRenderer(),
    controls: new PointerLockControls(camera, document.body),
    controlsParameters: {
      objects: [],
      raycaster: null,
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      canJump: false,
      prevTime: performance.now(),
      velocity: new Vector3(),
      direction: new Vector3(),
      vertex: new Vector3(),
      color: new Color(),
    },
    camera,
  });

  useEffect(() => {
    let prevTime = performance.now();
    initialization(engine);

    const control = setupControl(engine);

    (function animate() {
      requestAnimationFrame(animate);

      const time = performance.now();
      updateControl({
        engine,
        time,
        prevTime,
      });
      prevTime = time;

      engine.renderer.render(engine.scene, engine.camera);
    })();
  }, []);

  return <div></div>;
}
