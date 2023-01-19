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
        if(pathName === location.pathname && hasMoved){
            console.log('same path and hasMoved')
            return
        }

        console.log('not same path and hasnt moved')
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
    const getX = function(locationName:string){
        let locations:Map<string, number> = new Map()
        locations.set('home', 0)
        locations.set('hawaii', -320)
        locations.set('washington', 240)
        let x:number | undefined = locations.get(locationName)
        if(x === undefined){
            return 0
        }
        return x
    }
    const getScale = function(locationName:string){
        let locations:Map<string, number> = new Map()
        locations.set('home', 1)
        locations.set('hawaii', 1)
        locations.set('washington', 1)
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
        const bottom:number = 0; //(locationName === 'home') ? -25 : (locationName === 'washington') ? 10 : -20;
        if(!hasMoved){
            gsap.to("#LandscapeSVG", {opacity:1, duration:3})
        }
        gsap.to(".front", {x:x * .9, duration:duration, ease:'easeInOut'})
        gsap.to(".middle", {x:x * .7, duration:duration, ease:'easeInOut'})
        gsap.to(".back", {x:x * .6, duration:duration, ease:'easeInOut'})
        gsap.to(".background-panel", {x:x  * 1, duration:duration, ease:'easeInOut'})
        setHasMoved(true)
        setBGToggle(!bgToggle)
    }
    useEffect(handleLocationChange);
    return(
        <div id="landscape" ref={ref}>
            <LandscapeSVG/>
        </div>
    )
}

/*
<div className="background-panel pink"></div>
            <div className="background-panel blue"></div>
*/
