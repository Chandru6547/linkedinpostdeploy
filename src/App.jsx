import "./App.scss";
import Home from "./Screens/Home";
import About from "./Screens/About";
import Program from "./Screens/Program";
import Achievements from "./Screens/Achievements";
import Placement from "./Screens/Placement";
import Students from "./Screens/Students";
import { Linkedin, Insta } from "./Assets";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Feedback from "./Screens/feedBack/form";
import StoryblokClient from "storyblok-js-client";
import React, { useState, useEffect } from "react";
import BlogSection from "./Screens/Students/blogSection"
import BlogDetails from "./Screens/BlogDetails/BlogDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";

const Storyblok = new StoryblokClient({
  accessToken: "l2PrYYzvkNva2BrrOAK3tQtt",
});

function App() {
  const [portFolioPage, setPortFolioPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Storyblok.get("cdn/stories/bt-portfolio", {
      version: "published",
    })
      .then((response) => {
        setPortFolioPage(response.data.story.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Storyblok content", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  // console.log("Li ked in card: ", portFolioPage?.body[8]);
  

  return (
    <div>
      <Router>
        <div className="App">
          <div className="icons">
            <a href="https://instagram.com/the_better_tomorrow_?igshid=NzZlODBkYWE4Ng==">
              <img src={Insta} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/company/better-tomorrow-training-institute/">
              <img src={Linkedin} alt="LinkedIn" />
            </a>
          </div>
            <HelmetProvider>
          <Routes>
            {/* <Route path="/" element={<Home data={portFolioPage?.body[0]} />} /> */}
            <Route path="/" element={<Home data={{ home: portFolioPage?.body[0], cards:  portFolioPage?.body[8]}} />} />
            <Route path="/About" element={<About data={portFolioPage?.body[1]} />} />
            <Route path="/Program" element={<Program data={portFolioPage?.body[2]} />} />
            <Route path="/Achievements" element={<Achievements data={portFolioPage?.body[3]} />} />
            <Route path="/Placement" element={<Placement data={portFolioPage?.body[4]} />} />
            <Route path="/Feedback" element={<Feedback data={portFolioPage?.body[5]} />} />
            <Route path="/Students" element={<Students data={{ feedback: portFolioPage?.body[5], students: portFolioPage?.body[6], blogs: portFolioPage?.body[7]?.blogs }} />} />
            <Route path="/Blog" element={<BlogSection blogs={portFolioPage?.body[7]?.blogs} />} />
            <Route path="/blogs/:slug" element={<BlogDetails blogs={portFolioPage?.body[7]?.blogs} />} />
          </Routes>
            </HelmetProvider> 
        </div>
      </Router>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
