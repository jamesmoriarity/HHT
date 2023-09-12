import { Routes, Route } from "react-router-dom";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Hawaii from "../Pages/Hawaii/Hawaii";
import Home from "../Pages/Home/Home";
import Testimonials from "../Pages/Testimonials/Testimonials";
import Washington from "../Pages/Washington/Washington";
import { useState, useEffect } from "react";

export interface PageRouteProps{
    width:number
}
export function PageRoutes(){
    let [width, setWidth] = useState(window.innerWidth)
    const onResize = function(){
        setWidth(window.innerWidth)
     }
     const listenForResize = function(){
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
     }
     useEffect(listenForResize) 
    return  <Routes>
                <Route path="/"             element={<Home />} />
                <Route path="/hawaii"       element={<Hawaii width={width} />} />
                <Route path="/washington"   element={<Washington width={width} />} />
                <Route path="/about"        element={<About width={width} />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact"      element={<Contact />} />
                <Route path="*"             element={<Home />} />
            </Routes>
}