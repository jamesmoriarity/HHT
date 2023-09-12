import { useState, useEffect } from "react";
import Page from "../Page";
import *  as content from './WashingtonContent'
import { PageRouteProps } from "../../Website/PageRoutes";

export default function Washington(props:PageRouteProps){
    const getMobileLayout = () => {
        return  <Page id="washington-page">
                    <div className="washington">
                        <div className="page-content">
                            <h1>Washington Market</h1>
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
        return  <Page id="washington-page">
                    <div className="washington">
                        <div className="page-content">
                            <h1>Washington Market</h1>
                            <div className="row">
                                <div className="column left">
                                {content.Primary()}  
                                {content.Secondary()}
                                </div>
                                <div className="column right">
                                    <div className="image-holder">
                                        {content.Img()}
                                    </div>
                                    <div className="image-holder">
                                        {content.Img()}
                                    </div>
                                </div>
                            </div>         
                        </div>
                    </div>
                </Page>
    }
    return((props.width < 700) ? getMobileLayout() : getDesktopLayout())
}