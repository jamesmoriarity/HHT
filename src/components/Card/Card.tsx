import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Card.css"
import { CardHelper } from "./CardHelper";
import { gsap } from "gsap"
import { flattenDiagnosticMessageText } from "typescript";
import { CardAnimator } from "./CardAnimator";
import { CardBuilder } from "./CardBuilder";

export function Card(props:any){
    const onCardBuilt = function(){}
    const onOpenComplete = function(){}
    let containerRef = useRef(null)
    let cardBuilder:CardBuilder = new CardBuilder(onCardBuilt)
    let cardAnimator:CardAnimator = new CardAnimator(cardBuilder, onOpenComplete)
    const buildAndRender = function(){
        cardBuilder = new CardBuilder(onCardBuilt)
        cardAnimator = new CardAnimator(cardBuilder, onOpenComplete)
        cardBuilder.buildFullScene()
        cardBuilder.renderScene()
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
    
    useEffect(onUseEffect)
    return (
        <div ref={containerRef} id="cardContainer">
            <div id="cardContainerInner" ref={ref => (cardBuilder.elements.mount = ref)} />
        </div>
    )
}