import React from "react";
import { internship,scrum,customer } from "../../../Assets";
import "./Second.scss"

const Second = (props) =>{    
    const datas = props?.data?.Datas;
    return(
        <div className="Second">
            <div className="AllRound">
                <h1>
                Blaze A Trail On Our Pathway To <br /> Turbocharge Your Tech Career!             
                </h1>   
                <p>At Better Tomorrow, we immerse budding talents in live industrial projects and real-world problem-solving. We fortify their confidence with a solid foundation in industry essentials. Our commitment drives us, and our unwavering pillars include:</p>
            </div>
            <div className="service">
                {
                    datas?.map((elem)=>
                        <div className="service_box">
                            <img src={elem?.image?.filename} alt="img" />
                            <h1>{elem?.heading}</h1>
                            <p>{elem?.content}</p>
                        </div>
                    )
                }
            </div>
            <div className="immersive">
                <h1>
                Extensive Programs From Domain Experts <br /> That Meets Industry Expectations                </h1>
            </div>
        </div>
    )
}

export default Second