import { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap'
import './Landscape.css'

export default function Landscape(props:any){
    const location = useLocation();
    const [pathName, setPathName] = useState(location.pathname)
    const [hasMoved, setHasMoved] = useState(false)
    let ref = useRef(null)
    useEffect(() => {
        console.log('ua-land')
        if(pathName == location.pathname && hasMoved){
            console.log('same location');
            return
        }
        setPathName(location.pathname)
        if(location.pathname === '/hawaii'){
            moveTo('hawaii')
            return
        }
        if(location.pathname === '/washington'){
            moveTo('washington')
            return
        }
        moveTo('home')
    }, [location]); 
    const getLocationName = function(pathName:string){
        let name:string = pathName.substring(1)
        return (name === '') ? 'home' : name
    }
    const moveTo = function(locationName:string){
        console.log('moveTo locationName', locationName)
        let x:number = 0
        switch(locationName){
            case 'home':
                x = 400;
                break
            case 'hawaii':
                x = 10;
                break
            case 'washington':
                x = 800;
                break
            default:
                x = 0
        }
        if(!hasMoved){
            gsap.set(ref.current, {x:x})
        }
        else{
            gsap.to(ref.current, {x:x})
        }
        setHasMoved(true)
    }
    /*
        build a scene 
    */
    return <div id="landscape" ref={ref}>Lanscape Component: {getLocationName(pathName)}</div>
}
