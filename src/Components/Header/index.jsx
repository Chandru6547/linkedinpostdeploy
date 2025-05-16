import React, { useEffect, useState } from "react";
import "./Header.scss"
import { logo } from "../../Assets";
import { Link } from "react-router-dom";
import { CiMenuBurger } from 'react-icons/ci'
import { useLocation } from "react-router-dom";

const Header = () =>{
    const [url,setUrl] = useState();
    const location = useLocation();
    const [nav,setNav] = useState(false);
    useEffect(() => {
      setUrl(location.pathname);
    }, [location.pathname]);
    return(
        <div className="Header">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <ul>
                 <Link to="/" className={url === "/" ? "focus" :""}>Home</Link>
                 <Link to="/About" className={url === "/About" ? "focus" :""}>About us</Link>
                 <Link to="/Program" className={url === "/Program" ? "focus" :""}>Online Programs</Link>
                 <Link to="/Achievements" className={url === "/Achievements" ? "focus" :""}>Achievements</Link>
                 <Link to="/Placement" className={url === "/Placement" ? "focus" :""}>Placements</Link>
                 <Link to="/Students" className={url === "/Students" ? "focus" :""}>Students</Link>
            </ul>
            <div className="mob">
                <CiMenuBurger size={30} onClick={()=>setNav((prev)=>!prev)}/>
                {
                    nav?
                    <div className="MobNav">
                        <ul>
                        <Link to="/" className={url === "/" ? "mobFocus" :""}>Home</Link>
                        <Link to="/About" className={url === "/About" ? "mobFocus" :""}>About us</Link>
                        <Link to="/Program" className={url === "/Program" ? "mobFocus" :""}>Online Programs</Link>
                        <Link to="/Achievements" className={url === "/Achievements" ? "mobFocus" :""}>Achievements</Link>
                        <Link to="/Placement" className={url === "/Placement" ? "mobFocus" :""}>Placements</Link>
                        <Link to="/Students" className={url === "/Students" ? "mobFocus" :""}>Students</Link>
                        </ul>
                    </div>:
                    null
                }
            </div>
        </div>
    )
}

export default Header