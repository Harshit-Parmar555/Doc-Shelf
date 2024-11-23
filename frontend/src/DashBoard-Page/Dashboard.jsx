import React, { useState, useEffect, useDebugValue } from "react";
import "./Dashboard.css";
import Navbar2 from "../Navbar-2/Navbar2";
import Document from "../Document-Component/Document";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SwipeableTemporaryDrawer from "../Drawer Component/Drawer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux Store/store";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [files, setfiles] = useState([]);
  const fetchfile = async () => {
    try {
      const backendResponse = await axios.get("/api/v1/file/allfiles", {
        withCredentials: true,
      });

      // If the request is successful
      if (backendResponse.data.success === true) {
        setfiles(backendResponse.data.userfiles);
      } else {
        toast("Unexpected response: " + backendResponse.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Errors from the server (e.g., 4xx, 5xx status codes)
        toast(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        // Errors related to no response from the server
        toast("No response from the server. Please try again later.");
      } else {
        // Other errors
        toast("An unexpected error occurred: " + error.message);
      }
    }
  };
  useEffect(() => {
    fetchfile();
  }, []);

  const handlelogout = async () => {
    try {
      const backendResponse = await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });

      // If the request is successful
      if (backendResponse.data.success === true) {
        toast("Logout Successfull", {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
        navigate("/login");
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

  return (
    <>
      <Navbar2 />
      <SwipeableTemporaryDrawer />
      <div className="Dashboard-Page-Container">
        <div className="Dashboard-Page-Container-Box">
          <div className="Dashboard-Page-Container-Box-Innerbox">
            <h1>Your Documents</h1>
            {files.length > 0 ? (
              files.map((file, index) => (
                <Document
                  key={index}
                  filename={file.filename}
                  filepath={file.filepath}
                  id={file._id}
                />
              ))
            ) : (
              <p>No files found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
