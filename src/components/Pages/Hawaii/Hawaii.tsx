import { useState, useEffect } from "react";
import Page from "../Page";
import *  as content from './HawaiiContent'

export default function Hawaii(){
    let [width, setWidth] = useState(window.innerWidth)
    const getMobileLayout = () => {
        return  <Page id="hawaii-page">
                    <div className="hawaii">
                        <div className="page-content">
                            <h1>Hawaii Market</h1>
                            <div className='row'>
                                {content.Primary()}
                            </div>
                            <div className='row'>
                                <div className='column left'>{content.Img()}</div>
                                <div className='column right'>{content.Img()}</div>
                            </div>
                            <div className='row'>
                                {content.Secondary()}
                            </div>
                        </div>
                    </div>
                </Page>
    }
    const getDesktopLayout = () => {
        return  <Page id="home-page">
                    <div className="hawaii">
                        <div className="page-content">
                            <h1>Hawaii Market</h1>
                            <div className="row">
                                <div className="column left">
                                {content.Primary()}  
                                {content.Secondary()}
                                </div>
                                <div className="column right">
                                    <div className="image-holder"><img className="side-image" src="./jpg/kohler2.jpg"/></div>
                                    <div className="image-holder"><img className="side-image" src="./jpg/kohler2.jpg"/></div>
                                </div>
                            </div>         
                        </div>
                    </div>
                </Page>
    }
    const getLayout = () => {
        return ((width < 700) ? getMobileLayout() : getDesktopLayout())
    }
    const onResize = function(){
       setWidth(window.innerWidth)
    }
    const listenForResize = function(){
       window.addEventListener("resize", onResize);
       return () => window.removeEventListener("resize", onResize);
    }
    useEffect(listenForResize)

    return(getLayout()) 
}