import Page from "../Page"
import "./Home.css"
export default function Home(){
    return  <Page id="home-page">
                <div className="home">
                    <div className="page-content">
                        <div className='headlines'>
                            <h3 className="centered">
                                Aligning business with your life goals 
                            </h3>

                            <img className="side-image-home" src="./jpg/Home_Washington.jpg"/>
                            <img className="side-image-home" src="./jpg/Home_Hawaii.jpg"/>

                        </div>

                        <p>Thank you for taking the time to look into my business and let me know how I can help you to acheive your real estate goals</p>
                        <p>
                            My team has over four decades of experience in all aspects of real estate. We take our business personally.
                        </p>
                        <p>
                        We have fostered a strong reputation amongst peers and clients with our real estate knowledge. We have created a solid foundation for repeat client representation and a referral business platform. 
                        </p>
                        <p>We have been consistently ranked within the top ten percent of agents nationally for sales volume. Voted Seattle Magazines "Best Realtors in Client Satisfaction" consecutively since 2009 to present. 
                        </p>
                            
                    </div>
                </div>
            </Page>
}

// 