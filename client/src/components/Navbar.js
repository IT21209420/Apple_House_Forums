import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";


const Navbar = ({ title = "Apple House" }) => {
  const { toast } = useContext(ToastContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="./" style={{ textDecoration: "none" }}>
          <a className="navbar-brand">{title}</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li
                  className="nav-item"
                  onClick={() => {
                    setUser(null);
                    localStorage.clear();
                    toast.success("Logged out successfully!")
                    navigate("/login" ,{replace:true})
                  }}
                >
                  <button type="button" class="btn btn-danger">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="./login" style={{ textDecoration: "none" }}>
                    <a className="nav-link">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="./register" style={{ textDecoration: "none" }}>
                    <a className="nav-link">Register</a>
                  </Link>
                </li>
              </>
            )}

            {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Separated link</a>
          </div>
        </li> */}
          </ul>
          {/* <form className="d-flex">
        <input className="form-control me-sm-2" type="search" placeholder="Search">
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
