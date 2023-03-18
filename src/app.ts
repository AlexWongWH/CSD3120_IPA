/**
 * @fileoverview A main application JavaScript file that initializes and renders an XR scene using BabylonJS.
 * @author Wong Wei Hao
 * @package
 */

import {
  Engine,
  MeshBuilder,
  Scene,
  StandardMaterial,
  CubeTexture,
  Texture,
  Color3,
  ArcRotateCamera,
  Vector3,
  Matrix,
  UniversalCamera,
  VideoDome,
  Sound,
  HemisphericLight,
  AnimationGroup,
  PointLight,
  SceneLoader,
  Animation,
  AbstractMesh,
  Particle,
  ParticleSystem,
  Color4,
  VideoTexture,
  PointerEventTypes,
  PointerDragBehavior,
  ActionManager,
  Observable,
  Observer,
  Tools,
  WebXRFeaturesManager,
  Mesh,
  WebXRFeatureName,
  WebXRMotionControllerTeleportation,
  TransformNode,
  MultiPointerScaleBehavior,
  SixDofDragBehavior,
  Gizmo,
  GizmoManager,
  Nullable,
} from "babylonjs";
import { AdvancedDynamicTexture, TextBlock } from "babylonjs-gui";
import "babylonjs-loaders";
import { AuthoringData } from "xrauthor-loader";
import { WebXRDefaultExperience } from "babylonjs/XR/webXRDefaultExperience";
import { HelloSphere, TextPlane } from "./components/meshes";

/**
 * App class for creating and managing the XR scene.
 */
export class App {
  /**
   * The engine for rendering the XR scene.
   */
  private engine: Engine;

  /**
   * The canvas element for displaying the XR scene.
   */
  private canvas: HTMLCanvasElement;

  private data: AuthoringData;

  private buttonSound: Sound;

  /**
   * @constructor
   * @param {Engine} engine - The engine for rendering the XR scene.
   * @param {HTMLCanvasElement} canvas - The canvas element for displaying the XR scene.
   */
  constructor(engine: Engine, canvas: HTMLCanvasElement, data: AuthoringData) {
    this.engine = engine;
    this.canvas = canvas;
    this.data = data;
    console.log("app object constructor called");
  }

  createLights(scene: Scene) {
    const hemiLight = new HemisphericLight(
      "hemLight",
      new Vector3(-1, 1, 0),
      scene
    );
    hemiLight.intensity = 0.5;
    hemiLight.diffuse = new Color3(0, 0, 0);

    const pointLight = new PointLight(
      "pointLight",
      new Vector3(-1 - 1.0),
      scene
    );
    pointLight.intensity = 1.1;
  }

  createVideoSkyDome(scene: Scene) {
    const dome = new VideoDome(
      "videoDome",
      "assets/videos/bridge_360.mp4",
      {
        resolution: 32,
        size: 1000,
      },
      scene
    );
  }

  createParticles(scene: Scene) {
    const particleSystem = new ParticleSystem("particles", 5000, scene);
    particleSystem.particleTexture = new Texture(
      "assets/textures/ref2.jpg",
      scene
    );

    particleSystem.emitter = new Vector3(2, 0, 2);
    particleSystem.minEmitBox = new Vector3(0, 0, 0);
    particleSystem.maxEmitBox = new Vector3(0, 0, 0);

    particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new Color4(0.3, 0.5, 1.0, 1.0);
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    particleSystem.emitRate = 1000;

    particleSystem.direction1 = new Vector3(-1, 8, 1);
    particleSystem.direction2 = new Vector3(1, 8, -1);

    particleSystem.minEmitPower = 0.2;
    particleSystem.maxEmitPower = 0.8;
    particleSystem.updateSpeed = 0.01;

    particleSystem.gravity = new Vector3(0, -9.8, 0);
    particleSystem.start();
  }

  addSounds(scene: Scene) {
    const music = new Sound("music", "assets/sounds/skybun.mp3", scene, null, {
      loop: true,
      autoplay: false,
      volume: 0.1,
    });
    //const sound = new Sound('sound','assets/sounds/button.mp3',scene,()=> sound.play(), {loop:true});
    this.buttonSound = new Sound(
      "buttonSound",
      "assets/sounds/button.mp3",
      scene,
      null
    );
  }

