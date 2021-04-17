import { AmbientLight, CubeTextureLoader, DirectionalLight, Fog } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// @ts-ignore
export function initialization({ renderer, camera, scene }) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 0;

  const loaderSky = new CubeTextureLoader();
  const textures = loaderSky.load([
    "Hdri/sky/Front.png",
    "Hdri/sky/Back.png",
    "Hdri/sky/Up.png",
    "Hdri/sky/Down.png",
    "Hdri/sky/Right.png",
    "Hdri/sky/Left.png",
  ]);
  scene.background = textures;
  scene.environment = textures;

  scene.add(new AmbientLight(0x000000));

  const light = new DirectionalLight(0x00035a, 0.8);
  light.position.set(50, 200, 100);
  light.position.multiplyScalar(1.3);

  light.castShadow = true;
  light.shadow.mapSize.width = 4024;
  light.shadow.mapSize.height = 4024;

  const d = 300;
  light.shadow.camera.left = -d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = -d;

  light.shadow.camera.far = 1000;
  scene.add(light);

  scene.fog = new Fog(0x000b86, 5, 15);
  renderer.render(scene, camera);

  const loader = new GLTFLoader();
  loader.load("Models/main.gltf", model => {
    scene.add(model.scene);
  });
}
