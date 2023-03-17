import { Mesh,MeshBuilder,Scene } from "babylonjs";
import { AdvancedDynamicTexture,TextBlock } from "babylonjs-gui";

export class TextPlane {
    public mesh:Mesh;
    public textBlock; TextBlock;
    constructor(
        name: string,
        width: number,
        height: number,
        x: number,
        y: number,
        z: number,
        backgroundColor: string,
        textColor: string,
        text: string,
        fontSize: number,
        scene: Scene,
    ) {
        // creating the plane
        // const helloPlane = MeshBuilder.CreatePlane("hello plane", { size: 15 });
        // helloPlane.position.y = 0;
        // helloPlane.position.z = 5;
        // const helloTexture = AdvancedDynamicTexture.CreateForMesh(helloPlane);
        // const helloText = new TextBlock("hello");
        // helloText.text = "Hello XR";
        // helloText.color = "purple";
        // helloText.fontSize = 50;
        // helloTexture.addControl(helloText);
 
        // adding the button plane
        const textPlane = MeshBuilder.CreatePlane(name + " text plane", {
            width: width,
            height: height,
        });
        textPlane.position.set(x,y,z);
        const planeTexture = AdvancedDynamicTexture.CreateForMesh(
            textPlane,
            width * 100,
            height * 100,
            false
        );
        planeTexture.background = backgroundColor;
        const planeText = new TextBlock(name + " plane text");
        planeText.text = text;
        planeText.color = textColor;
        planeText.fontSize = fontSize;
        planeTexture.addControl(planeText);

        this.mesh = textPlane;
        this.textBlock = planeText;
    }
}