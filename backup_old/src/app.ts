import { AbstractMesh, CreateGround, Engine, Mesh, MeshBuilder, Scene } from "babylonjs";
import { AdvancedDynamicTexture, TextBlock } from "babylonjs-gui";


export class App{
    private engine: Engine;
    private canvas: HTMLCanvasElement;
    private data:any;

    constructor(engine:Engine, canvas:HTMLCanvasElement, data:any) {
        this.engine = engine;
        this.canvas = canvas;
        this.data = data;
        console.log("app object constructor called");

    }

    async createScene()
    {

        console.log(this.data);

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



