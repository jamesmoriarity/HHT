import * as THREE from "three";
import { SVGLoader, SVGResult } from "three/examples/jsm/loaders/SVGLoader";
import { CardMaterials } from "./CardMaterials";

export class CardMaterialsLoader{
    // load resources based on orientation
    isHorizontal:boolean;
    callback:Function;
    targetLoads:number;
    successfulLoads:number
    materials:CardMaterials
    constructor(isHorizontal:boolean, callback:Function){
        this.isHorizontal = isHorizontal
        this.callback = callback
        this.targetLoads = 3
        this.successfulLoads = 0
        this.materials = new CardMaterials()
    }
    onMaterialLoaded = () => {
        this.successfulLoads++
        console.log("this.successfulLoads", this.successfulLoads)
        if(this.targetLoads === this.successfulLoads){
            this.callback(this.materials)
        }
    }
    
    load = () => {
        const alphaLogoURL:string = (this.isHorizontal) ? 'jpg/logo-left.jpg' : 'jpg/logo-top.jpg'
        const betaLogoURL:string = (this.isHorizontal) ? 'jpg/logo-right.jpg' : 'jpg/logo-bottom.jpg'
        const centerFrontTaglineURL:string = (this.isHorizontal) ? 'data/test2.svg' : 'data/test2.svg'        
        
        const textureLoader = new THREE.TextureLoader()

        textureLoader.load(alphaLogoURL, (texture: THREE.Texture)=>{
            this.materials.alphaLogo = texture;
            this.onMaterialLoaded()
        })
        textureLoader.load(betaLogoURL, (texture: THREE.Texture)=>{
            this.materials.betaLogo = texture;
            this.onMaterialLoaded()
        })

        const svgLoader = new SVGLoader()
        svgLoader.load(centerFrontTaglineURL, (data:SVGResult)=>{
            this.materials.centerTagline = data; 
            this.onMaterialLoaded();
        })
    }
}
