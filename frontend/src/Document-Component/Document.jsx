import React, { useState } from "react";
import "./Document.css";
import downloadicon from "../assets/download.svg";
import deleteicon from "../assets/delete.svg";
import fileicon from "../assets/fileicon.svg";
import shareicon from "../assets/share.svg"
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

const Document = (props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const handledelete = async () => {
    try {
      setloading(true);
      const backendResponse = await axios.delete(
        `/api/v1/file/deletefile/${props.id}`
      );

      // If the request is successful
      if (backendResponse.data.success === true) {
        toast(backendResponse.data.message, {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
        location.reload();
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
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <div className="Document-Container">
        <div className="Document-Container-Fileicon">
          <img src={fileicon} alt="" />
        </div>
        <div className="Document-Container-Name">
          <h4>{props.filename}</h4>
        </div>
        <div className="Document-Container-Option">
          <a href={props.filepath} target="_blank">
            <img src={downloadicon} alt="" />
          </a>
          {loading ? (
            <>
              {" "}
              <button>
                <img src={deleteicon} style={{ opacity: "0.5" }} />
              </button>
            </>
          ) : (
            <button>
              <img onClick={handledelete} src={deleteicon} alt="" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Document;
