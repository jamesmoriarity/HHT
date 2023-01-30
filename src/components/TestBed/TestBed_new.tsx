import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import "./TestBed.css"
import { CardMaterialsLoader } from "../Card/CardMaterialsLoader"
import { CardMaterials } from "../Card/CardMaterials"

export default function TestBedX(){
    const onMaterialsLoaded = function(materials:CardMaterials){
        console.log('onMaterialsLoaded', materials)
        takeAction(materials)
    }
    const takeAction = function(materials:CardMaterials){
        console.log('taking action', materials)
    }
    useEffect(
        ()=>{
            console.log('test bed useeffect')
            let materialLoader:CardMaterialsLoader = new CardMaterialsLoader(true, onMaterialsLoaded )
            materialLoader.load()

        } 
    )
    return  <div id="testbed-container">
                <div id="testbed-inner"/>
            </div>
}