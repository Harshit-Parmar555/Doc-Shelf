import { Button } from "@/Components/ui/button";
import React from "react";
import {  CloudUploadIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";

const HomeContainer2 = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-[10%] w-[90%] md:w-[50%] lg:w-[30%] rounded-xl flex items-center justify-evenly">
        <Button
          onClick={() => navigate("/upload")}
          className="h-[70%] w-[30%] flex items-center"
        >
          <CloudUploadIcon />
          Add
        </Button>
      </div>
    </>
  );
};

export default HomeContainer2;
