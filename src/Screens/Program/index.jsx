import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../Components/Header";
import Footer from "../Footer";
import { ProgramIllustration } from "../../Assets";
import Axios from "axios";
import "./Program.scss";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const Program = (props) => {
  const navigate = useNavigate();
  console.log(props?.data);

  let second = props?.data?.BT_Uniqueness || [];
  let third = props?.data?.BTCourses || [];

  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity
  const [formData, setFormData] = useState({
    name: "",
    college_name: "",
    mail_id: "",
    phone_number: "",
    year_of_studies: "",
    course_name: "",
    course_duration: "",
    time_slot: "",
  });

  const [pop, setPop] = useState(false);
  const modalRef = useRef();

  // Handling changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handling form reset
  const handleFormReset = () => {
    setFormData({
      name: "",
      college_name: "",
      mail_id: "",
      phone_number: "",
      year_of_studies: "",
      course_name: "",
      course_duration: "",
      time_slot: "",
    });
    setPop(false);
  };

  // Show Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const requiredFields = [
      'name',
      'mail_id',
      'phone_number',
      'course_duration',
      'time_slot',
      'course_name',
      'role',
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        return;
      }
    }

    try {
      console.log("Submitting form to: https://bt-port-forms.onrender.com/api/registrations");
      console.log("Form Data:", formData);

      const response = await Axios.post("https://thebettertomorrow.in/apiforms/api/registrations", {
        id: formData.id, // If using default uuidv4, this can be omitted
        name: formData.name,
        college_name: formData.college_name,
        company_name: formData.company_name,
        mail_id: formData.mail_id,
        phone_number: formData.phone_number,
        year_of_studies: formData.year_of_studies,
        year_of_exp: formData.year_of_exp,
        course_duration: formData.course_duration,
        time_slot: formData.time_slot,
        course_name: formData.course_name,
        role: formData.role,
      });

      handleFormReset();
      console.log('Form registered successfully:', response.data);
      showSnackbar("Our team will contact you shortly!", "success"); // Show success Snackbar
    } catch (error) {
      console.error('Error registering form:', error.response?.data || error.message);
      showSnackbar("There was an error, please try again.", "error"); // Show error Snackbar
    }
  };
  

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setPop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="Program">
      <Header />
      <div className="top_div">
        <div className="top_left">
          <h2>Expert Guidance From Start To Summit</h2>
          <p>
            Designed and taught by Industrial Experts to help you transform Your
            Career into Dream-Job Reality.
          </p>
          <h5>
            Navigate Your Career Journey <br />
            <br />
            <br />
            <br /> Steering Your Journey Till Your <br /> Desired Destination
          </h5>
        </div>
        <div className="top_right">
          <img src={ProgramIllustration} alt="Program Illustration" />
        </div>
      </div>
      <div className="Program_sec">
        {second.map((elem, index) => (
          <div
            key={index}
            className="Program_box"
            style={{ background: elem.color }}
          >
            <img src={elem.img.filename} alt={elem.img} />
            <p>{elem.data}</p>
          </div>
        ))}
      </div>
      <div className="Program_third">
        <h1 className="head1">Algo And Problem Solving Expertise</h1>
        <div className="Program_third_section">
          {third
            .filter((elem) => elem.topic === "Alog")
            .map((item, index) => (
              <div
                key={index}
                className="Program_Card"
                onClick={() => {
                  setPop(true);
                  setFormData({
                    ...formData,
                    course_name: item.data,
                  });
                  console.log(formData);
                }}
              >
                <img src={item.img.filename} alt={item.data} />
                <h2>{item.data}</h2>
                <div className="line"></div>
                <p>{item.tech}</p>
              </div>
            ))}
        </div>
        <h1 className="head2">Domain Expertise</h1>
        <div className="Program_third_section">
          {third
            .filter((elem) => elem.topic === "Domain")
            .map((item, index) => (
              <div
                key={index}
                className="Program_Card"
                onClick={() => {
                  setPop(true);
                  setFormData({
                    ...formData,
                    course_name: item.data,
                  });
                  console.log(formData);
                }}
              >
                <img src={item.img.filename} alt={item.data} />
                <h2>{item.data}</h2>
                <div className="line"></div>
                <p>{item.tech}</p>
              </div>
            ))}
        </div>
      </div>
      {pop && (
        <div className="form_cover">
        <div className="modal-overlay1">
          <div className="modal-content1" ref={modalRef}>
            <button className="btn-close" onClick={handleFormReset}>
              &times;
            </button>
            <h2 className="modal-title">
              <p className="enroll-text">
               Enroll for the course
              </p>
              <p className="form-message">
                "Your future is created by what you do today, not tomorrow"
                <br />
                <br />
              </p>
            </h2>
            <form onSubmit={handleSubmit}>
     <div className="form-row">
       <div className="form-group">
         <label htmlFor="name">Name:</label>
         <input
           required
           type="text"
           id="name"
           name="name"
           placeholder="Enter your name"
           onChange={handleChange}
           value={formData.name}
         />
       </div>
       <div className="form-group">
         <label htmlFor="mail_id">E - mail:</label>
         <input
           required
           type="email"
           id="mail_id"
           name="mail_id"
           placeholder="Enter your email"
           onChange={handleChange}
           value={formData.mail_id}
         />
       </div>
     </div>
     
     <div className="form-row">
       <div className="form-group">
         <label htmlFor="phone_number">Phone:</label>
         <input
           required
           type="number"
           id="phone_number"
           name="phone_number"
           placeholder="Enter your phone number"
           onChange={handleChange}
           value={formData.phone_number}
         />
       </div>
       <div className="form-group">
         <label htmlFor="role">Your designation:</label>
         <select
           required
           name="role"
           onChange={handleChange}
           value={formData.role}
           id="role"
         >
           <option value="">Select Role</option>
           <option value="Student">Student</option>
           <option value="Working Professional">Working Professional</option>
         </select>
       </div>
     </div>

     {formData.role === "Working Professional" && (
       <div className="form-row">
       <div className="form-group">
         <label htmlFor="college_name">Company Name:</label>
         <input
           required
           type="text"
           id="college_name"
           name="college_name"
           placeholder="Enter your college name"
           onChange={handleChange}
           value={formData.college_name}
         />
       </div>
       <div className="form-group">
         <label htmlFor="year_of_studies">Year of Experiance:</label>
         <input
           required
           type="number"
           id="year_of_studies"
           name="year_of_studies"
           placeholder="Enter your year of study"
           onChange={handleChange}
           value={formData.year_of_studies}
         />
       </div>
     </div>
     )}
     {formData.role === "Student" && (
       <div className="form-row">
         <div className="form-group">
           <label htmlFor="college_name">College Name:</label>
           <input
             required
             type="text"
             id="college_name"
             name="college_name"
             placeholder="Enter your college name"
             onChange={handleChange}
             value={formData.college_name}
           />
         </div>
         <div className="form-group">
           <label htmlFor="year_of_studies">Year of Studies:</label>
           <input
             required
             type="number"
             id="year_of_studies"
             name="year_of_studies"
             placeholder="Enter your year of study"
             onChange={handleChange}
             value={formData.year_of_studies}
           />
         </div>
       </div>
     )}

     <div className="form-row">
       <div className="form-group">
         <label htmlFor="course_duration">Course Duration:</label>
         <select
           required
           name="course_duration"
           onChange={handleChange}
           value={formData.course_duration}
           id="course_duration"
         >
           <option value="">Select Duration</option>
           <option value="Fastrack course">Fastrack course (1 month)</option>
           <option value="Deep dive">Deep Dive (3 months)</option>
         </select>
       </div>
       <div className="form-group">
         <label htmlFor="time_slot">Time Slot:</label>
         <select
           required
           name="time_slot"
           onChange={handleChange}
           value={formData.time_slot}
           id="time_slot"
         >
           <option value="">Select Time Slot</option>
           <option value="Daily_One_hour">Daily One hour</option>
           <option value="Only_weekends">Only weekends</option>
         </select>
       </div>
     </div>

     <button type="submit" className="btn-submit">
       Enroll Now
     </button>
   </form>
          </div>
        </div>
      </div>
      )}
      <ToastContainer />
      <Footer />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top", // Top of the page
          horizontal: "right", // Right corner of the page
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "25%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Program;
