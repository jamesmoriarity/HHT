import Page from "../Page";
import './Contact.css'

export default function Contact(){
    return <Page id="home-page">
            <div className="contact">
                <div className="page-content">
                    <h1>Contact Dori</h1>
                    <div className="row contact-bar">
                        <div className="column left-large">
                            <h3>Social Media</h3>
                            <div className="row">
                                <div className='social-block column left'>
                                    <img src="img/instagram.jpeg" width="100" height="auto"/>
                                    <div className="social-block-label">Instagram</div>                             
                                </div> 
                                <div className='social-block column left'>
                                    <img src="img/facebook.png" width="100" height="auto"/>
                                    <div className="social-block-label">Facebook</div>
                                </div>
                                <div className='social-block column left'>
                                    <img src="img/linkedin.png" width="100" height="auto"/>
                                    <div className="social-block-label">Linkedin</div>
                                </div>
                            </div>
                        </div>
                        <div className="column right-small side-bar">
                            <h3>Email</h3>
                            <a href="mailto:dori.hanson@compass.com">dori.hanson@compass.com</a>
                            <h3>Phone</h3>
                            <p>206-713-0621</p>
                            <h3>Compass Site</h3>
                            <p><a href='http://www.compass.com/agents/dori-hanson/'>compass.com/agents/dori-hanson</a></p>
                        </div> 
                    </div>
                </div>
            </div>
            </Page> 
}