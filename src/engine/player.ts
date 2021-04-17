import { Engine } from "./common.types";
import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { playerSpawnPosition } from "./config/position";

export function createPlayer({ scene }: Engine) {
  const geometry = new BoxGeometry(0.2, 0.2, 0.2);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material);
  cube.position.set(...playerSpawnPosition.toArray());

  scene.add(cube);
}
