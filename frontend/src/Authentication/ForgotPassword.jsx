import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [verificationEmail, setVerificationEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.SERVER_URL}/api/auth/send-verify-otp`, {
        verificationEmail,
      })
      .then((res) => {
        if (res.data.success) {
          setMessage("Verification email sent successfully.");
          setVerificationEmail("");
        } else {
          setMessage("Failed to send verification email.");
        }
      })
      .catch((err) => {
        console.error("Error sending reset link:", err);
        setMessage("An error occurred while sending the email.");
      });
  };

  return (
    <div
      className="container border p-5 mt-5 bg-amber-200"
      style={{ maxWidth: "500px" }}
    >
      <h2 className="text-center mb-4">Forgot Password</h2>
      <p className="text-center">
        Enter your email address below, and we will send you instructions to
        reset your password.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control my-3"
            id="email"
            name="Email"
            value={verificationEmail}
            onChange={(e) => setVerificationEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Reset Link
        </button>
      </form>
      <p className="text-center">{message}</p>
      <p className="mt-3 text-center">
        Remembered your password? <Link to="/Login">Login here</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
