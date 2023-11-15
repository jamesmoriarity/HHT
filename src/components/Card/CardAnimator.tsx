import { CardBuilder } from "./CardBuilder"
import { CardDimensions } from "./CardDimensions"
import { gsap } from "gsap"
export class CardAnimator{
    cardBuilder:CardBuilder
    openTimeline:gsap.core.Timeline
    onOpenCallback:Function
    constructor(cardBuilder:CardBuilder, onOpenCallback:Function){
        this.cardBuilder = cardBuilder
        this.onOpenCallback = onOpenCallback
        this.openTimeline = this.buildOpenTimeline()
    }
    onOpenComplete = () =>{
        this.onOpenCallback()
    }
    buildOpenTimeline(){
        let animationTimeline = gsap.timeline({
            autoRemoveChildren:false, 
            paused:true, 
            smoothChildTiming:true, 
            onComplete: this.onOpenComplete
        })

        this.addOpenAnimation(animationTimeline)
        this.addZoomAnimation(animationTimeline)
        return animationTimeline
    }
    openCard = () => {
        let tagLineTween = gsap.to('#tag-line', {display:'block'})
        tagLineTween.restart()
        this.openTimeline.restart()
    }
    onFadeInComplete = () => {
        this.cardBuilder.renderMethod()
        setTimeout(this.openCard, 1000)
    }
    fadeIn(){ 
        this.onFadeInComplete()
        return
        console.log('fadeIn')
        let target = "#cardContainerInner"
        let fade = gsap.to(target, 
            {opacity:1, duration:1, delay:0, ease:"power2.out"}
        )
        let fadeTimeline = gsap.timeline({
            autoRemoveChildren:false, 
            paused:true, 
            smoothChildTiming:true, 
            onComplete: this.onFadeInComplete
        })
        fadeTimeline.add(fade)
        fadeTimeline.restart()
    }

    addOpenAnimation = (timeline:gsap.core.Timeline) => {
        let dims:CardDimensions = new CardDimensions()
        let originalVals = {rads: -3.1}
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
                this.cardBuilder.renderMethod()
            },
            ease:'sine.inOut',
            duration: 2.1
        }
        let angleTween = gsap.to(originalVals, targetVals)
  
        timeline.add(angleTween, 0)
    }  
    onZoomUpdate = (originalVals:any) => {
        this.cardBuilder.elements.camera.position.z = originalVals.z
        this.cardBuilder.renderMethod()
    }
    addZoomAnimation = (timeline:gsap.core.Timeline) => {
        return
        let originalVals = {z: 10}
        let targetVals = { z:8.7, duration:1.5, ease:"sine.inOut",
            onUpdate:()=>{
                this.onZoomUpdate(originalVals)
            }
        }
        let zoomTween = gsap.to(originalVals, targetVals)
        timeline.add(zoomTween, 2)
    }
}