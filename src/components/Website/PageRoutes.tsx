import { Routes, Route } from "react-router-dom";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Hawaii from "../Pages/Hawaii/Hawaii";
import Home from "../Pages/Home/Home";
import Testimonials from "../Pages/Testimonials/Testimonials";
import Washington from "../Pages/Washington/Washington";
import { WebsiteState } from "./WebsiteState";
import { useWebsiteStore } from "./WebsiteStore";
export interface PageRouteProps{
    width:number
}
export function PageRoutes(){
    const width:number = useWebsiteStore((state:WebsiteState)=>{
        return state.screenWidth
    }) 
    return  <Routes>
                <Route path="/"             element={<Home />} />
                <Route path="/hawaii"       element={<Hawaii/>} />
                <Route path="/washington"   element={<Washington/>} />
                <Route path="/about"        element={<About/>} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact"      element={<Contact />} />
                <Route path="*"             element={<Home />} />
            </Routes>
}
