import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { Color, Raycaster, Vector3 } from "three";
import { Engine } from "./common.types";

export function setupControl({ camera, scene, controls, controlsParameters }: Engine) {
  document.addEventListener("click", () => controls.lock(), false);

  scene.add(controls.getObject());

  const onKeyDown = function (event: { code: any }) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        controlsParameters.moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        controlsParameters.moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        controlsParameters.moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        controlsParameters.moveRight = true;
        break;

      case "Space":
        if (controlsParameters.canJump) controlsParameters.velocity.y += 350;
        controlsParameters.canJump = false;
        break;
    }
  };

  const onKeyUp = function (event: { code: any }) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        controlsParameters.moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        controlsParameters.moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        controlsParameters.moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        controlsParameters.moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  // @ts-ignore
  controlsParameters.raycaster = new Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 2);

  return {
    controls,
    ...controlsParameters,
  };
}

// @ts-ignore
export function updateControl({ engine, time, prevTime }) {
  if (engine.controls.isLocked) {
    engine.controlsParameters.raycaster.ray.origin.copy(engine.controls.getObject().position);
    engine.controlsParameters.raycaster.ray.origin.y -= 2;

    const intersections = engine.controlsParameters.raycaster.intersectObjects(engine.controlsParameters.objects);

    const onObject = intersections.length > 0;

    const delta = (time - prevTime) / 1000;

    engine.controlsParameters.velocity.x -= engine.controlsParameters.velocity.x * 10.0 * delta;
    engine.controlsParameters.velocity.z -= engine.controlsParameters.velocity.z * 10.0 * delta;

    engine.controlsParameters.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    engine.controlsParameters.direction.z = Number(engine.controlsParameters.moveForward) - Number(engine.controlsParameters.moveBackward);
    engine.controlsParameters.direction.x = Number(engine.controlsParameters.moveRight) - Number(engine.controlsParameters.moveLeft);
    engine.controlsParameters.direction.normalize(); // this ensures consistent movements in all directions

    if (engine.controlsParameters.moveForward || engine.controlsParameters.moveBackward) {
      engine.controlsParameters.velocity.z -= engine.controlsParameters.direction.z * 400.0 * delta;
    }
    if (engine.controlsParameters.moveLeft || engine.controlsParameters.moveRight)
      engine.controlsParameters.velocity.x -= engine.controlsParameters.direction.x * 400.0 * delta;

    if (onObject) {
      engine.controlsParameters.velocity.y = Math.max(0, engine.controlsParameters.velocity.y);
      engine.controlsParameters.canJump = true;
    }

    engine.controls.moveRight(-engine.controlsParameters.velocity.x * delta);
    engine.controls.moveForward(-engine.controlsParameters.velocity.z * delta);
    engine.controls.getObject().position.y += engine.controlsParameters.velocity.y * delta; // new behavior

    if (engine.controls.getObject().position.y < 2) {
      engine.controlsParameters.velocity.y = 0;
      engine.controls.getObject().position.y = 2;

      engine.controlsParameters.canJump = true;
    }
  }
}
