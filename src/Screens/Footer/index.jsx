import React, { useState } from "react";
import { LuPhoneCall } from "react-icons/lu";
import { IoMailSharp } from "react-icons/io5";
import { Snackbar, Alert } from "@mui/material";  // Import Snackbar and Alert from Material-UI
import "react-toastify/dist/ReactToastify.css";
import "./Footer.scss";
import { yellowLogo } from "../../Assets";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Footer = () => {
    const [user_email, setuser_email] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);  // To control the Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState("");  // Message to show in Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");  // Severity of the Snackbar (success, error, etc.)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await Axios.post(
                "https://thebettertomorrow.in/apiforms/api/subscribe",
                {
                    email: user_email,
                }
            );
    
            if (res.status === 200 || res.status === 201) {
                setSnackbarMessage("Subscribed successfully.");
                setSnackbarSeverity("success");
                setuser_email("");
            } else {
                throw new Error("Subscription failed. Please try again.");
            }
        } catch (err) {
            console.log('Error: ', err);
            setSnackbarMessage(err.response?.data?.message || "An error occurred. Please try again.");
            setSnackbarSeverity("error");
        } finally {
            setOpenSnackbar(true);  // Show the Snackbar after the response
        }
    };
    
    const handleExternalNavigation = (url) => {
        window.open(url, "_blank");
    };

    const handleInternalNavigation = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="Footer">
            <div className="Logo">
                <img src={yellowLogo} alt="logo" />
                <h1>Better Tomorrow</h1>
            </div>
            <div className="line"></div>
            <div className="Footer_body">
                <ul>
                    <h2>Reach us</h2>
                    <li>
                        <LuPhoneCall id="icon" /> &nbsp; +91 9750503595
                    </li>
                    <li>
                        <LuPhoneCall id="icon" /> &nbsp; +91 8300287195
                    </li>
                    <li>
                        <IoMailSharp id="icon" /> &nbsp;
                        training@thebettertomorrow.in
                    </li>
                </ul>
                <ul>
                    <h2>Company</h2>
                    <li
                        onClick={() => handleInternalNavigation("/About")}
                        style={{ cursor: "pointer" }}
                    >
                        About
                    </li>
                    <li
                        onClick={() => handleInternalNavigation("/Achievements")}
                        style={{ cursor: "pointer" }}
                    >
                        Achievements
                    </li>
                    <li
                        onClick={() => handleInternalNavigation("/Placement")}
                        style={{ cursor: "pointer" }}
                    >
                        Placement status
                    </li>
                </ul>
                <ul>
                    <h2>Support</h2>
                    <li
                        onClick={() => handleInternalNavigation("/students")}
                        style={{ cursor: "pointer" }}
                    >
                        Forums
                    </li>
                    <li
                        onClick={() =>
                            handleExternalNavigation(
                                "https://github.com/Asabeneh/30-Days-Of-JavaScript"
                            )
                        }
                        style={{ cursor: "pointer" }}
                    >
                        JS documentations
                    </li>
                    <li
                        onClick={() =>
                            handleExternalNavigation(
                                "https://www.geeksforgeeks.org/quiz-corner-gq/?ref=ghm"
                            )
                        }
                        style={{ cursor: "pointer" }}
                    >
                        Quizz
                    </li>
                </ul>
                <ul>
                    <h2>Quick Links</h2>
                    <li
                        onClick={() => handleExternalNavigation("https://react.dev/learn")}
                        style={{ cursor: "pointer" }}
                    >
                        React JS
                    </li>
                    <li
                        onClick={() =>
                            handleExternalNavigation(
                                "https://nodejs.org/docs/latest/api/"
                            )
                        }
                        style={{ cursor: "pointer" }}
                    >
                        Node JS
                    </li>
                    <li
                        onClick={() =>
                            handleExternalNavigation(
                                "https://github.com/Asabeneh/30-Days-Of-JavaScript"
                            )
                        }
                        style={{ cursor: "pointer" }}
                    >
                        Javascript
                    </li>
                </ul>
                <div className="join">
                    <h3>JOIN OUR COMMUNITY</h3>
                    <form className="email" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={user_email}
                            onChange={(e) => {
                                setuser_email(e.target.value);
                            }}
                            placeholder="Your email Address"
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                    <li>Will send you job updates and our community news</li>
                </div>
            </div>

            {/* Material-UI Snackbar for notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Footer;
