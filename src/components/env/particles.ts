
/**
 * @fileoverview A application typescript file that holds function which particle system lights used for the VR class
 * @author Wong Wei Hao
 * @package
 */
import { Scene, Color4, Vector3, Texture, ParticleSystem } from "babylonjs";

/**
 * A function to create simple particle emmited in hard coded position
 * 
 * @param scene Scene to create particles in
 */
export function createParticles(scene: Scene) {
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

    particleSystem.emitRate = 500;

    particleSystem.direction1 = new Vector3(-1, 8, 1);
    particleSystem.direction2 = new Vector3(1, 8, -1);

    particleSystem.minEmitPower = 0.2;
    particleSystem.maxEmitPower = 0.8;
    particleSystem.updateSpeed = 0.01;

    particleSystem.gravity = new Vector3(0, -9.8, 0);
    particleSystem.start();
  }