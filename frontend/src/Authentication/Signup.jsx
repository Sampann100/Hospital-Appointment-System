import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!formData.Username.trim()) {
      errors.Username = "Username is required.";
    } else if (!nameRegex.test(formData.Username)) {
      errors.Username = "Username can only contain letters and spaces.";
    }

    if (!formData.Email) {
      errors.Email = "Email is required.";
    }

    if (!formData.Password) {
      errors.Password = "Password is required.";
    }

    if (formData.Password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const { Username, Email, Password } = formData;

    if (Username && Email && Password) {
      try {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Username, Email, Password }),
        });

        if (response.ok) {
          const result = await response.json();
          setMessage(result.message || "Sign up successful!");
          setTimeout(() => {
            navigate("/Login");
          }, 1200);
        } else {
          const error = await response.json();
          setMessage(
            error.message || "Something went wrong. Please try again."
          );
        }
      } catch (error) {
        setMessage("Failed to connect to the server. Please try later.");
      }
    } else {
      setMessage("Please fill in all fields.");
    }

    setFormData({
      Username: "",
      Email: "",
      Password: "",
      confirmPassword: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{
          maxWidth: 420,
          width: "100%",
          background: "rgba(255,255,255,0.97)",
        }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#cd8f52" }}>
          Create Your Account
        </h2>
        {message && (
          <div
            className={`alert ${
              message.toLowerCase().includes("success")
                ? "alert-success"
                : "alert-danger"
            } py-2`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                id="name"
                name="Username"
                value={formData.Username}
                // onBlur={validateUsername}
                onChange={handleChange}
                className={`form-control ${
                  errors.Username ? "is-invalid" : ""
                }`}
                placeholder="Enter your username"
                autoComplete="off"
                required
              />
              {errors.Username && (
                <div className="invalid-feedback">{errors.Username}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                id="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
                autoComplete="off"
              />
              {errors.Email && (
                <div className="invalid-feedback">{errors.Email}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                className={`form-control ${
                  errors.Password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                autoComplete="off"
              />
              {errors.Password && (
                <div className="invalid-feedback">{errors.Password}</div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label fw-semibold">
              Confirm Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-shield-lock"></i>
              </span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Re-enter your password"
                autoComplete="off"
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 py-2 fw-semibold rounded-pill shadow-sm"
            style={{
              background: "#cd8f52",
              color: "#fff",
              letterSpacing: "1px",
              fontSize: "1.1rem",
              border: "none",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-3">
          <span className="text-secondary">Already have an account? </span>
          <Link
            to="/Login"
            className="text-decoration-underline fw-semibold"
            style={{ color: "#cd8f52" }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
