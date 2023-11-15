import { useState, useEffect } from "react";
import Page from "../Page";
import *  as content from './HawaiiContent'
import * as webstore from "../../Website/WebsiteStore";

export default function Hawaii(){
    const getMobileLayout = () => {
        return  <Page id="hawaii-page">
                    <div className="hawaii">
                        <div className="page-content">
                            <h1>Hawaii Market</h1>
                            <div className='row'>
                                {content.Primary()}
                            </div>
                            <div className='row'>
                                <div className='column left'>{content.ImgOne()}</div>
                                <div className='column right'>{content.ImgTwo()}</div>
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
                                    <div className="image-holder">{content.ImgOne()}</div>
                                    <div className="image-holder">{content.ImgTwo()}</div>
                                </div>
                            </div>         
                        </div>
                    </div>
                </Page>
    } 
    return((webstore.IsMobile()) ? getMobileLayout() : getDesktopLayout()) 
}