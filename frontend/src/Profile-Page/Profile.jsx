import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar2 from "../Navbar-2/Navbar2";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [userdetails, setuserdetails] = useState(null);
  const [load, setload] = useState(false);
  const userdetail = async () => {
    try {
      const backendResponse = await axios.get("/api/v1/user/details", {
        withCredentials: true,
      });

      // If the request is successful
      if (backendResponse.data.success === true) {
        console.log(backendResponse.data.user.profilepicture);
        setuserdetails({
          name: backendResponse.data.user.username,
          email: backendResponse.data.user.email,
          profilepic: backendResponse.data.user.profilepicture,
          files: backendResponse.data.user.files.length,
        });
        setload(true);
      } else {
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
    userdetail();
  }, []);
  return (
    <>
      <Navbar2 />
      <div className="Profile-Page-Container">
        <div className="Profile-Page-Container-Left">
          <div className="Profile-Page-Container-Left-Profile">
            {load ? <img src={userdetails.profilepic} alt="" /> : ""}
          </div>
          {load ? (
            <>
              <h3>Username : {userdetails.name}</h3>
              <h3>Email : {userdetails.email}</h3>
              <h3>Document Stored : {userdetails.files}</h3>
            </>
          ) : (
            " "
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
