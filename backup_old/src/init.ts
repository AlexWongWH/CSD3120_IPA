import { Engine } from "babylonjs"; // handle graphics
import { App } from "./app";

console.log("hello to the vr setting up!");

export function createXRScene(canvasID : string, authoringData : any) {
// [dataType: string] : {[key: string] : any} }) {

    //document is the object representation of the html file
    //"as" is used as type casting
    const canvas:HTMLCanvasElement = document.getElementById("renderCanvas") as HTMLCanvasElement
    const engine = new Engine(canvas,true);

    //create own module
    const app = new App(engine, canvas, authoringData)
    
    app.createScene().then(scene => {
        engine.runRenderLoop(() => {
            scene.render();
        })
    });

    window.addEventListener("resize", function() {
        engine.resize();
    });


}

