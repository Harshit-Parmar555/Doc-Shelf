import React from "react";
import "./Navbar2.css";
import Logo from "../assets/DOCS-SHELF.png";
import BasicMenu from "../Drawer Component/Drawer";
import {useNavigate} from "react-router-dom";
const Navbar2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="Navbar1">
        <div  className="Navbar1-Logo">
          <img onClick={()=>{navigate("/dashboard")}} src={Logo} alt="" />
        </div>
        <div className="Navbar2-Option"><BasicMenu/></div>
      </nav>
    </>
  );
};

export default Navbar2;
