import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";

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
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!formData.Username.trim()) {
      errors.Username = "Username is required.";
    } else if (!nameRegex.test(formData.Username)) {
      errors.Username = "Username can only contain letters and spaces.";
    }

    if (!formData.Email) errors.Email = "Email is required.";
    if (!formData.Password) errors.Password = "Password is required.";
    if (formData.Password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

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

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username, Email, Password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Sign up successful!");
        setTimeout(() => navigate("/Login"), 1200);
      } else {
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setMessage("Failed to connect to the server. Please try later.");
    }

    setFormData({
      Username: "",
      Email: "",
      Password: "",
      confirmPassword: "",
    });
    setIsSubmitting(false);
  };

  const InputField = ({ icon, type, name, value, placeholder, error }) => (
    <div className="mb-3">
      <div className="input-group">
        <span className="input-group-text bg-light">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          autoComplete="off"
          required
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{ fontFamily: "Poppins, Arial, sans-serif", background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: 420, width: "100%", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)" }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#cd8f52" }}>
          Create Your Account
        </h2>

        {message && (
          <div className={`alert ${message.toLowerCase().includes("success") ? "alert-success" : "alert-danger"} py-2`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <InputField
            icon={<FaUser />}
            type="text"
            name="Username"
            value={formData.Username}
            placeholder="Enter your username"
            error={errors.Username}
          />
          <InputField
            icon={<FaEnvelope />}
            type="email"
            name="Email"
            value={formData.Email}
            placeholder="Enter your email"
            error={errors.Email}
          />
          <InputField
            icon={<FaLock />}
            type="password"
            name="Password"
            value={formData.Password}
            placeholder="Enter your password"
            error={errors.Password}
          />
          <InputField
            icon={<FaShieldAlt />}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="btn w-100 py-2 fw-semibold rounded-pill shadow-sm"
            style={{ background: "#cd8f52", color: "#fff", letterSpacing: "1px", fontSize: "1.1rem", border: "none" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-secondary">Already have an account? </span>
          <Link to="/Login" className="text-decoration-underline fw-semibold" style={{ color: "#cd8f52" }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
