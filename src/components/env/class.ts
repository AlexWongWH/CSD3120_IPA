/**
 * @fileoverview A application typescript file that holds function which initializes models used for the VR class
 * @author Wong Wei Hao
 * @package
 */

import {Scene,SceneLoader,Vector3,PointerDragBehavior,StandardMaterial,Color3,MeshBuilder,Texture } from "babylonjs";
  

  /**
   * Function to create the environment of the class room, ie, walls and ceiling
   * 
   * @param scene the scene where to load the class room model
   */
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

    const ceilingMaterial = new StandardMaterial("wallMaterial", scene);
    ceilingMaterial.backFaceCulling = true;
    ceilingMaterial.diffuseTexture = new Texture(
      "assets/textures/whitewall.png",
      scene
    );
    ceilingMaterial.diffuseColor = wallColor;
    ceilingMaterial.specularColor = Color3.Black();

    const leftWall = MeshBuilder.CreateBox("leftWall", { width: wallThickness, height: wallHeight, depth: 10 });
    leftWall.position.x = -48.5;
    leftWall.scaling = new Vector3(30,30,30);
    leftWall.position.y = wallHeight;
    leftWall.material = wallMaterial;

    //rigth wall
    const rightWall = MeshBuilder.CreateBox("rightWall", { width: wallThickness, height: wallHeight, depth: 10 });
    rightWall.position.x = 48.5;
    rightWall.scaling = new Vector3(30,30,30);
    rightWall.position.y = wallHeight;
    rightWall.material = wallMaterial;

    //front wall
    const frontWall = MeshBuilder.CreateBox("frontWall", { width: wallThickness, height: wallHeight, depth: 10 });
    frontWall.position.z = 48.5;
    frontWall.rotation = new Vector3(0,Math.PI/2,0);
    frontWall.scaling = new Vector3(30,30,30);
    frontWall.position.y = wallHeight;
    frontWall.material = wallMaterial;

    //back wall
    const backWall = MeshBuilder.CreateBox("backWall", { width: wallThickness, height: wallHeight, depth: 10 });
    backWall.position.z = -55.5;
    backWall.rotation = new Vector3(0,-Math.PI/2,0);
    backWall.scaling = new Vector3(30,30,30);
    backWall.position.y = wallHeight;
    backWall.material = wallMaterial;

    //ceiling
    const ceiling = MeshBuilder.CreateBox("ceiling", { width: wallThickness, height: wallHeight, depth: 10 });
    ceiling.position.y = 56.5;
    ceiling.rotation = new Vector3(0,0,-Math.PI/2);
    ceiling.scaling = new Vector3(50,50,40);
    ceiling.material = ceilingMaterial;

    //chalk board
    SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "chalkboard.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "ChalkBoard";
        root.name = "ChalkBoard";
        root.position.x = 0;
        root.position.y = 3;
        root.position.z = 20;
        root.rotation = new Vector3(0, 0, 0);
        root.scaling.setAll(75.0);
        root.scaling.x = 90;
  
        // const dragBehavior = new PointerDragBehavior({
        //   dragPlaneNormal: new Vector3(0, 1, 0),
        // });
        // root.addBehavior(dragBehavior);
      });


    //main chairs
    SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "SchoolChair.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "SchoolChair1";
        root.name = "SchoolChair1";
        // root.position.x = -2;
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


      // left chairs
      SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "SchoolChair.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "SchoolChair2";
        root.name = "SchoolChair2";
        root.position.x = -15;
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
  

      // right chairs
      SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "SchoolChair.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "SchoolChair3";
        root.name = "SchoolChair3";
        root.position.x = 15;
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



      // middle table
      SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "SchoolDesk.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "SchoolDesk1";
        root.name = "SchoolDesk1";
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
  
      // left table
      SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "SchoolDesk.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "SchoolDesk2";
        root.name = "SchoolDesk2";
        root.position.y = -12;
        root.position.z = 8;
        root.position.x = -15;
        root.rotation = new Vector3(0, 0, 0);
        root.scaling.setAll(10.0);

        const dragBehavior = new PointerDragBehavior({
          dragPlaneNormal: new Vector3(0, 1, 0),
        });
        root.addBehavior(dragBehavior);
      });

      // right table
      SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "SchoolDesk.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "SchoolDesk3";
        root.name = "SchoolDesk3";
        root.position.y = -12;
        root.position.z = 8;
        root.position.x = 15;
        root.rotation = new Vector3(0, 0, 0);
        root.scaling.setAll(10.0);

        const dragBehavior = new PointerDragBehavior({
          dragPlaneNormal: new Vector3(0, 1, 0),
        });
        root.addBehavior(dragBehavior);
      });


      // shelf table
      SceneLoader.ImportMeshAsync(
        "",
        "assets/models/scene/",
        "shelf.glb",
        scene
      ).then((result) => {
        const root = result.meshes[0];
        root.id = "shelf";
        root.name = "shelf";
        root.position.y = -12;
        root.position.z = 8;
        root.position.x = 40;
        root.rotation = new Vector3(0, Math.PI/2, 0);
        root.scaling.setAll(20.0);

        const dragBehavior = new PointerDragBehavior({
          dragPlaneNormal: new Vector3(0, 1, 0),
        });
        root.addBehavior(dragBehavior);
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
        root.position.y = 23;
        root.position.z = 45;
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