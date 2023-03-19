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
  EasingFunction,
  ExponentialEase,
  VideoDome,
  Sound,
  HemisphericLight,
  AnimationGroup,
  BoundingBox,
  IntersectionInfo,
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
  WebXRExperienceHelper,
  WebXRDefaultExperience,
  WebXRControllerPointerSelection,
  Quaternion,
} from "babylonjs";
import { AdvancedDynamicTexture, Control, StackPanel, TextBlock } from "babylonjs-gui";
import "babylonjs-loaders";
import { AuthoringData } from "xrauthor-loader";
import { HelloSphere, TextPlane, Ground } from "./components/meshes";
import { createLights } from "./components/env/lighting";
import { loadModels  } from "./components/env/class";
import { createBoxWithNumber, createAnimation  } from "./components/meshes/hello-mesh";

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
    // // H2O
    // SceneLoader.ImportMeshAsync("", "assets/models/", "H2O.glb", scene).then(
    //   (result) => {
    //     const root = result.meshes[0];
    //     root.id = "h2oRoot";
    //     root.name = "h2oRoot";
    //     root.position.y = -1;
    //     root.rotation = new Vector3(0, 0, Math.PI);
    //     root.scaling.setAll(1.5);
    //     this.createAnimation(scene, root); // create animation to make it spin
    //   }
    // );

  }


  applyColor = (mesh: AbstractMesh, color: Color3) => {
    const material = new StandardMaterial("modelMaterial", mesh.getScene());
    material.diffuseColor = color;
    mesh.material = material;
  };

  createShakeAnimation = (mesh: AbstractMesh) => {
    const animation = new Animation("shake", "position", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
    const easingFunction = new ExponentialEase(3);
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  
    const keyFrames = [
      { frame: 0, value: mesh.position },
      { frame: 5, value: mesh.position.add(new Vector3(0.1, 0, 0)) },
      { frame: 10, value: mesh.position.add(new Vector3(-0.1, 0, 0)) },
      { frame: 15, value: mesh.position.add(new Vector3(0.1, 0, 0)) },
      { frame: 20, value: mesh.position.add(new Vector3(-0.1, 0, 0)) },
      { frame: 25, value: mesh.position.add(new Vector3(0.1, 0, 0)) },
      { frame: 30, value: mesh.position },
    ];
  
    animation.setKeys(keyFrames);
    animation.setEasingFunction(easingFunction);
  
    return animation;
  };


  addInspectorKeyboardShortcut(scene: Scene) {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key == "i") {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }

      if (e.key === "r" || e.key === "R") {
        // resetscene();
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

  createVideoPlane(scene: Scene, sphere: AbstractMesh) {
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
    videoPlane.position.set(0, 5, 10);
    // videoPlane.rotation.set(Math.PI / 2, 0, 0);
    videoPlane.scaling._x = 1.0;
    videoPlane.scaling._y = 1.0;
    const videoMaterial = new StandardMaterial("video material", scene);
    const videoTexture = new VideoTexture(
      "video texture",
      this.data.video,
      scene
    );
    videoTexture.onUserActionRequestedObservable.add(() => {});
    videoTexture.video.autoplay = true;
    videoMaterial.diffuseTexture = videoTexture;
    videoMaterial.roughness = 1;
    videoMaterial.emissiveColor = Color3.White();
    videoPlane.material = videoMaterial;

    scene.onPointerObservable.add((evtData) => {
      console.log("picked");
      if (evtData.pickInfo?.pickedMesh === videoPlane) {
        if (videoTexture.video.paused) {
          videoTexture.video.play();
          animationGroup.play(true);
        } else {
          videoTexture.video.pause();
          animationGroup.pause();
        }
        console.log(videoTexture.video.paused ? "paused" : "playing");
      }
    }, PointerEventTypes.POINTERPICK);

    const id = "m10";
    const track = this.data.recordingData.animation.tracks[id];
    const length = track.times.length;
    const fps = length / this.data.recordingData.animation.duration;
    // interface of the keyframes
    interface KeyFrame {
      frame: number;
      value: Vector3;
    }


    const keyFrames: KeyFrame[] = [];

    for (let i = 0; i < length; i++) {
      const mat = Matrix.FromArray(track.matrices[i].elements);
      const pos = mat.getTranslation();
      // convert position from right handed to left handed coords
      pos.z = -pos.z;
      const s = 10 / pos.z;
      const rotationQuaternion = Quaternion.RotationYawPitchRoll(videoPlane.rotation.y, videoPlane.rotation.x, videoPlane.rotation.z);
      const posScaled = pos.scale(s).multiplyByFloats(1, 1, 1);
      const position = videoPlane.position.clone().add(posScaled).rotateByQuaternionToRef(rotationQuaternion, new Vector3(0, 0, 0));
  
      const keyFrame = {
        frame: track.times[i] * fps,
        value: position,
        // value: videoPlane.position.clone().add(pos.scale(s).multiplyByFloats(1.2, 3.5, 0.7)),
      };
      keyFrames.push(keyFrame);
    }
  

    const h20model = SceneLoader.ImportMeshAsync(
      "",
      "assets/models/scene/",
      "h2o.glb",
      scene
    )

    const animation = new Animation(
      "animation",
      "position",
      fps,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    animation.setKeys(keyFrames);
    sphere.animations = [animation];
    scene.beginAnimation(sphere,0,length-1,true);

    const animationGroup = new AnimationGroup("animation group", scene);
    animationGroup.addTargetedAnimation(animation,sphere);

    const info = this.data.recordingData.modelInfo[id];
    const label = info.label;
    const name = info.name;
    const url = this.data.models[name];
    SceneLoader.AppendAsync(url, undefined, scene, undefined, ".glb").then(
      (result) => {
        const root = result.getMeshById("__root__");
        if (root) {
          root.id = id + ": " + label;
          root.name = label; // label in this case in H2
          
          // create the animation for the root mesh of the model
          const animation = new Animation(
            "animation",
            "position",
            fps,
            Animation.ANIMATIONTYPE_VECTOR3,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );
          animation.setKeys(keyFrames);
          root.animations.push(animation);
          scene.beginAnimation(root, 0, length - 1, true);

          animationGroup.addTargetedAnimation(animation, root);
          animationGroup.reset();
        }
      }
    );






  }

  attachDragBehavior(mesh, onDragEnd) {
    const dragBehavior = new PointerDragBehavior({ dragPlaneNormal: new Vector3(0, 1, 0) });
    mesh.addBehavior(dragBehavior);
    dragBehavior.onDragEndObservable.add(onDragEnd);
  }

  async createScene() {
    console.log(this.data);

    const scene = new Scene(this.engine);
    scene.createDefaultCameraOrLight(false, true, true);
    scene.actionManager = new ActionManager(scene);

    this.createCamera(scene);
    createLights(scene);
    this.loadModels(scene);
    loadModels(scene); // "static" class models
    this.addSounds(scene);
    // this.createParticles(scene);
    // this.createText(scene); // create text

    const groundInstance = new Ground(scene); // create ground

     this.createSkyBox(scene);
    // this.createVideoSkyDome(scene);
    this.addInspectorKeyboardShortcut(scene); // ctrl + i to use





    const combineThreshold = 1.5; // Distance threshold for combining the models

    const O2Model = await SceneLoader.ImportMeshAsync("", "assets/models/", "O2.glb", scene);
    const o2Root = O2Model.meshes[0];
    o2Root.position = new Vector3(0, 1, 4);
    
    const HModel = await SceneLoader.ImportMeshAsync("", "assets/models/", "H2.glb", scene);
    const hRoot = HModel.meshes[0];
    hRoot.position = new Vector3(2, 1, 4);
    

    const H2OModel = await SceneLoader.ImportMeshAsync("", "assets/models/", "H2o.glb", scene);
    const h2oRoot = H2OModel.meshes[0];
    h2oRoot.position = new Vector3(1.5, 1, 4);
    h2oRoot.setEnabled(false); // Hide H2OModel initially
    
    this.createAnimation(scene,h2oRoot);

    const createDragBehavior = () => {
      const dragBehavior = new PointerDragBehavior({
        dragPlaneNormal: new Vector3(0, 1, 0),
      });
    

      dragBehavior.onDragObservable.add(() => {
        const distance = Vector3.Distance(o2Root.position, hRoot.position);
    
        if (distance <= combineThreshold) {
          this.applyColor(o2Root, Color3.Red());
          this.applyColor(hRoot, Color3.Red());
    
          const shakeAnimO2 = this.createShakeAnimation(o2Root);
          const shakeAnimH = this.createShakeAnimation(hRoot);
    
          o2Root.getScene().beginDirectAnimation(o2Root, [shakeAnimO2], 0, 30, false, 1, () => {
            this.applyColor(o2Root, Color3.White());
          });
          o2Root.getScene().beginDirectAnimation(hRoot, [shakeAnimH], 0, 30, false, 1, () => {
            this.applyColor(hRoot, Color3.White());
          });
        } else {
          this.applyColor(o2Root, Color3.White());
          this.applyColor(hRoot, Color3.White());
        }
      });
    
      dragBehavior.onDragEndObservable.add(() => {
        const distance = Vector3.Distance(o2Root.position, hRoot.position);
    
        if (distance <= combineThreshold) {
          o2Root.setEnabled(false);
          hRoot.setEnabled(false);

          h2oRoot.position = o2Root.position;
          h2oRoot.setEnabled(true);
        }
      });

      return dragBehavior;
    };
    
    o2Root.addBehavior(createDragBehavior());
    hRoot.addBehavior(createDragBehavior());

    // const box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    // const texture = AdvancedDynamicTexture.CreateForMesh(box);
    // const boxTexture = AdvancedDynamicTexture.CreateForMesh(box);
    // const boxText = new TextBlock();
    // boxText.text = "2";
    // boxText.color = "white";
    // boxText.fontSize = 100;
    // boxTexture.addControl(boxText);

    // const material = new StandardMaterial("material", scene);
    // material.diffuseTexture = texture;
    // material.diffuseColor = new Color3(1, 0, 0); // set the material color to red
    // material.alpha = 1; // set the material alpha to 1

    // box.material = material; // assign the material to the mesh
    // box.position = new Vector3(0, 0, 5); // position the mesh in front of the camera

    // const sphere = MeshBuilder.CreateBox("sphere", { size: 1 }, scene);
    // sphere.position.x = 0;
    // sphere.position.y = 1;
    // sphere.position.z = 5;



    // const helloSphere = new HelloSphere("hello sphere", { diameter: 1 }, scene);
    // helloSphere.position.set(0, 1, 5);
    // helloSphere.sayHello("this is a test.");
    // // interactions
    // // use behaviors, child of observable
    // const pointerDragBehavior = new PointerDragBehavior({
    //   dragPlaneNormal: Vector3.Up(), //1,1,0
    // });

    // //create observable
    // pointerDragBehavior.onDragStartObservable.add((evtData) => {
    //   console.log("drag start: pointer id -" + evtData.pointerId);
    //   console.log(evtData);
    // });
    // const helloSphereDragBehavior = new PointerDragBehavior({
    //   dragPlaneNormal: Vector3.Backward(), //1,1,0
    // });
    // // helloSphere.addBehavior(helloSphereDragBehavior);
    // // sphere.addBehavior(pointerDragBehavior); // that behavoir to the sphere
    // // multiple pointer scale
    // const multiPointerScaleBehavior = new MultiPointerScaleBehavior();
    // helloSphere.addBehavior(multiPointerScaleBehavior);
    // create the video plane
    // this.createVideoPlane(scene, boxm10);


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
    videoPlane.position.set(0, 0, 6);
    // videoPlane.rotation.set(Math.PI / 2, 0, 0);
    const videoMaterial = new StandardMaterial("video material", scene);
    const videoTexture = new VideoTexture(
      "video texture",
      this.data.video,
      scene
    );
    videoTexture.onUserActionRequestedObservable.add(() => {});
    videoTexture.video.autoplay = true;
    videoMaterial.diffuseTexture = videoTexture;
    videoMaterial.roughness = 1;
    videoMaterial.emissiveColor = Color3.White();
    videoPlane.material = videoMaterial;

    scene.onPointerObservable.add((evtData) => {
      console.log("picked");
      if (evtData.pickInfo?.pickedMesh === videoPlane) {
        if (videoTexture.video.paused) {
          videoTexture.video.play();
          animationGroup.play(true);
        } else {
          videoTexture.video.pause();
          animationGroup.pause();
        }
        console.log(videoTexture.video.paused ? "paused" : "playing");
      }
    }, PointerEventTypes.POINTERPICK);

    const id = "m10";
    const track = this.data.recordingData.animation.tracks[id];
    const length = track.times.length;
    const fps = length / this.data.recordingData.animation.duration;
    // interface of the keyframes
    interface KeyFrame {
      frame: number;
      value: Vector3;
    }

    const keyFrames: KeyFrame[] = [];

    //creation of animation here
    for (let i = 0; i < length; i++) {
      const mat = Matrix.FromArray(track.matrices[i].elements);
      const pos = mat.getTranslation();
      // convert position from right handed to left handed coords
      pos.z = -pos.z;
      const s = 6 / pos.z;
  
      const keyFrame = {
        frame: track.times[i] * fps,
        value: pos.scale(s).multiplyByFloats(3, 3, 1),
      };
      keyFrames.push(keyFrame);
    }
  
    const animation = new Animation(
      "animation",
      "position",
      fps,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    animation.setKeys(keyFrames);

    const boxm10 = createBoxWithNumber(scene,new Vector3(1,1,1), new Vector3(0,Math.PI/2,Math.PI/2));
    boxm10.animations = [animation]; //adds the animation
    boxm10.scaling.setAll(0.7);
    scene.beginAnimation(boxm10,0,length-1,true);


    const boxm2 = createBoxWithNumber(scene,new Vector3(1,1,1), new Vector3(0,Math.PI/2,Math.PI/2));
    const m2ani = createAnimation(scene,boxm2,this.data,"m2");
    boxm2.scaling.setAll(0.7);
    boxm2.animations = [m2ani];
    scene.beginAnimation(boxm2,0,length-1,true);

    //plus
    const boxm5 = createBoxWithNumber(scene,new Vector3(1,1,1), new Vector3(0,Math.PI/2,Math.PI/2),"+", Color3.Teal() );
    const m5ani = createAnimation(scene,boxm2,this.data,"m5");
    boxm5.scaling.setAll(0.7);
    boxm5.animations = [m5ani]; //adds the animation
    scene.beginAnimation(boxm5,0,length-1,true);

    //equals, mark 8
    const boxm8 = createBoxWithNumber(scene,new Vector3(1,1,1), new Vector3(0,Math.PI/2,Math.PI/2),"=", Color3.Teal() );
    const m8ani = createAnimation(scene,boxm2,this.data,"m8");
    boxm8.scaling.setAll(0.7);
    boxm8.animations = [m8ani]; //adds the animation
    scene.beginAnimation(boxm8,0,length-1,true);



    //label m7
    const vidH2O = await SceneLoader.ImportMeshAsync("", "assets/models/", "h2o.glb", scene);
    const m7h2oani = createAnimation(scene,vidH2O.meshes[0] ,this.data,"m7");
    vidH2O.meshes[0].scaling.setAll(0.6);
    vidH2O.meshes[0].animations = [m7h2oani]
    scene.beginAnimation(vidH2O.meshes[0], 0, length - 1, true);


    //label m1
    const vidcoffee = await SceneLoader.ImportMeshAsync("", "assets/models/", "coffee.glb", scene);
    const m1cofani = createAnimation(scene,vidcoffee.meshes[0] ,this.data,"m1");
    vidcoffee.meshes[0].scaling.setAll(1.5);
    vidcoffee.meshes[0].animations = [m1cofani]
    scene.beginAnimation(vidcoffee.meshes[0], 0, length - 1, true);


    //label m4
    const vidH2 = await SceneLoader.ImportMeshAsync("", "assets/models/", "H2.glb", scene);
    const m4h2ani = createAnimation(scene,vidH2.meshes[0] ,this.data,"m4");
    vidH2.meshes[0].scaling.setAll(0.6);
    vidH2.meshes[0].animations = [m4h2ani]
    scene.beginAnimation(vidH2.meshes[0], 0, length - 1, true);

    //label m11
    const vidO2 = await SceneLoader.ImportMeshAsync("", "assets/models/", "O2.glb", scene);
    vidO2.meshes[0].scaling.setAll(0.6);
    const m11O2ani = createAnimation(scene,vidO2.meshes[0] ,this.data,"m11");
    vidO2.meshes[0].animations = [m11O2ani]
    scene.beginAnimation(vidO2.meshes[0], 0, length - 1, true);


    const animationGroup = new AnimationGroup("animation group", scene);
    animationGroup.addTargetedAnimation(animation,boxm10);
    animationGroup.addTargetedAnimation(animation,boxm2);
    animationGroup.addTargetedAnimation(animation,vidH2);
    animationGroup.addTargetedAnimation(animation,vidO2);

    const info = this.data.recordingData.modelInfo[id];
    const label = info.label;
    const name = info.name;
    const url = this.data.models[name];
    SceneLoader.AppendAsync(url, undefined, scene, undefined, ".glb").then(
      (result) => {
        const root = result.getMeshById("__root__");
        if (root) {
          root.id = id + ": " + label;
          root.name = label; // label in this case in H2
          
          // create the animation for the root mesh of the model
          const animation = new Animation(
            "animation",
            "position",
            fps,
            Animation.ANIMATIONTYPE_VECTOR3,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );
          animation.setKeys(keyFrames);
          root.animations.push(animation);
          scene.beginAnimation(root, 0, length - 1, true);

          animationGroup.addTargetedAnimation(animation, root);
          animationGroup.reset();
        }
      }
    );











    // // more behaviors 
    // // default gizmo 
    // const gizmoManager = new GizmoManager(scene);
    // gizmoManager.positionGizmoEnabled = true;
    // gizmoManager.rotationGizmoEnabled = true;
    // gizmoManager.scaleGizmoEnabled = true;
    // gizmoManager.boundingBoxGizmoEnabled = true;

    //   //use observable for detecting intersections
    //   const onIntersectObservable = new Observable<boolean>();
    //   scene.registerBeforeRender(function () {
    //     const isIntersecting = sphere.intersectsMesh(helloSphere, true, true); // register the observer of the sphere
    //     onIntersectObservable.notifyObservers(isIntersecting); //boardcast here
    //   });

    //   //intersecting observable
    //   helloSphere.onIntersectObservable = onIntersectObservable;
    //   const redColor = Color3.Red();
    //   const whiteColor = Color3.White();
    //   helloSphere.onIntersectObservable.add((isintersecting) => {
    //     const material = helloSphere.mesh.material as StandardMaterial;
    //     const isRed = material.diffuseColor === redColor;
    //     //if intersecting
    //     if (isintersecting && !isRed) 
    //     {
    //       material.diffuseColor = redColor;
    //     } 
    //     else if (!isintersecting && isRed) 
    //     {
    //       material.diffuseColor = whiteColor;
    //     }
    //   });

    // // 2. create an oversable for checking distance
    // const onDistanceChangeObservable = new Observable<number>();
    // let previousState: number = 0; // initialize with a number value
    
    // scene.onBeforeRenderObservable.add(() => {
    //   const currentState = Vector3.Distance(
    //     sphere.position,
    //     helloSphere.position
    //   );
    //   //check state has been change
    //   if (previousState !== currentState) {
    //     console.log("distance updated!");
    //     previousState = currentState;
    //     onDistanceChangeObservable.notifyObservers(currentState); // notify
    //   }
    // });
    // helloSphere.onDistanceChangeObservable = onDistanceChangeObservable;
    // const blueColor = Color3.Blue();
    // helloSphere.onDistanceChangeObservable.add((distance) => {
    //   const isCloseEnough = distance <= 1.2;
    //   const material = helloSphere.mesh.material as StandardMaterial;
    //   const isBlue = material.diffuseColor === blueColor;
    //   const isRed = material.diffuseColor === redColor;
    //   if (isCloseEnough && !isBlue && !isRed) {
    //     material.diffuseColor = blueColor;
    //   } else if (!isCloseEnough && isBlue) {
    //     material.diffuseColor = whiteColor;
    //   }
    // });

    // // 3. create observer
    // const observer = new Observer<number>((distance) => {
    //   helloSphere.label.textBlock.text = "d: " + distance.toFixed(2);
    // }, -1);

    // // 4. add observer using coroutine
    // const addObserverCoruotine = function* () {
    //   yield; //return 
    //   console.log("frame " + scene.getFrameId() + ": add observer");
    //   onDistanceChangeObservable.observers.push(observer);
    // };
    // scene.onBeforeRenderObservable.runCoroutineAsync(addObserverCoruotine());

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
    this.initLocomotion(movement, xr, featureManager, groundInstance._mesh ,scene);

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
