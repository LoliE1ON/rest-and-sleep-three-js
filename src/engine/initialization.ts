import { AmbientLight, CubeTextureLoader, DirectionalLight, Fog, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Engine } from "./common.types";
import { skybox } from "./config/texture";
import { ambientLight, directionalLight, fog } from "./config/color";

export function initialization({ renderer, camera, scene }: Engine) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const cameraPosition = new Vector3(5, 2, 0);
  camera.position.set(...cameraPosition.toArray());

  const loaderSky = new CubeTextureLoader();
  const textures = loaderSky.load(skybox);
  scene.background = textures;
  scene.environment = textures;

  scene.add(new AmbientLight(ambientLight));

  const light = new DirectionalLight(directionalLight, 0.8);
  light.position.set(50, 200, 100);
  light.position.multiplyScalar(1.3);

  light.castShadow = true;
  light.shadow.mapSize.width = 4024;
  light.shadow.mapSize.height = 4024;

  const shadowOffset = 300;
  light.shadow.camera.left = -shadowOffset;
  light.shadow.camera.right = shadowOffset;
  light.shadow.camera.top = shadowOffset;
  light.shadow.camera.bottom = -shadowOffset;
  light.shadow.camera.far = 1000;

  scene.add(light);
  scene.fog = new Fog(fog, 5, 15);

  new GLTFLoader().load("Models/main.gltf", model => {
    scene.add(model.scene);
  });
}
