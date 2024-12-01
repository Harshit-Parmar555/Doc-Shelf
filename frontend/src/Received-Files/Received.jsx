import React, { useState, useEffect } from "react";
import "./Received.css";
import Navbar2 from "../Navbar-2/Navbar2";
import ReceivedDoc from "../Received Document/ReceivedDoc";
import { toast } from "react-toastify";
import axios from "axios";
const Received = () => {
  const [files, setfiles] = useState([]);
  const fetchfile = async () => {
    try {
      const backendResponse = await axios.get("/api/v1/file/getsharefile", {
        withCredentials: true,
      });

      // If the request is successful
      if (backendResponse.data.success === true) {
        setfiles(backendResponse.data.sharedfiles);
      } else {
        dispatch(authActions.logout());
        toast("Unexpected response: " + backendResponse.data.message, {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
      }
    } catch (error) {
      if (error.response) {
        // Errors from the server (e.g., 4xx, 5xx status codes)
        toast(error.response.data.message || "Something went wrong!", {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
      } else if (error.request) {
        // Errors related to no response from the server
        toast("No response from the server. Please try again later.", {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
      } else {
        // Other errors
        toast("An unexpected error occurred: " + error.message, {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
      }
    }
  };

  useEffect(() => {
    fetchfile();
  }, []);

  return (
    <>
      <Navbar2 />
      <div className="Received-Page-Container">
        <div className="Received-Page-Container-Box">
          {files.length > 0 ? (
            files.map((file, index) => (
              <ReceivedDoc
                key={index}
                filename={file.filename}
                filepath={file.filepath}
                sender={file.sender}
              />
            ))
          ) : (
            <p style={{ color: "white" }}>No files found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Received;
