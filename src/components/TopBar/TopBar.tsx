import Landscape from "../Landscape/Landscape";
import { LogoHeader } from "../LogoHeader/LogoHeader";
import './TopBar.css'

export function TopBar(){
   return <div className='top-bar'>
        <div className='top-bar-landscape'>
            <Landscape/>
        </div>
        <div className='top-bar-logo-header'>
            <LogoHeader/>
        </div>
    </div>
}