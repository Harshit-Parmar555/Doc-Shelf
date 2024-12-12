import React, { useState, useEffect } from "react";
import ReceivedFile from "@/CustomeComponent/ReceivedFile";
import { toast } from "react-hot-toast";

import axios from "axios";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ReceivedFilePage = () => {
  const theme = useSelector((state)=>state.theme.theme); 
  const navigate = useNavigate();
  const [files, setfiles] = useState([]);
  const fetchfile = async () => {
    try {
      const response = await axios.get(
        "/api/v1/doc-shelf/file/fetchsharedfile",
        {
          withCredentials: true,
        }
      );

      // If the request is successful
      if (response.data.success === true) {
        setfiles(response.data.receivedfiles);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast("No response from the server. Please try again later.");
      } else {
        toast("An unexpected error occurred: " + error.message);
      }
    }
  };
  useEffect(() => {
    fetchfile();
  }, []);

  return (
    <>
      <div className={`h-[100vh] w-[100vw] ${theme?"bg-white":"bg-slate-950"}  flex flex-col items-center justify-evenly `}>
        <div className={`h-[80%] min-h-[80%] w-[70%] ${theme?"bg-gray-400":"bg-black"} rounded-2xl flex flex-col items-center overflow-scroll`}>
          {files.length > 0 ? (
            files.map((file, index) => (
              <ReceivedFile
                key={index}
                filename={file.filename}
                filepath={file.filepath}
                sender={file.sender.email}
              />
            ))
          ) : (
            <p style={{ color: "white" }}>No files found.</p>
          )}
        </div>
        <Button onClick={() => navigate("/home")}>Back To Home</Button>
      </div>
    </>
  );
};

export default ReceivedFilePage;
