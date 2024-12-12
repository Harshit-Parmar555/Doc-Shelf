import React from "react";

// Ui Imports
import { Button } from "@/Components/ui/button";
import Navbar from "@/CustomeComponent/Navbar";

// Libraries Import
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[100vh] w-[100vw] flex flex-col m-auto bg-slate-950 overflow-hidden">
        <Navbar />
        <div className="h-[60%] w-[98%]  m-auto flex flex-col items-center justify-evenly ">
          <h1 className=" text-white scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-7xl text-center ">
            STORE YOUR DOCS SAFELY
          </h1>

          <p className=" text-white font-mono text-center w-[90%] text-[16px] md:w-[60%] lg:w-[60%]">
            Doc Shelf is a web app designed for storing, organizing, and
            securely sharing documents, making collaboration seamless and
            efficient. Its user-friendly interface ensures easy access to files
            anytime, anywhere.
          </p>
          <Button
            onClick={() => navigate("/register")}
            className="px-4 py-2 p-8 bg-blue-500 text-white text-base rounded-lg hover:bg-blue-600 hover:scale-105 transition duration-300 ease-in-out"
          >
            Start Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
