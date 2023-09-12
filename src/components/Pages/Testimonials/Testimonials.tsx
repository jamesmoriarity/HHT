import Page from "../Page";

export default function Testimonials(){
    return <Page id="testimonials">
            <div className="about">
                <div className="page-content">
                    <h1>Testimonials</h1>
                    <div className="row">
                        <div className="column left-large">
                        <div className='stars'>★★★★★</div>
                            "Dori is an amazing person and was super helpful throughout the property purchase process. Dori was able to find me a property before it was listed and helped us finding the right house. She was quite professional in executing this deal - more importantly, she was extremely responsive, and was available at odd hours, weekends, etc. It was an amazing experience of working with Dori.. I wish her all the luck.. Tx."
                            <div className='client-name'> - Janmesh</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column left-large">
                            <div className='stars'>★★★★★</div>
                                "Dori was super helpful and responsive throughout the listing and selling process. Keen eye for detail and makes sure to take care of the property (example: one bulb dimmer than the other, cleaning the patio railings, and window shades, etc). She addressed buyer and buyer agent questions really quickly, all day long. She was kind enough to correspond with the HOA to get help whenever needed. If I were to sell another property in the Seattle area, I would definitely sign up Dori again as my agent."  
                                <div className='client-name'> - Rahul</div>               
                            </div>
                    </div>
                </div>
            </div>
            </Page> 
}