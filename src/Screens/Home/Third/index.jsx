import React, { useState } from "react";
import { Extensive1,Extensive2,Extensive3,Extensive4,Extensive5,Extensive6,Skillhub } from "../../../Assets";
import "./Third.scss"

const Third = (props) =>{
    
    const datas = [
        {
            skill:'Programming Expertise',
            head:'Strong Foundation',
            content:"Any programming language / Framework from fundamentals",
            img:Extensive1
        },
        {
            skill:'Practical Expertise',
            head:'Upto 8 LPA',
            content:"C or Java,Data structures, Introduction to Web development.",
            img:Extensive6
        },
        {
            skill:'Product Expertise',
            head:'Above 12LPA',
            content:"Data structures, hands on experience on algorithms.",
            img:Extensive2
        },
        {
            skill:'Domain Expertise',
            head:'Fueling The Passion To Master IT trends',
            content:"AI or ML Engineer, Data Science, DevOps Engineer, Data Analyst",
            img:Extensive3
        },
        {
            skill:'Full Stack Web Development',
            head:'A World Enchanted With Super Powers',
            content:"MERN, MEAN, React with TypeScript, React with Django, Spring Boot",
            img:Extensive4
        },
        {
            skill:'Skillhub360',
            head:'Bridging Tech, Talent, And Teamwork',
            bold:'Interview 360 for Boosting your confidence',
            content:"Cracking Coding Interviews in Java, Quantitative Aptitude and Verbal Reasoning",
            img:Extensive5
        },
    ]
    const [Skills,setSkills] = useState(datas.find((elem)=>elem.skill === 'Programming Expertise'));

    let collegeImages = [];

    if(props?.data) {
        Object.keys(props?.data).forEach(key => {
            if (key.startsWith('collegeImage')) {
                if (props?.data[key]?.filename != null) {
                    collegeImages.push(props?.data[key]?.filename);
                }
            }
        });
    }

    return(
        <div className="Third">
            <div className="techStack">
                <nav>
                    <li style={Skills.skill === 'Programming Expertise'?{borderBottom:'5px solid #F7C651'}:null} onClick={()=>setSkills(datas.find((elem)=>elem.skill === 'Programming Expertise'))}>Programming Expertise</li>
                    <li style={Skills.skill === 'Practical Expertise'?{borderBottom:'5px solid #F7C651'}:null} onClick={()=>setSkills(datas.find((elem)=>elem.skill === 'Practical Expertise'))}>Practical Expertise</li>
                    <li style={Skills.skill === 'Product Expertise'?{borderBottom:'5px solid #F7C651'}:null} onClick={()=>setSkills(datas.find((elem)=>elem.skill === 'Product Expertise'))}>Product Expertise</li>
                    <li style={Skills.skill === 'Domain Expertise'?{borderBottom:'5px solid #F7C651'}:null} onClick={()=>setSkills(datas.find((elem)=>elem.skill === 'Domain Expertise'))}>Domain Expertise</li>
                    <li style={Skills.skill === 'Full Stack Web Development'?{borderBottom:'5px solid #F7C651'}:null} onClick={()=>setSkills(datas.find((elem)=>elem.skill === 'Full Stack Web Development'))}>Full Stack Web Development</li>
                    <li style={Skills.skill === 'Skillhub360'?{borderBottom:'5px solid #F7C651'}:null} onClick={()=>setSkills(datas.find((elem)=>elem.skill === 'Skillhub360'))}>
                        Skillhub360 <img src={Skillhub} alt="" />
                    </li>
                </nav>
                <div className="CardContainer">

                    <h1>{Skills.head}</h1>
                    <img src={Skills.img} alt="img" />
                    <p><b>{Skills.bold}</b></p><br />
                    <p>{Skills.content}</p>

                    {/* old Style ignore */}
                    {/* {
                        Skills.map((elem)=>
                            <div className="techCard">
                                <h1>{elem.head}</h1>
                                <div className="line"></div>
                                <p>{elem.content}</p>
                            </div>
                        )   
                    } */}
                </div>
            </div>
            <div className="celebrating">
                <h1>Their Beliefs Made Us So Remarkable <br /> On Where We Are Now!</h1>
                <p>In the below institutions we are doing long run programs not an one or two days events. For detailed event list check our Instagram page.</p><br />
                <div className="imgs">
                    {collegeImages.map((image, index) => (
                        <img key={index} src={image} alt={`College ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Third