import { useEffect, useState } from "react";
import { FaUserMd, FaUserInjured } from "react-icons/fa";

const RegisterMemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:8080/api/register", {
      method: "GET",
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", err);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const handleBookAppointment = async (id) => {
    const response = await fetch("http://localhost:8080/api/bookAppointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patientId: id }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Appointment booked successfully!");
    } else {
      alert("Failed to book appointment: " + result.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Registered Members</h2>
      <div className="row">
        {members.map((member) => (
          <div key={member._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center">
                  {member.isPatient ? (
                    <FaUserInjured className="text-danger me-2" />
                  ) : (
                    <FaUserMd className="text-primary me-2" />
                  )}
                  {member.name}
                </h5>
                <p className="card-text">
                  <strong>Email:</strong> {member.email} <br />
                  <strong>Phone:</strong> {member.phone} <br />
                  <strong>Gender:</strong> {member.gender}
                </p>

                <span
                  className={`badge mb-2 ${
                    member.isPatient ? "bg-danger" : "bg-primary"
                  }`}
                >
                  {member.isPatient ? "Patient" : "Doctor"}
                </span>

                {member.isPatient && (
                  <div className="">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleBookAppointment(member._id)}
                    >
                      Book Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterMemberList;
