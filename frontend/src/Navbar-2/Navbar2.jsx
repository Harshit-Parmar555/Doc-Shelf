import React from "react";
import "./Navbar2.css";
import Logo from "../assets/DOCS-SHELF.png";
import {useNavigate} from "react-router-dom"
const Navbar2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="Navbar1">
        <div  className="Navbar1-Logo">
          <img onClick={()=>{navigate("/dashboard")}} src={Logo} alt="" />
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
