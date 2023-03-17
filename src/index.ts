import {AuthoringData, loadAuthoringData} from "xrauthor-loader"
import {createXRScene} from "./init"



loadAuthoringData("assets/chemical").then((data: AuthoringData) => {
    createXRScene("renderCanvas", data);
        
});


