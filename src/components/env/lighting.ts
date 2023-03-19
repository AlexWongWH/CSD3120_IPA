import { Scene, HemisphericLight, Vector3, Color3, PointLight } from "babylonjs";

export function createLights(scene: Scene) {
  const hemiLight = new HemisphericLight("hemLight", new Vector3(-1, 1, 0), scene);
  hemiLight.intensity = 0.5;
  hemiLight.diffuse = new Color3(0, 0, 0);

  const pointLight = new PointLight("pointLight", new Vector3(-1, 10, 1.0), scene);
  pointLight.intensity = 1.1;
}