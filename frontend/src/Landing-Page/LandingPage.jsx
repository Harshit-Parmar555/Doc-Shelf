import React from "react";
import Navbar1 from "../Navbar-1/Navbar1";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar1 />
      <div className="Landing-Page-Container">
        <div className="Landing-Page-Container-Center">
          <h1>STORE YOUR DOCS SAFELY</h1>
          <p>Doc Shelf is a web app designed for storing, organizing, and securely sharing documents, making collaboration seamless and efficient. Its user-friendly interface ensures easy access to files anytime, anywhere.</p>
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
