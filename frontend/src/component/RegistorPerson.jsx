import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserMd, FaUserInjured } from "react-icons/fa";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";

const RegisterPerson = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    isPatient: null,
    agree: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleSelection = (isPatientStatus) => {
    setFormData((prev) => ({
      ...prev,
      isPatient: isPatientStatus,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.gender ||
      formData.isPatient === null ||
      !formData.agree
    ) {
      alert("Please fill out all fields and agree to the terms.");
      return;
    }

    const finalData = {
      ...formData,
      isPatient: formData.isPatient,
    };

    const response = await fetch("http://localhost:8080/user/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful! You will be redirected shortly.");
      navigate("/");
    } else {
      alert("Registration failed: " + data.message);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "",
      isPatient: null,
      agree: false,
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="text-center mb-4 fw-bold text-dark">
                Register Your Profile
              </h2>
              <p className="text-center text-muted mb-4">
                Join our community in a few simple steps.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-center">
                  <h6 className="fw-semibold">
                    Are you a patient or a doctor?
                  </h6>
                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <button
                      type="button"
                      className={`btn btn-lg rounded-pill px-4 ${
                        formData.isPatient === false
                          ? "btn-primary shadow"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handleRoleSelection(false)}
                    >
                      <FaUserMd className="me-2" />
                      Doctor
                    </button>
                    <button
                      type="button"
                      className={`btn btn-lg rounded-pill px-4 ${
                        formData.isPatient === true
                          ? "btn-info text-white shadow"
                          : "btn-outline-info"
                      }`}
                      onClick={() => handleRoleSelection(true)}
                    >
                      <FaUserInjured className="me-2" />
                      Patient
                    </button>
                  </div>
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FiUser />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name..."
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FiMail />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FiPhone />
                    </span>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="+91-93xxxxxxxx"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">👨 Male</option>
                    <option value="Female">👩 Female</option>
                    <option value="Other">⚧ Other</option>
                  </select>
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agree"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="agree">
                    I agree to the{" "}
                    <Link to="#" className="text-decoration-none">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold rounded-pill"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPerson;
