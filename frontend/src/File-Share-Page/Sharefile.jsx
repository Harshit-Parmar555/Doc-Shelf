import React, { useState } from "react";
import "./Sharefile.css";
import Navbar2 from "../Navbar-2/Navbar2";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Sharefile = () => {
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const props = location.state;
  const [email, setemail] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      const backendResponse = await axios.post(
        "/api/v1/file/sharefile",
        { email: email, filename: props.filename, filepath: props.filepath },
        {
          withCredentials: true,
        }
      );

      // If the request is successful
      if (backendResponse.data.success === true) {
        toast(backendResponse.data.message, {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
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
    }finally{
      setloading(false);
    }
  };
  return (
    <>
      <Navbar2 />
      <div className="Sharefile-Page-Container">
        <form onSubmit={handlesubmit}>
          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            required
            placeholder="Enter user email to send file"
          />
          {loading? <button disabled>Sharing . . . </button>:<button type="submit">share</button>}
          
         
        </form>
      </div>
    </>
  );
};

export default Sharefile;
