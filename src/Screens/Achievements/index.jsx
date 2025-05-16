import React from "react";
import Header from '../../Components/Header'
import Footer from "../Footer";
import { Achievement,achievebg } from "../../Assets";
import "./Achievements.scss"
import Box from "./Box";

const Achievements = (props) =>{
    
    let datas = props?.data?.StudentAchievements || [];

    return(
        <div className="Achievements" style={{background:achievebg}}>
        <div className="Head_wrap">
                <Header/>
            </div>
            <div className="Achieve">
                <div className="image">
                <img src={Achievement} alt="Achievement" />
                <div className="AchieveContent">
                    <h1>Achievements</h1>
                    <p>Take a look at what are all the achievements our students have done </p>
                    <h2>Learn More</h2>
                </div>
                </div>
            </div>
            {
                datas.map((elem)=>
                    <Box data={elem}/>
                )
            }
            <Footer/>
        </div>
    )
}


export default Achievements