  createText(scene: Scene) {
    const helloPlane = new TextPlane(
      "hello plane",
      2.5,
      1,
      0,
      0,
      5,
      "Hello Xr",
      "white",
      "purple",
      60,
      scene
    );
    helloPlane.textBlock.onPointerUpObservable.add((evtData) => {
      alert("Hello Text at :\n x: " + evtData.x + "y: " + evtData.y);
    });
    helloPlane.textBlock.onPointerDownObservable.add(() => {
      this.buttonSound.play();
    });
  }

  loadModels(scene: Scene) 
  {
    // H2O
    SceneLoader.ImportMeshAsync("", "assets/models/", "H2O.glb", scene).then(
      (result) => {
        const root = result.meshes[0];
        root.id = "h2oRoot";
        root.name = "h2oRoot";
        root.position.y = -1;
        root.rotation = new Vector3(0, 0, Math.PI);
        root.scaling.setAll(1.5);
        this.createAnimation(scene, root); // create animation to make it spin
      }
    );



    // chairs
    SceneLoader.ImportMeshAsync(
      "",
      "assets/models/scene/",
      "chair.glb",
      scene
    ).then((result) => {
      const root = result.meshes[0];
      root.id = "chair";
      root.name = "chair";
      root.position.y = -12;
      root.position.z = 5;
      root.rotation = new Vector3(0, -Math.PI / 2, 0);
      root.scaling.setAll(20.0);
    });

    // table
    SceneLoader.ImportMeshAsync(
      "",
      "assets/models/scene/",
      "table.glb",
      scene
    ).then((result) => {
      const root = result.meshes[0];
      root.id = "table";
      root.name = "table";
      root.position.y = -12;
      root.position.z = 5;
      root.position.x = 3;
      root.rotation = new Vector3(0, 0, 0);
      root.scaling.setAll(30.0);
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
      root.rotation = new Vector3(0, Math.PI, 0);
      root.scaling.setAll(10.0);
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

  addInspectorKeyboardShortcut(scene: Scene) {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key == "i") {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });
  }

  createAnimation(scene: Scene, model: AbstractMesh) {
    const animation = new Animation(
      "rotationAnima",
      "rotation",
      30,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const keyFrames = [
      { frame: 0, value: new Vector3(0, 0, 0) },
      { frame: 30, value: new Vector3(0, 2 * Math.PI, 0) },
    ];
    animation.setKeys(keyFrames);

    model.animations = [];
    model.animations.push(animation);
    scene.beginAnimation(model, 0, 30, true);
  }
  createCamera(scene: Scene) {
    const camera = new ArcRotateCamera(
      "arcCamera",
      -Math.PI / 5,
      Math.PI / 2,
      5,
      Vector3.Zero(),
      scene
    );
    // const camera = new UniversalCamera(
    //   "uniCamera",
    //   new Vector3(0, 0, -5),
    //   scene
    // );

    // input

    camera.attachControl(this.canvas, true);
  }

  createSkyBox(scene: Scene) {
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

  async createScene() {
    console.log(this.data);

    const scene = new Scene(this.engine);
    scene.createDefaultCameraOrLight(false, true, true);

    scene.actionManager = new ActionManager(scene);

    this.createCamera(scene);
    // const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    // camera.attachControl(this.canvas, true);
    this.createLights(scene);

    this.loadModels(scene);
    this.addSounds(scene);
    this.createParticles(scene);

    this.createText(scene); // create text

    const groundMaterial = new StandardMaterial("ground material", scene);
    groundMaterial.backFaceCulling = true;
    groundMaterial.diffuseTexture = new Texture(
      "assets/textures/grass.png",
      scene
    );

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 12, height: 12 },
      scene
    );
    ground.material = groundMaterial;

    ground.position.set(0, -1, 8);
    // ground.position.y = -2;


    const sphere = MeshBuilder.CreateBox("sphere", { size: 1 }, scene);
    sphere.position.x = 0;
    sphere.position.y = 1;
    sphere.position.z = 5;

    //  this.createSkyBox(scene);
    this.createVideoSkyDome(scene);
    this.addInspectorKeyboardShortcut(scene); // ctrl + i to use

    const helloSphere = new HelloSphere("hello sphere", { diameter: 1 }, scene);
    helloSphere.position.set(0, 1, -5);
    helloSphere.sayHello("this is a test.");

    // interactions
    // use behaviors, child of observable
    const pointerDragBehavior = new PointerDragBehavior({
      dragPlaneNormal: Vector3.Up(), //1,1,0
    });

    //create observable
    pointerDragBehavior.onDragStartObservable.add((evtData) => {
      console.log("drag start: pointer id -" + evtData.pointerId);
      console.log(evtData);
    });

    const helloSphereDragBehavior = new PointerDragBehavior({
      dragPlaneNormal: Vector3.Backward(), //1,1,0
    });

    helloSphere.addBehavior(helloSphereDragBehavior);


    // multiple pointer scale
    const multiPointerScaleBehavior = new MultiPointerScaleBehavior();
    helloSphere.addBehavior(multiPointerScaleBehavior);



    // more behaviors 
    // default gizmo 
    const gizmoManager = new GizmoManager(scene);
    gizmoManager.positionGizmoEnabled = true;
    gizmoManager.rotationGizmoEnabled = true;
    gizmoManager.scaleGizmoEnabled = true;
    gizmoManager.boundingBoxGizmoEnabled = true;


    sphere.addBehavior(pointerDragBehavior); // that behavoir to the sphere


    const helloPlane = MeshBuilder.CreatePlane("Hello plane", { size: 15 });
    helloPlane.position.y = 0;
    helloPlane.position.z = 5;
    //the 3d quad for words
    const helloTexture = AdvancedDynamicTexture.CreateForMesh(helloPlane);

    const helloText = new TextBlock("hello");
    helloText.text = "Hello XR";
    helloText.color = "purple";
    helloText.fontSize = 50;
    helloTexture.addControl(helloText); //what to use for the texture

    const videoHeight = 5;
    const videoWidth = videoHeight * this.data.recordingData.aspectRatio;

    const videoPlane = MeshBuilder.CreatePlane(
      "video plane",
      {
        height: videoHeight,
        width: videoWidth,
      },
      scene
    );

    videoPlane.position.z = 8;
    const videoMaterial = new StandardMaterial("video material", scene);

    const videoTexture = new VideoTexture(
      "video texture",
      this.data.video,
      scene
    );

    videoTexture.video.autoplay = false;
    videoTexture.onUserActionRequestedObservable.add(() => {});

    videoMaterial.diffuseTexture = videoTexture;
    videoMaterial.roughness = 1;
    videoMaterial.emissiveColor = Color3.White();
    videoPlane.material = videoMaterial;

    // scene observable
    scene.onPointerObservable.add((evtData) => {
      console.log("picked");

      //mesh picked is video plane
      if (evtData.pickInfo.pickedMesh === videoPlane) {
        // this.buttonSound.play(); // play sounds
        console.log("picked on video plane");
        if (videoTexture.video.paused) {
          videoTexture.video.play();
          animationGroup.play(true);
        } else {
          videoTexture.video.pause();
          animationGroup.pause();
        }
        console.log(videoTexture.video.paused ? "paused" : "playing");
      } else {
        console.log(evtData.pickInfo.pickedMesh);
      }
    }, PointerEventTypes.POINTERPICK);

    // // depending on the tracker, [the paper]
    const id = "m4"; // first marker that moved/ on the screen
    const track = this.data.recordingData.animation.tracks[id];
    const length = track.times.length;
    const fps = length / this.data.recordingData.animation.duration;
    const keyframes = [];

    for (let i = 0; i < length; i++) {
      const mat = Matrix.FromArray(track.matrices[i].elements);
      const pos = mat.getTranslation();
      //convert position from right to left handed coordinates

      pos.z = -pos.z;
      const s = 6 / pos.z;

      keyframes.push({
        frame: track.times[i] * fps,
        value: pos.scale(s).multiplyByFloats(3, 3, 1),
      });
    }

    //create animation
    const animation = new Animation(
      "animation",
      "position",
      fps,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );

    animation.setKeys(keyframes);
    // sphere.animations = [animation];
    // scene.beginAnimation(sphere, 0, length-1, true);

    //create animation grp
    const animationGroup = new AnimationGroup("animation group", scene);


      //use observable for detecting intersections
      const onIntersectObservable = new Observable<boolean>();
      scene.registerBeforeRender(function () {
        const isIntersecting = sphere.intersectsMesh(helloSphere, true, true); // register the observer of the sphere
        onIntersectObservable.notifyObservers(isIntersecting); //boardcast here
      });

      //intersecting observable
      helloSphere.onIntersectObservable = onIntersectObservable;
      const redColor = Color3.Red();
      const whiteColor = Color3.White();
      helloSphere.onIntersectObservable.add((isintersecting) => {
        const material = helloSphere.mesh.material as StandardMaterial;
        const isRed = material.diffuseColor === redColor;
        //if intersecting
        if (isintersecting && !isRed) 
        {
          material.diffuseColor = redColor;
        } 
        else if (!isintersecting && isRed) 
        {
          material.diffuseColor = whiteColor;
        }
      });

    // 2. create an oversable for checking distance
    const onDistanceChangeObservable = new Observable<number>();
    let previousState: number = 0; // initialize with a number value
    
    scene.onBeforeRenderObservable.add(() => {
      const currentState = Vector3.Distance(
        sphere.position,
        helloSphere.position
      );
      //check state has been change
      if (previousState !== currentState) {
        console.log("distance updated!");
        previousState = currentState;
        onDistanceChangeObservable.notifyObservers(currentState); // notify
      }
    });
    helloSphere.onDistanceChangeObservable = onDistanceChangeObservable;
    const blueColor = Color3.Blue();
    helloSphere.onDistanceChangeObservable.add((distance) => {
      const isCloseEnough = distance <= 1.2;
      const material = helloSphere.mesh.material as StandardMaterial;
      const isBlue = material.diffuseColor === blueColor;
      const isRed = material.diffuseColor === redColor;
      if (isCloseEnough && !isBlue && !isRed) {
        material.diffuseColor = blueColor;
      } else if (!isCloseEnough && isBlue) {
        material.diffuseColor = whiteColor;
      }
    });


    // 3. create observer
    const observer = new Observer<number>((distance) => {
      helloSphere.label.textBlock.text = "d: " + distance.toFixed(2);
    }, -1);

    // 4. add observer using coroutine
    const addObserverCoruotine = function* () {
      yield; //return 
      console.log("frame " + scene.getFrameId() + ": add observer");
      onDistanceChangeObservable.observers.push(observer);
    };
    scene.onBeforeRenderObservable.runCoroutineAsync(addObserverCoruotine());

    const coroutine = function* (){
      (async function (){
        await Tools.DelayAsync(2000);
        console.log("frame " + scene.getFrameId() + ": fn1");
      })();
      yield
      (async function (){
        await Tools.DelayAsync(2000);
        console.log("frame " + scene.getFrameId() + ": fn2");
      })();
      yield // return from coroutine 
      (async function (){
        await Tools.DelayAsync(2000);
        console.log("frame " + scene.getFrameId() + ": fn3");
      })();
      yield  Tools.DelayAsync(1000);
      (async function (){
        await Tools.DelayAsync(2000);
        console.log("frame " + scene.getFrameId() + ": fn4");
      })();
    }
    scene.onBeforeRenderObservable.runCoroutineAsync(coroutine());

    //add animation to the grp
    //animationGroup.addTargetedAnimation(animation,sphere);

    const info = this.data.recordingData.modelInfo[id];

    const label = info.label;
    const name = info.name;
    const url = this.data.models[name]; // get prob of model
    //import from file, then attack to the tracker
    SceneLoader.AppendAsync(url, undefined, scene, undefined, ".glb").then(
      (result) => {
        //gltf, added root
        const root = result.getMeshById("__root__");
        root.id = id + ": " + label;
        root.name = label;
        helloPlane.position.setAll(0);
        helloPlane.position.y = -0.5;
        helloPlane.position.z = -0.1;
        helloPlane.setParent(root);
        helloText.text = "hello"; // change this to label
        // helloText.text = label; // change this to label
        animationGroup.addTargetedAnimation(animation, root);
        animationGroup.reset(); //reset animation
      }
    );

    // XR session
    // enable ar setting from babylon js
    const xr = await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: "immersive-vr",
      },
      optionalFeatures :true,
    });

    //for debugging
    (window as any).xr = xr;


    const featureManager = xr.baseExperience.featuresManager;
    console.log(WebXRFeaturesManager.GetAvailableFeatures());
    
    // locomotion
    const movement = Movementmode.Teleportation; 
    this.initLocomotion(movement, xr, featureManager, ground,scene);


    // hand tracking 
    try{
      featureManager.enableFeature(WebXRFeatureName.HAND_TRACKING, "latest",{
        xrInput: xr.input,
        jointMeshes:{
          disableDefaultHandMesh: false,
        },
      });
    }catch(error){
      console.log(error);
    }

    // hand/controller drag
    let mesh: Nullable<AbstractMesh> = null; // change the type of mesh to Nullable<AbstractMesh>
    xr.input.onControllerAddedObservable.add((controller) => {
      controller.onMotionControllerInitObservable.add((motionController) =>{
        // const ids = motionController.getComponentIds();
        // const trigger = motionController.getComponent(ids[0]);
        const trigger = motionController.getComponentOfType("trigger");
        trigger?.onButtonStateChangedObservable.add(() => {
          if(trigger.changes.pressed){
            if(trigger.pressed){
              if( 
                (mesh = xr.pointerSelection.getMeshUnderPointer(
                  controller.uniqueId
                ))
              ){
                console.log("mesh under controller pointer: " + mesh.name)
                // do not grab the ground 
                if("ground" !== mesh.name){
                  const rootMeshPosition = motionController.rootMesh?.getAbsolutePosition();
                  const meshPosition = mesh.getAbsolutePosition();
                  if (rootMeshPosition && meshPosition) {
                    const distance = Vector3.Distance(rootMeshPosition, meshPosition);
                    console.log("distance: " + distance);

                    // check if too far from object 
                    if (distance < 1) {
                      mesh.setParent(motionController.rootMesh);
                      console.log("grab mesh: " + mesh.name);
                    }
                  }
                }
              }else{
                console.log("no mesh under pointer");
              }
            }else{
              // released 
              if(mesh && mesh.parent){
                mesh.setParent(null);
                console.log("release mesh: " + mesh.name);
              }
            }
          }
        });
      });
    });

    // enabled features 
    console.log(featureManager.getEnabledFeatures());


    return scene;
  }


  initLocomotion(
    movement: Movementmode,
    xr: WebXRDefaultExperience,
    featureManager: WebXRFeaturesManager,
    ground: Mesh,
    scene: Scene
  ) {
    switch(movement){
      case Movementmode.Teleportation:
        console.log("movement mode : teleportation");
        const teleportation = featureManager.enableFeature(
          WebXRFeatureName.TELEPORTATION,
          "stable",
          {
            xrInput: xr.input,
            floorMeshes: [ground],
            timeToTeleport: 2000,  
            useMainComponentOnly: true,
            defaultTargetMeshOptions:{
              teleportationFillColor: "#55FF99",
              teleportationBorderColor: "blue",
              torusArrowMaterial: ground.material,
            },
          },
          true,
          true
        ) as WebXRMotionControllerTeleportation;
        teleportation.parabolicRayEnabled = true;
        teleportation.parabolicCheckRadius = 2; 
        break;

        case Movementmode.Controller:
          console.log("movement mode: controller");
          featureManager.disableFeature(WebXRFeatureName.TELEPORTATION);
          featureManager.enableFeature(WebXRFeatureName.MOVEMENT, "latest", {
            xrInput: xr.input,
          });
          break; 

        case Movementmode.Walk:
          console.log("movement mode: walk");
          featureManager.disableFeature(WebXRFeatureName.TELEPORTATION);
          const xrRoot = new TransformNode("xr root", scene);
          xr.baseExperience.camera.parent = xrRoot; 
          featureManager.enableFeature(
            WebXRFeatureName.WALKING_LOCOMOTION,
            "latest",
            {
              locomotionTarget: xrRoot,
            }
          );
          break;
    }


  }


}


enum Movementmode{
  Teleportation,
  Controller,
  Walk,
}
