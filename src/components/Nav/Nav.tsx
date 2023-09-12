import { MouseEventHandler, ReactNode, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Burger from "../Burger/Burger"
import './Nav.css'

export interface NavLinkProps{
    to:string
    onClick:MouseEventHandler<HTMLAnchorElement>
    children:ReactNode
}
export function NavLink(props:NavLinkProps){
    const isActive = () => {
        const loc = window.location.pathname
        console.log('loc', loc)
        console.log('props.to', props.to)
        return (loc == props.to)
    }
    const getClassNames = () => {
        let classNames:string[] = ['nav-link']
        if(isActive()){
            classNames.push('active')
        }
        return classNames.join(' ')
    }
    return  <div className={getClassNames()}>
                <Link onClick={props.onClick} to={props.to}>
                    {props.children}
                </Link>
            </div>
}

export function Nav(){
    const [isOpen, setIsOpen] = useState(false)
    const getTopNav = () => {
        return <div className="links">
                    <ul>
                            <li><NavLink onClick={onNavClick} to="/">Home</NavLink></li> 
                            <li><NavLink onClick={onNavClick} to="/hawaii">Hawaii</NavLink></li>  
                            <li><NavLink onClick={onNavClick} to="/washington">Washington</NavLink></li>  
                            <li><NavLink onClick={onNavClick} to="/about">About Dori</NavLink></li>   
                            <li><NavLink onClick={onNavClick} to="/testimonials">Testimonials</NavLink></li> 
                            <li><NavLink onClick={onNavClick} to="/contact">Contact</NavLink></li> 
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
            {getTopNav()}
            <Burger onToggle={onBurgerToggle} open={isOpen}/>
        </div>

    )
}