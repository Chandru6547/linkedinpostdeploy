import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./form.scss";
import feedimg from "../../Assets/feedimg.png";

const FeedbackForm = ({ data }) => {
  const navigate = useNavigate();

  data = data.program_name;

  const initialFormData = data.reduce((acc, field) => {
    acc[field.name] = field.default_value || "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "range" ? Number(value) : value,
    }));
  };

  const isFieldVisible = (field) => {
    if (field.dependentField && field.dependentvalue) {
      return formData[field.dependentField] === field.dependentvalue;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Filter only visible fields
    const visibleFields = data.filter(isFieldVisible);
  
    // Create payload with only visible fields
    const payload = visibleFields.reduce((acc, field) => {
      acc[field.name] = formData[field.name];
      return acc;
    }, {});
  
    // Reset values of fields that are not visible
    const invisibleFields = data.filter((field) => !isFieldVisible(field));
    invisibleFields.forEach((field) => {
      payload[field.name] = null; // Optional: Remove or reset the value
    });
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch(
        "https://thebettertomorrow.in/apiforms/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      const result = await response.json();
  
      if (response.ok && result?.success) {
        setSnackbarMessage("Submitted Successfully");
        setOpenSnackbar(true);
        setTimeout(() => navigate(-1), 2000);
      } else {
        throw new Error(result?.error || "Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSnackbarMessage("An error occurred while submitting feedback.");
      setOpenSnackbar(true);
      setIsSubmitting(false);
    }
  };
  

  const renderField = (field, index) => {
    if (!isFieldVisible(field)) return null;

    const isRequired = field.required === "true";
    const isDisabled = !!field.default_value;

    return (
      <div key={index} className="form-group">
        <label htmlFor={field.name}>
          {field.label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        {field.type === "select" ? (
          <select
            id={field.name}
            name={field.name}
            onChange={handleChange}
            value={formData[field.name] || ""}
            required={isRequired}
            disabled={isDisabled}
          >
            {field?.options?.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            value={formData[field.name] || ""}
            required={isRequired}
            disabled={isDisabled}
          />
        ) : (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            value={formData[field.name] || ""}
            required={isRequired}
            disabled={isDisabled}
          />
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="feedback-form-container">
        <div className="image-section">
          <img src={feedimg} alt="Feedback Illustration" className="feed-img" />
        </div>
        <div className="form-section">
          <div className="cover">
            <h2 className="feedback-title">
              Your feedback today can make a difference tomorrow.
            </h2>
            <form onSubmit={handleSubmit} className="feedback-form">
              {data.map((field, index) => renderField(field, index))}
              <button
                type="submit"
                className={`submit-button flex items-center justify-center gap-2 
                  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded 
                  disabled:bg-gray-400 disabled:cursor-not-allowed`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l-3 3-3-3V4z"
                      ></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </form>
          </div>
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={"success"}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default FeedbackForm;
