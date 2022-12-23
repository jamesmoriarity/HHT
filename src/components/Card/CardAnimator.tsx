import { CardBuilder } from "./CardBuilder"
import { CardBuilderElements } from "./CardBuilderElements"
import { CardDimensions } from "./CardDimensions"
import { gsap } from "gsap"
export class CardAnimator{
    cardBuilder:CardBuilder
    elements:CardBuilderElements
    animationTimeline:gsap.core.Timeline
    onOpenCompleteCallback:Function

    constructor(cardBuilder:CardBuilder, onOpenComplete:Function){
        this.cardBuilder = cardBuilder
        this.elements = cardBuilder.elements
        this.onOpenCompleteCallback = onOpenComplete
        this.animationTimeline = this.buildTimeline()
    }
    buildTimeline(){
        let animationTimeline = gsap.timeline({
            autoRemoveChildren:false, 
            paused:true, 
            smoothChildTiming:true, 
            onComplete: this.onOpenCompleteCallback()
        })
        this.addOpenAnimation(animationTimeline)
        return animationTimeline
    }
    openCard(){ // moveto animator
        this.animationTimeline.restart()
    }

    onFadeComplete(){ // moveto animator
        console.log('onFadeComplete')
        this.cardBuilder.renderScene()
        setTimeout(this.openCard, 1000)
    }
    fadeIn(){ // moveto animator
        let target = "#cardContainerInner"
        let fade = gsap.to(target, 
            {opacity:1, duration:1, delay:0, ease:"power2.out"}
        )
        let fadeTimeline = gsap.timeline({
            autoRemoveChildren:false, 
            paused:true, 
            smoothChildTiming:true, 
            onComplete: this.onFadeComplete
        })
        fadeTimeline.add(fade)
        fadeTimeline.restart()
    }
    fadeOut(){ // moveto animator
        let target = "#cardContainer"
        let fadeTween = gsap.to(target, 
            {opacity:0, duration:3, delay:0, ease:"power2.out", onUpdate:()=>{
                
            }}
        )     
    }


    addOpenAnimation(timeline:gsap.core.Timeline){
        let dims:CardDimensions = new CardDimensions()
        let originalVals = {rads: -3.1415}
        let lastRads = originalVals.rads
        let targetVals = {
            rads: 0,
            onUpdate:()=>{
                let delta:number = originalVals.rads - lastRads
                lastRads = originalVals.rads
                if(dims.isHorizontal){
                    this.cardBuilder.alphaPanel.rotateY(delta * -1)
                    this.cardBuilder.betaPanel?.rotateY(delta)
                }
                else{
                    this.cardBuilder.alphaPanel.rotateX(delta * -1)
                    this.cardBuilder.betaPanel?.rotateX(delta)
                }
                this.cardBuilder.renderScene()
            },
            ease:'sine.inOut',
            duration: 2.6
        }
        let angleTween = gsap.to(originalVals, targetVals)
        timeline.add(angleTween, 0)
    }  
    addZoomTween(timeline:gsap.core.Timeline){
        let zoomTween = gsap.to(this.elements.camera.position, {z:7.9, duration:1.5, ease:"sine.inOut", onUpdate:()=>{
            this.cardBuilder.renderScene()
        }},)
        timeline.add(zoomTween, .75)
    }
}