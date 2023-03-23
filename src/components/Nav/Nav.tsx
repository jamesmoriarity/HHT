import { useState } from "react"
import { Link } from "react-router-dom"
import Burger from "../Burger/Burger"
import './Nav.css'

export function Nav(){
    const [isOpen, setIsOpen] = useState(false)
    const getTopNav = () => {
        return <div className="links">
                    <ul>
                            <li><Link onClick={onNavClick} to="/">Home</Link></li> 
                            <li><Link onClick={onNavClick} to="/hawaii">Hawaii</Link></li>  
                            <li><Link onClick={onNavClick} to="/washington">Washington</Link></li>  
                            <li><Link onClick={onNavClick} to="/about">About Dori</Link></li>   
                            <li><Link onClick={onNavClick} to="/testimonials">Testimonials</Link></li> 
                            <li><Link onClick={onNavClick} to="/contact">Contact</Link></li> 
                        </ul>
                </div>
    }
    const onNavClick = () => {
        setIsOpen(false)
    }
    const onBurgerToggle = () => {
        setIsOpen(!isOpen)
    }
    const getClassName = () => {
        return 'nav' + ( (isOpen) ? ' open' : '')
    }
    return(
        <div className={getClassName()}>
            <Burger onToggle={onBurgerToggle} open={isOpen}/>
            {getTopNav()}
        </div>

    )
}