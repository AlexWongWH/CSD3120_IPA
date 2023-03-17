import { AbstractMesh, Color3, CreateGround, Engine, Matrix, Mesh, MeshBuilder, PointerEventTypes, Scene, StandardMaterial, VideoTexture } from "babylonjs";
import { AdvancedDynamicTexture, TextBlock } from "babylonjs-gui";
import { AuthoringData } from "xrauthor-loader";


export class App{
    private engine: Engine;
    private canvas: HTMLCanvasElement;
    private data:AuthoringData;

    constructor(engine:Engine, canvas:HTMLCanvasElement, data:AuthoringData) {
        this.engine = engine;
        this.canvas = canvas;
        this.data = data;
        console.log("app object constructor called");

    }

    async createScene()
    {

        console.log(this.data);

        const scene = new Scene(this.engine);
        // scene.createDefaultCameraOrLight(false, true, true);

        // const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
        // camera.attachControl(this.canvas, true);


        
        // var ground = MeshBuilder.CreateGround("ground",{width:100, height:100}, scene)
        // const groundMaterial = ("groundMaterial");
        // const groundTexture = new BABYLON.Texture("path/to/texture.jpg");
        // // var groundMaterial = new BABYLON.StandardMaterial("groundMaterial");
        // ground.position.y = -2;

        // const sphere = MeshBuilder.CreateBox("sphere", {size :1}, scene);
        // sphere.position.x = 0;
        // sphere.position.y = 1;
        // sphere.position.z = 5;

        // const helloPlane =  MeshBuilder.CreatePlane("Hello plane", {size: 15 });
        // helloPlane.position.y = 0;
        // helloPlane.position.z = 5;
        // //the 3d quad for words
        // const helloTexture = AdvancedDynamicTexture.CreateForMesh(helloPlane);

        // const helloText = new TextBlock("hello");
        // helloText.text = "Hello XR";
        // helloText.color = "purple";
        // helloText.fontSize = 50;
        // helloTexture.addControl(helloText); //what to use for the texture


        // const videoHeight = 5;
        // const videoWidth = videoHeight * this.data.recordingData.aspectRatio;

        // const videoPlane = MeshBuilder.CreatePlane(
        //     "video plane",
        //     {
        //         height: videoHeight,
        //         width: videoWidth,
        //     },scene);

        // videoPlane.position.z = 8;
        // const videoMaterial = new StandardMaterial(
        //     "video material", scene);

        // const videoTexture = new VideoTexture(
        //     "video texture",this.data.video, scene);
    
        // videoTexture.video.autoplay = true;
        // videoTexture.onUserActionRequestedObservable.add(()=> {});

        // videoMaterial.diffuseTexture = videoTexture;
        // videoMaterial.roughness = 1;
        // videoMaterial.emissiveColor = Color3.White();
        // videoPlane.material = videoMaterial;
        
        // scene.onPointerObservable.add(evtData => {
        //     console.log("picked"); // scene observable
        //     if(evtData.pickInfo.pickedMesh === videoPlane)
        //     {
        //         console.log("picked on video plane");
        //         videoTexture.video.play();
        //         if(videoTexture.video.paused)
        //         {
        //             videoTexture.video.play();
        //         }
        //         else
        //         {
        //             videoTexture.video.pause();
        //         }
        //         console.log(videoTexture.video.paused ? "paused" : "playing");

        //     }
        //     else
        //     {
        //         console.log(evtData.pickInfo.pickedMesh);
        //     }
        // }, PointerEventTypes.POINTERPICK);


        //depending on the tracker, [the paper]
        const id = "m2"; // first marker that moved
        // const track = this.data.recordingData.animation.tracks[id];
        // const length = track.times.length;
        // const fps = length/this.data.recordingData.animation.duration;
        // const keyframes = [];

        // for(let i = 0; i < length; i++)
        // {
        //     const mat = Matrix.FromArray(track.matrices[i].elements);
        //     const pos = mat.getTranslation();
        //     //convert position from right to left handed coordinates
        //     keyframes.push({
        //         frame: track.times[i] * fps,
        //         value: pos,
        //     });

        // }

        // const animation         


        //enable ar setting from babylon js
        //return a promise 
        // const xr = await scene.createDefaultXRExperienceAsync({
        //     uiOptions:{
        //         sessionMode : "immersive-vr"
        //     }
        // });

        // //for debugging
        // (window as any).xr = xr;

        return scene;
    }


