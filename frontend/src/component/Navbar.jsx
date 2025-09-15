import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <>
      <header className="d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center text-decoration-none"
        >
          <span className="fs-4 fw-bold text-dark">MediConnect</span>
        </Link>
        <ul className="nav me-auto ms-5">
          <li>
            <Link to="/Home" className="nav-link px-2 text-dark">
              Home
            </Link>
          </li>
          <li>
            <Link to="/RegisterPersonal" className="nav-link px-2 text-dark">
              Register
            </Link>
          </li>
          <li>
            <Link to="/Appointment" className="nav-link px-2 text-dark">
              Appointments
            </Link>
          </li>
        </ul>

        <Link to="/Login">
          <button type="button" className="btn btn-primary d-flex">
            Log in
            <IoArrowForwardOutline className="my-1 mx-2" />
          </button>
        </Link>
      </header>
    </>
  );
};

export default Navbar;
