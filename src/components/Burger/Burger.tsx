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


    return  <div className={getClassName()} onClick={toggle}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
}