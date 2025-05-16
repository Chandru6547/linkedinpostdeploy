import React, { useEffect, useState } from "react";
import "./Students.scss";
import Header from "../../Components/Header";
import Footer from "../Footer";
import BlogSection from "./blogSection";
import Frame from "./linkedinFrame";
import Frame2 from "./Linkedinframe2";
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import {
  Student1,
  Student2,
  InviteBT,
  jsonimg,
  json2,
  json3,
  json4,
  json5,
  json51,
} from "../../Assets";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../feedBack/form";
import Axios from "axios";
import { Snackbar, Alert } from "@mui/material"; // Import Snackbar and Alert components

const Students = (props) => {
  const navigate = useNavigate();
  console.log("In studends page");
  
  console.log(props.data.blogs);
  const blogs = props.data.blogs;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const feedback = props.data?.feedback;
  const studentsdata = props.data?.students;
  const linkedinposts = props.data?.students?.LinkedIn[0]?.linkedinposts;
  const studyMaterials = props.data?.students?.LinkedIn[0]?.Studymaterial;
  const [formData, setFormData] = useState({
    collegeName: "",
    email: "",
    message: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form to: https://bt-port-forms.onrender.com/api/registrations");
  
      const response = await Axios.post("https://thebettertomorrow.in/apiforms/api/messages", {
        id: formData.id, // If using default uuidv4, this can be omitted
        collegeName: formData.collegeName,
        email: formData.email,
        message: formData.message
      });
      
      console.log('Form registered successfully:', response.data);
      formReset();
      showSnackbar("Our team will contact you shortly!", "success"); // Show success Snackbar
    } catch (error) {
      console.error('Error registering form:', error);
      showSnackbar("There was an error submitting the form. Please try again.", "error"); // Show error Snackbar
    }
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset"; // Cleanup on component unmount
    };
  }, [isModalOpen]);

  const formReset = () => {
    setFormData({
      id: "", // or leave it out if it's auto-generated
      collegeName: "",
      email: "",
      message: ""
    });
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  return (
    <div className="Students">
      <Header />
      <div className="Students_body">
        <div className="content">
          <div className="text">
            <h1>Instant Feedback on Trainings</h1>
            <br />
            <p>
              No more waiting for post-training evaluations or struggling to
              identify areas that need improvement. This innovative approach
              revolutionizes the way we learn and develop by providing real-time
              insights and guidance.
            </p>

            <button onClick={() => setIsModalOpen(!isModalOpen)}>
              Click here &gt;
            </button>
          </div>
          <div></div>
          <img src={Student1} alt="first student" /> <div></div>
        </div>

        <div className="content">
          {!isMobile ? <img src={Student2} alt="second student" /> : null}

          <div className="text">
            <h1>Interview Preparation Tracker</h1>
            <br />

            <p>
              Our Interview Preparation Tracker is designed to help students
              organize and optimize their preparation journey with a structured
              approach. Whether you're just starting or refining your skills,
              this tracker ensures you're always on the right path.
            </p>

            <b style={{ marginTop: "30px" }}>Coming Soon..</b>
          </div>

          {isMobile ? <img src={Student2} alt="second student" /> : null}
        </div>

        {/* Blog Section */}
        <BlogSection blogs={blogs} />
        <h1 className="blogs-box mt-10">Success Stories Shared on Linkedin</h1>

        <Frame data={linkedinposts} />

        <h1 className="blogs-box ">Your Roadmap to Interview Success</h1>

        <Frame2 data={studyMaterials} />

        <div className="mydiv">
          <h1 className="blogs-box">Wanna invite us to your college?</h1>
          <div className="image-form-container">
            <img src={InviteBT} alt="Invite Button" className="invite-image" />
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="collegeName">College Name:</label>
                  <input
                    type="text"
                    id="collegeName"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    className="custom-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="custom-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="custom-textarea"
                    rows="4"
                  ></textarea>
                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <FeedbackForm data = {feedback}/>
          </div>
        </div>
      )}

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top", // Top of the page
          horizontal: "right", // Right corner of the page
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Students;