    async createXRScene(canvasID, authoringData)
    {

        const scene = new Scene(this.engine);
        scene.createDefaultCameraOrLight();


        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(this.canvas, true);


        const sphere = MeshBuilder.CreateBox("sphere", {size :1}, scene);
        sphere.position.x = 0;
        sphere.position.y = 1;
        sphere.position.z = 5;

        const helloPlane =  MeshBuilder.CreatePlane("Hello plane", {size: 15 });
        helloPlane.position.y = 0;
        helloPlane.position.z = 5;
        
        var ground = MeshBuilder.CreateGround("ground",{width:100, height:100}, scene)
        
        const groundMaterial = ("groundMaterial");
        const groundTexture = new BABYLON.Texture("path/to/texture.jpg");
        // var groundMaterial = new BABYLON.StandardMaterial("groundMaterial");
        // groundMaterial.diffuseTexture = new BABYLON.Texture("path/to/ground/texture.jpg");

        ground.position.y = -2;
        
        //the 3d quad for words
        const helloTexture = AdvancedDynamicTexture.CreateForMesh(helloPlane);

        const helloText = new TextBlock("hello");
        helloText.text = "Hello XR";
        helloText.color = "purple";
        helloText.fontSize = 50;
        helloTexture.addControl(helloText); //what to use for the texture


        //enable ar setting from babylon js

        //return a promise 
        const xr = await scene.createDefaultXRExperienceAsync({
            uiOptions:{
                sessionMode : "immersive-vr"
            }
        });

        //for debugging
        (window as any).xr = xr;




        return scene;
    }



    // async createScene()
    // {
    //     const scene = new Scene(this.engine);
    //     scene.createDefaultCameraOrLight();
    //     const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    //     camera.attachControl(this.canvas, true);
    //     const sphere = MeshBuilder.CreateBox("sphere", {size :1}, scene);
    //     sphere.position.x = 0;
    //     sphere.position.y = 1;
    //     sphere.position.z = 5;
    //     const helloPlane =  MeshBuilder.CreatePlane("Hello plane", {size: 15 });
    //     helloPlane.position.y = 0;
    //     helloPlane.position.z = 5;

    //     var ground = MeshBuilder.CreateGround("ground",{width:100, height:100}, scene)
    //     const groundMaterial = ("groundMaterial");
    //     const groundTexture = new BABYLON.Texture("path/to/texture.jpg");
    //     // var groundMaterial = new BABYLON.StandardMaterial("groundMaterial");
    //     // groundMaterial.diffuseTexture = new BABYLON.Texture("path/to/ground/texture.jpg");
    //     ground.position.y = -2;
    //     //the 3d quad for words
    //     const helloTexture = AdvancedDynamicTexture.CreateForMesh(helloPlane);
    //     const helloText = new TextBlock("hello");
    //     helloText.text = "Hello XR";
    //     helloText.color = "purple";
    //     helloText.fontSize = 50;
    //     helloTexture.addControl(helloText); //what to use for the texture
    //     //enable ar setting from babylon js
    //     //return a promise 
    //     const xr = await scene.createDefaultXRExperienceAsync({
    //         uiOptions:{
    //             sessionMode : "immersive-vr"
    //         }
    //     });
    //     //for debugging
    //     (window as any).xr = xr;
    //     return scene;
    // }


}



