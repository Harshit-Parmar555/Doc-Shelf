import React from "react";
import Navbar1 from "../Navbar-1/Navbar1";
import "./LandingPage.css";
import landing from "../assets/landingback.jpg";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar1 />
      <div className="Landing-Page-Container">
        <div className="Landing-Page-Container-Center">
          <h1>STORE YOUR DOCS SAFELY</h1>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Start Now!!!
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
