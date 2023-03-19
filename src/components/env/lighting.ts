/**
 * @fileoverview A application typescript file that holds function which initializes lights used for the VR class
 * @author Wong Wei Hao
 * @package
 */
import { MeshBuilder,StandardMaterial,CubeTexture,Texture, Scene, HemisphericLight, Vector3, Color3, PointLight } from "babylonjs";

/**
 * Function to create lights
 * @param scene the scene to create the lights
 */
export function createLights(scene: Scene) {
  const hemiLight = new HemisphericLight("hemLight", new Vector3(-1, 1, 0), scene);
  hemiLight.intensity = 0.5;
  hemiLight.diffuse = new Color3(0, 0, 0);

  const pointLight = new PointLight("pointLight", new Vector3(-1, 10, 1.0), scene);
  pointLight.intensity = 1.1;
}

/**
 * Function to create skybox
 * @param scene the scene to create the sky box in
 */
export function createSkyBox(scene: Scene) {
  const skybox = MeshBuilder.CreateBox("skybox", { size: 1000 }, scene);
  const skyboxMaterial = new StandardMaterial("skybox-mat");

  skyboxMaterial.backFaceCulling = false;

  skyboxMaterial.reflectionTexture = new CubeTexture(
    "assets/textures/skybox",
    scene
  );
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
}