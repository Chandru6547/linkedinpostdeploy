import React from "react";
import Header from "../../Components/Header";
import "./Home.scss"
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";
import Fifth from "./Fifth";
import Footer from "../Footer";

const Home = (props) =>{

    // console.log(props);

    let cards = props?.data?.cards;

    // console.log(cards);
    

    let homedata = props?.data?.home;

    // console.log(homedata);
    
    

    let first = homedata?.First[0];
    let third = homedata?.Second[0];
    let fourth = homedata?.Fourth[0];
    let fifth = homedata?.Fifth;
    let second = homedata?.Third[0];


    let fifthdata = {
        pagedata : fifth,
        cards: cards
    };
    
    console.log(fifth);
    
    
    return(
        <div className="Home">
            <Header/>
            <First data = {first}/>
            <Second data = {second}/>
            <Third data = {third} />
            <Fourth data = {fourth}/>
            <Fifth data = {fifthdata}/>
            <Footer/>
        </div>
    )
}

export default Home