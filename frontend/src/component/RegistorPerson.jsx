import { useState } from "react";

const RegisterPerson = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    isPatient: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    // Convert isPatient from string to Boolean
    const isPatientBoolean =
      formData.isPatient.trim().toLowerCase() === "yes";

    const finalData = {
      ...formData,
      isPatient: isPatientBoolean,
    };

    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful!");
    } else {
      alert("Registration failed: " + data.message);
    }
  };

  return (
    <form className="container mt-5" onSubmit={handleSubmit}>
      <h2 className="mb-4">Register Patient or Doctor</h2>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone Number:
        </label>
        <input
          type="number"
          className="form-control"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender:
        </label>
        <input
          type="text"
          className="form-control"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="isPatient" className="form-label">
          Are you a patient? (yes / no)
        </label>
        <input
          type="text"
          className="form-control"
          id="isPatient"
          name="isPatient"
          value={formData.isPatient}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="agree"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="agree">
          I agree to the Terms and Conditions
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default RegisterPerson;
