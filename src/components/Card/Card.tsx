import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Card.css"
import { CardHelper } from "./CardHelper";
import { gsap } from "gsap"
import { flattenDiagnosticMessageText } from "typescript";
import { CardAnimator } from "./CardAnimator";
import { CardBuilder } from "./CardBuilder";

export function Card(props:any){
    let mount:any
    const onCardBuilt = function(){
        console.log('onCardBuilt')
        renderScene()
        cardAnimator.fadeIn()
    }
    const clearMount = function(){
        while(mount && mount.childElementCount > 0){
            mount.removeChild(mount.firstChild)
        }
    }
    const renderScene = function(){
        console.log('renderScene')
        let r:THREE.WebGLRenderer = cardBuilder.elements.renderer
        clearMount()
        mount.appendChild(r.domElement );
        r.render(cardBuilder.elements.scene,cardBuilder.elements.camera );
    }
    const onOpenComplete = function(){
        cardAnimator.fadeOut()
    }
    const buildAndRender = function(){
        cardBuilder = new CardBuilder(onCardBuilt, renderScene)
        cardAnimator = new CardAnimator(cardBuilder, onOpenComplete)
        cardBuilder.buildFullScene()
        renderScene()
    }
    const handleResize = function(){
        console.log('handleResize')
        buildAndRender()
    }
    const onUseEffect = function(){
        window.addEventListener("resize", handleResize);
        buildAndRender()
        return () => window.removeEventListener("resize", handleResize);
        // setTimeout(()=>{openCard()}, 3000)
    }
    let containerRef = useRef(null)
    let cardBuilder:CardBuilder = new CardBuilder(onCardBuilt, renderScene)
    let cardAnimator:CardAnimator = new CardAnimator(cardBuilder, onOpenComplete)
    useEffect(onUseEffect)
    return (
        <div ref={containerRef} id="cardContainer">
            <div id="cardContainerInner" ref={ref => (mount = ref)} />
        </div>
    )
}