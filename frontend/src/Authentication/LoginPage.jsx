import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
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
    if (!formData.Email) errors.Email = "Email is required.";
    if (!formData.Password) errors.Password = "Password is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const { Email, Password } = formData;

    if (Email && Password) {
      try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email, Password }),
        });

        if (response.ok) {
          const result = await response.json();
          setMessage(result.message || "Login successful!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          const error = await response.json();
          setMessage(error.message || "Invalid email or password.");
        }
      } catch (error) {
        setMessage("Failed to connect to the server. Please try later.");
      }
    } else {
      setMessage("Please fill in all fields.");
    }

    setFormData({ Email: "", Password: "" });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(120deg, #fffdfa 60%, #f7e7d7 100%)",
        fontFamily: "Poppins, Arial, sans-serif",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{
          maxWidth: 400,
          width: "100%",
          background: "rgba(255,255,255,0.97)",
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#cd8f52" }}>
            Welcome Back
          </h2>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              className={`form-control ${errors.Password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              autoComplete="off"
            />
            {errors.Password && (
              <div className="invalid-feedback">{errors.Password}</div>
            )}
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
          >
            Login
          </button>
        </form>
        {message && (
          <div
            className={`alert mt-3 py-2 ${
              message.toLowerCase().includes("success")
                ? "alert-success"
                : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
        <div className="text-center my-3">
          <span className="text-secondary">Don't have an account? </span>
          <Link
            to="/SignUp"
            className="text-decoration-underline fw-semibold"
            style={{ color: "#cd8f52" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;