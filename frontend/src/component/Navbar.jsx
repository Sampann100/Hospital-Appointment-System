import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom ">
        {" "}
        <div className="col-md-3 mb-2 mb-md-0">
          {" "}
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            {" "}
          </a>{" "}
        </div>{" "}
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {" "}
          <li>
            <Link to="/Home" className="nav-link px-2">
              Home
            </Link>
          </li>{" "}
          <li>
            <Link to="/RegisterPersonal" className="nav-link px-2">
              Register_Patient/Doctor
            </Link>
          </li>{" "}
          <li>
            <Link to="/Appointment" className="nav-link px-2">
              Book_Appointment
            </Link>
          </li>{" "}
          <li>
            <a href="#" className="nav-link px-2">
              Portfolio
            </a>
          </li>{" "}
          <li>
            <a href="#" className="nav-link px-2">
              Treatment
            </a>
          </li>{" "}
        </ul>{" "}
        <div className="col-md-3 text-end mx-3">
          {" "}
          <Link to="/Login">
            <button type="button" className="btn btn-outline-primary me-2">
              Login
            </button>
          </Link>{" "}
          <Link to="/SignUp">
            <button type="button" className="btn btn-primary">
              Sign-up
            </button>
          </Link>{" "}
        </div>{" "}
      </header>
    </>
  );
};

export default Navbar;
