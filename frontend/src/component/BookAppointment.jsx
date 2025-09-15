import { useEffect, useState } from "react";

const BookAppointment = () => {
  const [bookMembers, setBookMembers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:8080/user/api/bookAppointment", {
      method: "GET",
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setBookMembers(data))
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", err);
        }
      });

    return () => controller.abort();
  }, []);

  const handleCancelAppointment = async (e, id) => {
    e.preventDefault();
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    const response = await fetch(
      `http://localhost:8080/user/api/bookAppointment/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (response.ok) {
      alert("Appointment cancelled successfully!");
      setBookMembers((prev) =>
        prev.filter((appointment) => appointment._id !== id)
      );
    } else {
      alert("Failed to cancel: " + result.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold text-primary">
        📅 Booked Appointments
      </h2>

      {bookMembers.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm">
          No appointments booked yet.
        </div>
      ) : (
        <div className="row">
          {bookMembers.map((appointment, index) => (
            <div key={appointment._id || index} className="col-md-4 mb-4">
              <div className="card border-0 shadow-lg rounded-3 h-100">
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">
                    Patient Details
                  </h5>
                  <ul className="list-unstyled mb-3">
                    <li>
                      <strong>Name:</strong>{" "}
                      {appointment.patientId?.name || "N/A"}
                    </li>
                    <li>
                      <strong>Email:</strong>{" "}
                      {appointment.patientId?.email || "N/A"}
                    </li>
                    <li>
                      <strong>Gender:</strong>{" "}
                      {appointment.patientId?.gender || "N/A"}
                    </li>
                    <li>
                      <strong>Booked At:</strong>{" "}
                      {new Date(appointment.bookedAt).toLocaleString()}
                    </li>
                  </ul>

                  <button
                    type="button"
                    onClick={(e) =>
                      handleCancelAppointment(e, appointment._id)
                    }
                    className="btn btn-outline-danger w-100 fw-semibold"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
