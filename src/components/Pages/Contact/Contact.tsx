import Page from "../Page";

export default function Contact(){
    return <Page id="home-page">
            <div className="contact">
                <div className="page-content">
                    <h1>Contact Dori</h1>
                    <div className="row">
                        <div className="column left-large">
                            Contact
                        </div>
                        <div className="column right-small side-bar">
                            <a href="mailto:dori.hanson@compass.com">dori.hanson@compass.com</a>
                            <p>206-713-0621</p>
                        </div> 
                    </div>
                </div>
            </div>
            </Page> 
}