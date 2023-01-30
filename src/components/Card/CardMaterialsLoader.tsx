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
        this.targetLoads = 6
        this.successfulLoads = 0
        this.materials = new CardMaterials()
    }
    onMaterialLoaded = () => {
        this.successfulLoads++
        if(this.targetLoads === this.successfulLoads){
            this.callback(this.materials)
        }
    }
    
    load = () => {
        const alphaInsideURL:string = (this.isHorizontal) ? 'jpg/sky1.jpg' : 'jpg/panel_top.jpg'
        const alphaLogoURL:string = (this.isHorizontal) ? 'jpg/enso_left_h.jpg' : 'jpg/enso_left_h.jpg'
        const betaInsideURL:string = (this.isHorizontal) ? 'jpg/sky3.jpg' : 'jpg/panel_bottom.jpg'
        const betaLogoURL:string = (this.isHorizontal) ? 'jpg/enso_right_h.jpg' : 'jpg/enso_bottom_v.jpg'
        const centerFrontURL:string = (this.isHorizontal) ? 'jpg/sky2.jpg' : 'jpg/panel_center.jpg'
        const centerFrontTaglineURL:string = (this.isHorizontal) ? 'data/test2.svg' : 'data/test2.svg'        
        
        const textureLoader = new THREE.TextureLoader()
        textureLoader.load(alphaInsideURL, (texture: THREE.Texture)=>{
            this.materials.alphaInside = texture;
            this.onMaterialLoaded()
        })
        textureLoader.load(betaInsideURL, (texture: THREE.Texture)=>{
            this.materials.betaInside = texture;
            this.onMaterialLoaded()
        })
        textureLoader.load(centerFrontURL, (texture: THREE.Texture)=>{
            this.materials.centerFront = texture;
            this.onMaterialLoaded()
        })
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
