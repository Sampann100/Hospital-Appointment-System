import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaUserMd, FaUserInjured } from "react-icons/fa";
import { userDataActions } from "../store/userDataSlice";

const RegisterMemberList = () => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:8080/user/api/register", {
      method: "GET",
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        dispatch(userDataActions.setUserData(data));
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
    const response = await fetch(
      "http://localhost:8080/user/api/bookAppointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId: id }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      alert("Appointment booked successfully!");
    } else {
      alert("Failed to book appointment: " + result.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-5 text-center fw-bold">👥 Registered Members</h2>
      <div className="row g-4">
        {members.map((member) => (
          <div key={member._id} className="col-md-4">
            <div className="card border-0 shadow-lg rounded-4 h-100 text-center p-3 member-card">
              <div
                className="mx-auto d-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: member.isPatient ? "#f8d7da" : "#dbeafe",
                }}
              >
                {member.isPatient ? (
                  <FaUserInjured className="fs-2 text-danger" />
                ) : (
                  <FaUserMd className="fs-2 text-primary" />
                )}
              </div>

              <h5 className="fw-semibold">{member.name}</h5>

              <p className="text-muted small mb-2">
                📧 {member.email} <br />
                📞 {member.phone} <br />⚥ {member.gender}
              </p>

              <span
                className={`badge rounded-pill px-3 py-2 mb-3 ${
                  member.isPatient
                    ? "bg-danger-subtle text-danger"
                    : "bg-primary-subtle text-primary"
                }`}
              >
                {member.isPatient ? "Patient" : "Doctor"}
              </span>

              {member.isPatient && (
                <button
                  className="btn btn-danger btn-sm w-100 fw-semibold shadow-sm"
                  onClick={() => handleBookAppointment(member._id)}
                >
                  📅 Book Appointment
                </button>
              )}
            </div>
          </div>
        ))}

        {members.length === 0 && (
          <div className="text-center text-muted py-5">
            <h5>No members registered yet.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterMemberList;
