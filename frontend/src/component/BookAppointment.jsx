import { useEffect, useState } from "react";

const BookAppointment = () => {
  const [bookMembers, setBookMembers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:8080/api/bookAppointment", {
      method: "GET",
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setBookMembers(data);
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
  }, [bookMembers]);

  const handleCancelAppointment = async (e, id) => {
    e.preventDefault();
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    const response = await fetch(
      `http://localhost:8080/api/bookAppointment/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (response.ok) {
      alert("Appointment cancelled successfully!");
      setBookMembers((prev) => prev.filter((item) => item._id !== id));
    } else {
      alert("Failed to cancel: " + result.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Booked Appointments</h3>

      <div className="row">
        {bookMembers.length === 0 ? (
          <p className="text-center">No appointments booked yet.</p>
        ) : (
          bookMembers.map((appointment, index) => (
            <div key={appointment._id || index} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Appointment</h5>
                  <p className="card-text">
                    <strong>Patient Name:</strong>{" "}
                    {appointment.patientId?.name || "N/A"} <br />
                    <strong>Email:</strong>{" "}
                    {appointment.patientId?.email || "N/A"} <br />
                    <strong>Gender:</strong>{" "}
                    {appointment.patientId?.gender || "N/A"} <br />
                    <strong>Booked At:</strong>{" "}
                    {new Date(appointment.bookedAt).toLocaleString()}
                  </p>
                  <button
                    type="button"
                    onClick={(appointment) =>
                      handleCancelAppointment(appointment._id)
                    }
                    class="btn btn-success"
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
