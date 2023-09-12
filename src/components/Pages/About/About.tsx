import { useState, useEffect } from "react";
import Page from "../Page";
import * as content from './AboutContent'
import { PageRouteProps } from "../../Website/PageRoutes";

export default function About(props:PageRouteProps){
    const getMobileLayout = () => {
        return  <Page id="about-page">
                    <div className="about">
                        <div className="page-content">
                            {content.Title()}
                            <div className='row'>
                                {content.Primary()}
                            </div>
                            <div className='row'>
                                <div className='column left'>{content.Img()}</div>
                            </div>
                            <div className='row'>
                                {content.Awards()}
                                {content.Specialties()}
                                {content.Secondary()}
                                {content.Tertiary()}
                            </div>
                        </div>
                    </div>
                </Page>
    }
    const getDesktopLayout = () => {
        return  <Page id="home-page">
                    <div className="about">
                        <div className="page-content">
                            {content.Title()}
                            <div className="row">
                                <div className="column left-large">
                                {content.Primary()}
                                {content.Secondary()}                    
                                </div>
                                <div className="column right-small side-bar">
                                    <img src="jpg/dori.jpg" className="side-image"/>
                                    {content.Awards()}
                                    {content.Specialties()}
                                    {content.Tertiary()}
                                </div> 
                            </div>
                        </div>
                    </div>
                </Page> 
    }
    return((props.width < 700) ? getMobileLayout() : getDesktopLayout())
}