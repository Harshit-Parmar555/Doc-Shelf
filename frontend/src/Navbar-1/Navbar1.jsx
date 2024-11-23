import React from "react";
import "./Navbar1.css";
import Logo from "../assets/DOCS-SHELF.png";
import { useNavigate } from "react-router-dom";

const Navbar1 = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="Navbar1">
        <div className="Navbar1-Logo">
          <img  src={Logo} alt="" />
        </div>
        <div className="Navbar1-Options">
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            REGISTER
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            LOGIN
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar1;
