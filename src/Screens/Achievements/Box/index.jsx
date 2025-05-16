import React from "react";
import "./Box.scss"
import {AiFillLinkedin} from 'react-icons/ai'

const Box = ({data}) =>{
    return(
        <div className="Box">
            <h1>{data.college}</h1>
            <div className="circles">
                <div className="circleContain">
                    <div className="circle"><h3>{data.port}</h3></div>
                    <p> Portfolio <br /> Websites</p>
                </div>
                <div className="circleContain">
                    <div className="circle"><h3>{data.mern}</h3></div>
                    <p>MERN stack <br /> projects</p>
                </div>
                <div className="circleContain">
                    <div className="circle"><h3>{data.train}</h3></div>
                    <p>Students <br /> Trained</p>
                </div>
                <div className="circleContain">
                    <div className="circle"><h3>{data.days}</h3></div>
                    <p>Days</p>
                </div>
            </div>
            <h2>{data.team}</h2>
            <div className="projects">
                {
                    (data.pro).map((elem)=>         
                    <a className="project" href={elem.team[0].site}>
                        <img src={elem.img.filename} alt="1" />
                        <div className="team">
                                {
                                    (elem.team).map((mem)=>
                                    
                                    <a className="mem" href={mem.linked}>
                                            <p>{mem.name}</p>
                                            <AiFillLinkedin color="#053859" size={20}/>
                                    </a>
                                    )
                                }
                        </div>
                    </a>
                    )
                }
            </div>
        </div>
    )
}

export default Box