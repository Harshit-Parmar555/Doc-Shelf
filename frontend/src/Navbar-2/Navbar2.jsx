import React from "react";
import "./Navbar2.css";
import LOGO from "../assets/Doc-Shelf.png";
import BasicMenu from "../Drawer Component/Drawer";
import { useNavigate } from "react-router-dom";
const Navbar2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="Navbar2">
        <div className="Navbar2-Logo">
          <img
            onClick={() => {
              navigate("/dashboard");
            }}
            src={LOGO}
            alt=""
          />
        </div>
        <div className="Navbar2-Option">
          <BasicMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
