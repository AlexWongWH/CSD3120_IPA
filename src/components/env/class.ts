import {
    Scene,
    SceneLoader,
    Vector3,
    PointerDragBehavior,
    Animation,
    StandardMaterial,
    Color3,
    MeshBuilder,
    Texture
  } from "babylonjs";
  

  
  export function loadModels(scene: Scene) {

    
    //left wall
    const wallHeight = 3;
    const wallThickness = 0.2;
    const wallColor = new Color3(0.8, 0.8, 0.8);
    const wallMaterial = new StandardMaterial("wallMaterial", scene);
    wallMaterial.backFaceCulling = true;
    wallMaterial.diffuseTexture = new Texture(
      "assets/textures/plank.png",
      scene
    );

    wallMaterial.diffuseColor = wallColor;
    wallMaterial.specularColor = Color3.Black();
    const leftWall = MeshBuilder.CreateBox("leftWall", { width: wallThickness, height: wallHeight, depth: 10 });
    leftWall.position.x = -35.5;
    leftWall.scaling = new Vector3(30,30,30);
    leftWall.position.y = wallHeight;
    leftWall.material = wallMaterial;


    SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "SchoolChair.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "SchoolChair";
        root.name = "SchoolChair";
        root.position.y = -2;
        root.position.y = -11.5;
        root.position.z = -1;
        root.rotation = new Vector3(0, 0, 0);
        root.scaling.setAll(10.0);
  
        //drag the chair
        const dragBehavior = new PointerDragBehavior({
          dragPlaneNormal: new Vector3(0, 1, 0),
        });
        root.addBehavior(dragBehavior);
      });


      // chairs
      SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "SchoolChair.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "SchoolChair";
        root.name = "SchoolChair";
        root.position.y = -2;
        root.position.y = -11.5;
        root.position.z = -1;
        root.rotation = new Vector3(0, 0, 0);
        root.scaling.setAll(10.0);
  
        //drag the chair
        const dragBehavior = new PointerDragBehavior({
          dragPlaneNormal: new Vector3(0, 1, 0),
        });
        root.addBehavior(dragBehavior);
      });
  
      // table
      SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "SchoolDesk.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "SchoolDesk";
        root.name = "SchoolDesk";
        root.position.y = -12;
        root.position.z = 8;
        root.position.x = 0;
        root.rotation = new Vector3(0, 0, 0);
        root.scaling.setAll(10.0);

        // const dragBehavior = new PointerDragBehavior({
        //   dragPlaneNormal: new Vector3(0, 1, 0),
        // });
        // root.addBehavior(dragBehavior);
      });
  
      // clock
      SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "clock.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "clock";
        root.name = "clock";
        root.position.y = 14;
        root.position.z = 30;
        root.rotation = new Vector3(0, 3.14, 0);
        root.scaling.setAll(10.0);
        const dragBehavior = new PointerDragBehavior({
          dragPlaneNormal: new Vector3(0, 0, 1),
        });
        root.addBehavior(dragBehavior);
      });
  
      // bin
      SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "bin.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "bin";
        root.name = "bin";
        root.position.y = -10;
        root.position.z = 14;
        root.position.x = 9;
        root.rotation = new Vector3(0, 0, 0);
        root.scaling.setAll(10.0);
      });




  }