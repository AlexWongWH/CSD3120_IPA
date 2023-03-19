/**
 * @fileoverview A application typescript file that holds function which create primative model used for the VR class
 * @author Wong Wei Hao
 * @package
 */

// using interface to extend babylon js 
import { AbstractMesh,Animation, ActionManager, Color3, Observable, ExecuteCodeAction, InterpolateValueAction, Mesh, MeshBuilder, PredicateCondition, Scene, SetValueAction, StandardMaterial, Vector3, Matrix } from "babylonjs";
import { TextPlane } from "./text-plane";
import { DynamicTexture, Quaternion, Vector4 } from "babylonjs";
import { AuthoringData } from "xrauthor-loader";



export function createAnimation(scene: Scene, mesh:AbstractMesh, app : AuthoringData, id:string)
{
    const track = app.recordingData.animation.tracks[id];
    const length = track.times.length;
    const fps = length / app.recordingData.animation.duration;
    
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
    return animation;
}





export function createBoxWithNumber(scene: Scene, position: Vector3, rotation : Vector3,
    text : string = "2",
    boxColor: Color3 = Color3.White(),
    textColor: string = "black")
: AbstractMesh {
// Create a material to apply the texture to the box
const material = new StandardMaterial("texturedMaterial", scene);

// Create a dynamic texture with the desired size (in pixels)
const textureSize = 128;
const texture = new DynamicTexture(
  "dynamicTexture",
  { width: textureSize, height: textureSize },
  scene,
  false
);

// Create a 2D drawing context for the texture and cast it to the standard CanvasRenderingContext2D
const ctx = texture.getContext() as CanvasRenderingContext2D;

// Clear the texture with a transparent background
ctx.clearRect(0, 0, textureSize, textureSize);

// Draw the number "2" on the texture
ctx.fillStyle = boxColor.toHexString();
ctx.fillRect(0, 0, 256, 256);
ctx.font = "60px Arial";
ctx.fillStyle = textColor;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(text, textureSize / 2, textureSize / 2);

// Update the texture
texture.update();

// Apply the texture to the material
material.diffuseTexture = texture;
material.emissiveColor = new Color3(0, 1, 0);

// Create the box and apply the material only to the front face (positive Z direction)
const faceUV = [
  new Vector4(0, 0, 0, 0), // Ignore all other sides
  new Vector4(0, 0, 0, 0),
  new Vector4(0, 0, 0, 0),
  new Vector4(0, 0, 0, 0),
  new Vector4(0, 0, 0, 0),
  new Vector4(0, 0, 1, 1), // Apply texture to front face
];

const box = MeshBuilder.CreateBox("box", { size: 1, faceUV: faceUV }, scene);
box.material = material;

box.position = position;
box.rotation = rotation;
return box;

  }

export interface HelloMesh{
    scene: Scene;
    mesh: Mesh;
    label: TextPlane;
    onDistanceChangeObservable: Observable<number>;
    onIntersectObservable: Observable<boolean>;

    sayHello( message? : string) : void;
}

export class HelloSphere extends AbstractMesh implements HelloMesh{
    scene: Scene;   
    mesh: Mesh;
    label: TextPlane;
    onDistanceChangeObservable: Observable<number> = new Observable<number>(); // default value 
    onIntersectObservable: Observable<boolean> = new Observable<boolean>(); // Default value

    constructor( 
        name: string,
        options: {diameter : number},
        scene: Scene
    ){
        super(name, scene);
        this.scene = scene;
        this.mesh = MeshBuilder.CreateSphere("hello sphere mesh", options, scene);
        this.mesh.material = new StandardMaterial("hello sphere material", scene);
        this.addChild(this.mesh);
        this.label = new TextPlane("hello sphere label", 1.5, 1, 0, options.diameter / 2 + 0.2, 
        0, "hello sphere", "purple","red",25,scene);
        this.addChild(this.label.mesh);
        

        this.initActions(); // action manger not found
    }

    sayHello(message?: string): void{
        console.log("message from hello sphere: " + message);
    }

    private initActions(){
        const actionManager = this.actionManager = new ActionManager(this.scene);
        actionManager.isRecursive = true;

        const light = this.scene.getLightById("default light");

        //add action where on picked diffuse to color to black
        actionManager.registerAction(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                light,
                "diffuse", // property
                Color3.Black(),
                1000
            )
        )
        ?.then(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                light,
                "diffuse",
                Color3.White(),
                1000
            )
        )

        actionManager.registerAction(
            new InterpolateValueAction(
                ActionManager.OnPickDownTrigger,
                this,
                "scaling",
                new Vector3(2,2,2),
                1000,
                new PredicateCondition(actionManager , () => {
                    return light!.diffuse.equals(Color3.Black());
                })
            ) 
        );

        const otherMesh = this.scene.getMeshById("sphere");
        
        actionManager.registerAction(
            new SetValueAction( //new action 
                {
                    trigger: ActionManager.OnIntersectionEnterTrigger, // intersecting against another mesh
                    parameter:{
                        mesh:otherMesh,
                        usePreciseIntersection:true,
                    }
                },
                    this.mesh.material,
                    "wireframe",
                    true
            )
        );

        this.scene.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnKeyUpTrigger,
                    parameter: "r",
                },
                () => {
                    this.scaling.setAll(1);
                    if (this.mesh.material) {
                        this.mesh.material.wireframe = false;
                    }
                    console.log("r was pressed :reset " + this.name);
                }
            )
        );
    }
}