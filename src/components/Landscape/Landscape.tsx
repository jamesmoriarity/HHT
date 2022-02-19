import { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap'
import './Landscape.css'

export default function Landscape(props:any){
    const ref = useRef(null)
    const location = useLocation();
    const [pathName, setPathName] = useState(location.pathname)
    const [hasMoved, setHasMoved] = useState(false)
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
        locations.set('home', 400)
        locations.set('hawaii', 10)
        locations.set('washington', 800)
        let x:number | undefined = locations.get(locationName)
        if(x === undefined){
            return 400
        }
        return x
    }
    const moveTo = function(locationName:string){
        const x:number = getX(locationName)
        const duration:number = (hasMoved) ? 1 : 0
        gsap.to(ref.current, {x:x, duration:duration})
        setHasMoved(true)
    }
    useEffect(handleLocationChange, [location]);
    return <div id="landscape" ref={ref}>Lanscape Component: {getLocationName(pathName)}</div>
}
