import { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap'
import './Landscape.css'
import LandscapeSVG from "./LandscapeSVG";

export default function Landscape(props:any){
    const ref = useRef(null)
    const location = useLocation();
    const [pathName, setPathName] = useState(location.pathname)
    const [hasMoved, setHasMoved] = useState(false)
    const [bgToggle, setBGToggle] = useState(true)
    const handleLocationChange = function(){
        if(pathName == location.pathname && hasMoved){
            return
        }
        setPathName(location.pathname)
        switch(location.pathname){
            case '/hawaii':
                moveTo('hawaii')
                break
            case '/washington':
                moveTo('washington')
                break
            default:
                moveTo('home')
        }
    } 
    const getLocationName = function(pathName:string){
        let name:string = pathName.substring(1)
        return (name === '') ? 'home' : name
    }
    const getX = function(locationName:string){
        let locations:Map<string, number> = new Map()
        locations.set('home', -125)
        locations.set('hawaii', -340)
        locations.set('washington', 210)
        let x:number | undefined = locations.get(locationName)
        if(x === undefined){
            return 0
        }
        return x
    }
    const getScale = function(locationName:string){
        let locations:Map<string, number> = new Map()
        locations.set('home', 1)
        locations.set('hawaii', 2.5)
        locations.set('washington', 1.8)
        let scale:number | undefined = locations.get(locationName)
        if(scale === undefined){
            return 1
        }
        return scale
    }
    const moveTo = function(locationName:string){
        const x:number = getX(locationName)
        const duration:number = (hasMoved) ? 1.5 : 0
        const scale:number = getScale(locationName)
        const bottom:number = (locationName === 'home') ? -25 : (locationName === 'washington') ? 10 : -20;
        if(!hasMoved){
            console.log('has not moved, animate in')
            gsap.to("#LandscapeSVG", {opacity:1, duration:3})
        }
        gsap.to("#front", {x:x * 1.1, duration:duration, ease:'easeInOut'})
        gsap.to("#middle", {x:x * .7, duration:duration, ease:'easeInOut'})
        gsap.to("#back", {x:x * .6, duration:duration, ease:'easeInOut'})
        gsap.to(".background-panel", {x:x  * 1, duration:duration, ease:'easeInOut'})
 
        const opacityBlue:number = (locationName === 'home') ? .5 : (locationName === 'hawaii') ? .25 : .75;
        gsap.to(".background-panel.blue", {opacity:opacityBlue, delay: 0.75, duration:duration * 2, ease:'easeInOut'})
        const opacityPink:number = (locationName === 'home') ? .45 : (locationName === 'hawaii') ? .7 : 0.35;
        gsap.to(".background-panel.pink", {opacity:opacityPink, delay: 0.75, duration:duration * 2, ease:'easeInOut'})

        gsap.to("#LandscapeSVG", {scale:scale, bottom:bottom, duration:duration, ease:'easeInOut'})
        setHasMoved(true)
        setBGToggle(!bgToggle)
    }
    useEffect(handleLocationChange, [location]);
    return(
        <div id="landscape" ref={ref}>
            <div className="background-panel pink"></div>
            <div className="background-panel blue"></div>
            <LandscapeSVG/>
        </div>
    )
}
