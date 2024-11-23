import React, { useState } from "react";
import "./Upload.css";
import Navbar2 from "../Navbar-2/Navbar2";
import axios from "axios";
import { toast } from "react-toastify"

const Upload = () => {
  const [loading, setloading] = useState(false);
  const [filename, setfilename] = useState(null);
  const [file, setfile] = useState(null);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("filename", filename);
    try {
      setloading(true);
      const backendResponse = await axios.post(
        "/api/v1/file/uploadfile",
        formdata,
        { withCredentials: true }
      );

      // If the request is successful
      if (backendResponse.data.success === true) {
        toast(backendResponse.data.message,{position:"bottom-right",style:{backgroundColor:"black",color:"white"}});
      } else {
        toast("Unexpected response: " + backendResponse.data.message,{position:"bottom-right",style:{backgroundColor:"black",color:"white"}});
      }
    } catch (error) {
      if (error.response) {
        // Errors from the server (e.g., 4xx, 5xx status codes)
        toast(error.response.data.message || "Something went wrong!",{position:"bottom-right",style:{backgroundColor:"black",color:"white"}});
      } else if (error.request) {
        // Errors related to no response from the server
        toast("No response from the server. Please try again later.",{position:"bottom-right",style:{backgroundColor:"black",color:"white"}});
      } else {
        // Other errors
        toast("An unexpected error occurred: " + error.message,{position:"bottom-right",style:{backgroundColor:"black",color:"white"}});
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="Upload-Page-Container">
        <div className="Upload-Page-Container-Box">
          <form action="">
            <input
              onChange={(e) => {
                setfilename(e.target.value);
              }}
              type="text"
              placeholder="Enter File Name"
            />
            <input
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
              type="file"
              accept="application/pdf"
            />
            {loading ? (
              <button style={{ opacity: "0.5" }} disabled>
                Uploading
              </button>
            ) : (
              <button onClick={handlesubmit} type="submit">
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
