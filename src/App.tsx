import React, { useEffect, useState } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  CubeTextureLoader,
  AmbientLight,
  DirectionalLight,
  Fog,
  Object3D,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  Vector2,
  Layers,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { initialization } from "./components/initialization";

export function App() {
  const [scene] = useState(new Scene());
  const [camera] = useState(new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const [renderer] = useState(new WebGLRenderer());

  // initial
  useEffect(() => {
    initialization({
      renderer,
      camera,
      scene,
    });

    setInterval(() => {
      renderer.render(scene, camera);
    }, 50);
  }, []);

  // player
  useEffect(() => {
    const spawnPosition: Vector3 = new Vector3(0, 0, 0);
    const geometry = new BoxGeometry(0.2, 0.2, 0.2);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    scene.add(cube);
    cube.position.z = 1;
  }, []);

  return <div></div>;
}
