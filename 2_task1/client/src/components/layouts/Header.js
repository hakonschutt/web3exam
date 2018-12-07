import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/pencil-case.svg";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand" href="#">
          <img
            src={Logo}
            className="d-inline-block align-top"
            alt=""
            style={{ height: "30px" }}
          />
          <span className="text-white mx-2">Cases</span>
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto float-right" />
          <Link to="/case/new" className="btn btn-light my-2 my-sm-0">
            New
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

// <ul className="navbar-nav mr-auto float-right">
//   <li className="nav-item active">
//     <a className="nav-link" href="#">
//       Home <span class="sr-only">(current)</span>
//     </a>
//   </li>
// </ul>;
