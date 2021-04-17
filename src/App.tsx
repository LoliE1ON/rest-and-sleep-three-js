import React, { useEffect, useState } from "react";
import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { initialization } from "./engine/initialization";
import { createPlayer } from "./engine/player";

export function App() {
  const [engine] = useState({
    scene: new Scene(),
    camera: new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: new WebGLRenderer(),
  });

  // initial
  useEffect(() => {
    initialization(engine);
    createPlayer(engine);

    (function animate() {
      requestAnimationFrame(animate);
      engine.renderer.render(engine.scene, engine.camera);
    })();
  }, []);

  return <div></div>;
}
