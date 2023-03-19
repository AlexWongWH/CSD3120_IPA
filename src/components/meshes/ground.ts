import {
    MeshBuilder,
    StandardMaterial,
    Texture,
    Mesh,
    Scene,
    Vector3,
  } from "babylonjs";

  export class Ground {
    public _mesh: Mesh;
  
    constructor(scene: Scene) {
      const groundMaterial = new StandardMaterial("ground material", scene);
      groundMaterial.backFaceCulling = true;
      groundMaterial.diffuseTexture = new Texture(
        "assets/textures/floor.png",
        scene
      );
  
      const ground = MeshBuilder.CreateGround(
        "ground",
        { width: 150, height: 150 },
        scene
      );
      ground.material = groundMaterial;
      ground.position.set(0, -12, 8);
  
      this._mesh = ground;
    }
  
    get mesh(): Mesh {
      return this._mesh;
    }
  }