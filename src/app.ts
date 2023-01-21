import { Engine, MeshBuilder, Scene } from "babylonjs";
import { AdvancedDynamicTexture, TextBlock } from "babylonjs-gui";


export class App{
    private engine: Engine;
    private canvas: HTMLCanvasElement;

    constructor(engine:Engine, canvas:HTMLCanvasElement) {
        this.engine = engine;
        this.canvas = canvas;
        console.log("app object constructor called");

    }



    async createScene()
    {
        const scene = new Scene(this.engine);
        scene.createDefaultCameraOrLight();

        const sphere = MeshBuilder.CreateBox("sphere", {size :1}, scene);
        sphere.position.x = 0;
        sphere.position.y = 1;
        sphere.position.z = 5;

        const helloPlane =  MeshBuilder.CreatePlane("Hello plane", {size: 15 });
        helloPlane.position.y = 0;
        helloPlane.position.z = 5;

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


}



