import { Engine, Scene } from "babylonjs";
export declare class App {
    private engine;
    private canvas;
    constructor(engine: Engine, canvas: HTMLCanvasElement);
    createXRScene(canvasID: any, authoringData: any): Promise<Scene>;
}
