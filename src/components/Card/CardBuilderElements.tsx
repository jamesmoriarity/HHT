import * as THREE from "three";

export class CardBuilderElements{
    scene:THREE.Scene
    renderer:THREE.WebGLRenderer
    camera:THREE.PerspectiveCamera
    mount:any;
    constructor(){
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({alpha:true, antialias:true });
        this.camera = new THREE.PerspectiveCamera(14, 1, 1, 1000 );
    }
}