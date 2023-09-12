import { useState } from "react"
import './Burger.css'

export interface BurgerProps{
    onToggle:Function
    open:boolean
}
export default function Burger(props:BurgerProps){
    const toggle = () => {
        props.onToggle()
        
    }
    const getClassName = () => {
        let className:string = 'burger' + ( (props.open) ? ' open' : '' )
        return className
    }
    const getMenuLabel = () =>{
        return null
        if(window.innerWidth > 800){
            return <span>Menu</span>
        }
    }

    return  <div className={getClassName()} onClick={toggle}>
                {getMenuLabel()}
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                
            </div>
}