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
