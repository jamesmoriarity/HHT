import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Card.css"
import { CardHelper } from "./CardHelper";
import { gsap } from "gsap"
import { flattenDiagnosticMessageText } from "typescript";

export function Card(props:any){
    let scene:THREE.Scene = new THREE.Scene();
    let gltf:any;
    let mount:any;
    let containerRef = useRef(null)
    let renderer:THREE.WebGLRenderer = CardHelper.buildRenderer()
    let camera:THREE.PerspectiveCamera = CardHelper.buildCamera()
    let rightSide:THREE.Group = new THREE.Group()
    let leftSide:THREE.Group = new THREE.Group()
    let originalVals = {rads: -1 * Math.PI}
    let lastRads = originalVals.rads
    let targetVals = {
        rads: 0,
        onUpdate:()=>{
            let delta:number = originalVals.rads - lastRads
            lastRads = originalVals.rads
            rightSide.rotateY(delta)
            leftSide.rotateY(delta * -1)
            renderScene()
        },
        ease:'sine.inOut',
        duration: 1.6
    }
    let angleTween = gsap.to(originalVals, targetVals)
    let scaleTween = gsap.to(camera.position, {z:11.5, duration:0.8, ease:"sine.inOut", onUpdate:()=>{
        renderScene()
    }},)
    const onOpenComplete = function(){
        console.log('open is complete')
    }
    let animationTimeline = gsap.timeline({
        autoRemoveChildren:false, 
        paused:true, 
        smoothChildTiming:true, 
        onComplete: onOpenComplete
    })
    animationTimeline.add(angleTween, 0)
    animationTimeline.add(scaleTween, 0.7)

    const openCard = function(){
        animationTimeline?.kill()
        animationTimeline?.restart()
    }
    const closeCard = function(){
        console.log('closeCard')
        animationTimeline.reverse()
    }
    
    const buildScene = function(){
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xcccccc );
        scene.add(camera)
        CardHelper.buildLighting(scene)
        CardHelper.buildBackground(scene)
        CardHelper.buildCenter(scene)
        rightSide = CardHelper.buildRightSide(scene)
        leftSide = CardHelper.buildLeftSide(scene)
    }
    const renderScene = function(){
        while(mount && mount.childElementCount > 0){
            mount.removeChild(mount.firstChild)
        }
        mount.appendChild( renderer.domElement );
        renderer.render( scene, camera );
    }
    const buildAndRender = function(){
        buildScene()
        renderScene()
    }
    const fadeIn = function(){
        console.log('fade in')
        if(!containerRef || !containerRef.current){
            return
        }
        let target = containerRef.current
        console.log('target', target)
        let fadeTween = gsap.to(target, 
            {opacity:1, duration:5, delay:1.2, ease:"power2.out", onUpdate:()=>{
                
            }}
        )
        console.log(fadeTween)
    }
    useEffect(()=>{
        buildScene()
        renderScene()
        fadeIn()
        setTimeout(()=>{openCard()}, 4000)
    },[])
    let cardOpen = false
    const onClickHandler = function(){
        if(cardOpen){
            cardOpen = false
            closeCard()
            return
        }
        cardOpen = true
        openCard();
    }
    return (
        <div ref={containerRef} id="cardContainer" onClick={(e)=>{onClickHandler()}}>
            <div ref={ref => (mount = ref)} />
        </div>
    )
}