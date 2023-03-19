/**
 * @fileoverview A application typescript file that holds function which creates the ground for the class room
 * @author Wong Wei Hao
 * @package
 */


import { Scene, Sound, Vector3, Color3, PointLight } from "babylonjs";
import { App } from "../../app";


/**
 * Function to add sounds to the main application entry point
 * 
 * @param scene the scene to add sounds in
 * @param app add the sound to hard coded members of the app
 */
export function addSounds(scene: Scene, app :App) {
    app.bgm = new Sound(
      "music",
      "assets/sounds/BGM_LunasBigAdventure.ogg",
      scene,
      null,
      {
        loop: true,
        autoplay: true,
        volume: 0.1,
      }
    );
    //const sound = new Sound('sound','assets/sounds/button.mp3',scene,()=> sound.play(), {loop:true});
    app.buttonSound = new Sound(
      "buttonSound",
      "assets/sounds/button.mp3",
      scene,
      null
    );
  }