import { Engine } from "babylonjs"; // handle graphics
import { App } from "./app";

console.log("hello to the vr setting up!");

//document is the object representation of the html file
//"as" is used as type casting
const canvas:HTMLCanvasElement = document.getElementById("renderCanvas") as HTMLCanvasElement

//// This forces the canvas to be in 2d
// const ctx = canvas.getContext("2d")
// ctx.font = "50px Arial"
// ctx.fillText("HelloXR", 50, 50)

const engine = new Engine(canvas,true);

//create own module
const app = new App(engine, canvas)


const scenePromise = app.createScene();

//since it's a promise, it doesn't return the scene object

scenePromise.then(scene => {
    engine.runRenderLoop(()=> {
        scene.render();
    })
})


// engine.runRenderLoop( () => {
//     scene.render();
// } )





